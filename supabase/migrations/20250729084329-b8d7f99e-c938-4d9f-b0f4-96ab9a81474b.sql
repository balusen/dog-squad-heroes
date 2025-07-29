-- Create enum types for various statuses and categories
CREATE TYPE public.issue_type AS ENUM ('injured', 'lost', 'feeding', 'aggressive', 'puppies', 'abuse', 'adoption', 'other');
CREATE TYPE public.report_status AS ENUM ('pending', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.volunteer_role AS ENUM ('feeder', 'rescuer', 'foster', 'transporter', 'vet', 'admin');
CREATE TYPE public.alert_status AS ENUM ('sent', 'accepted', 'declined', 'expired');

-- Profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  zone TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Issue reports table (Module 1)
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  issue_type issue_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  location_address TEXT,
  image_url TEXT,
  status report_status NOT NULL DEFAULT 'pending',
  assigned_volunteer_id UUID REFERENCES auth.users(id),
  resolution_notes TEXT,
  resolution_image_url TEXT,
  observed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Volunteer roles table (Module 2)
CREATE TABLE public.volunteer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role volunteer_role NOT NULL,
  skills TEXT[],
  zone TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  points INTEGER NOT NULL DEFAULT 0,
  total_rescues INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Alert routing table (Module 3)
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  volunteer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status alert_status NOT NULL DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  response_notes TEXT
);

-- Report timeline for tracking updates (Module 5)
CREATE TABLE public.report_timeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Dogs available for foster/adoption (Module 7)
CREATE TABLE public.dogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age_months INTEGER,
  breed TEXT,
  description TEXT,
  health_status TEXT,
  vaccination_status TEXT,
  is_available_for_fostering BOOLEAN NOT NULL DEFAULT false,
  is_available_for_adoption BOOLEAN NOT NULL DEFAULT false,
  location_zone TEXT,
  added_by UUID NOT NULL REFERENCES auth.users(id),
  image_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Foster/adoption requests (Module 7)
CREATE TABLE public.adoption_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dog_id UUID NOT NULL REFERENCES public.dogs(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('foster', 'adoption')),
  reason TEXT,
  experience TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Donation campaigns (Module 8)
CREATE TABLE public.donation_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(10, 2) NOT NULL,
  raised_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  related_report_id UUID REFERENCES public.reports(id),
  related_dog_id UUID REFERENCES public.dogs(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Donations (Module 8)
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.donation_campaigns(id) ON DELETE CASCADE,
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Veterinary clinics (Module 11)
CREATE TABLE public.vet_clinics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  services TEXT[],
  is_partner BOOLEAN NOT NULL DEFAULT false,
  added_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Community events (Module 14)
CREATE TABLE public.community_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT NOT NULL,
  organizer_id UUID NOT NULL REFERENCES auth.users(id),
  max_participants INTEGER,
  current_participants INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event participants (Module 14)
CREATE TABLE public.event_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.community_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  attended BOOLEAN DEFAULT false,
  UNIQUE(event_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adoption_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vet_clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for reports
CREATE POLICY "Users can view all reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Users can create their own reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reports" ON public.reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Volunteers can update assigned reports" ON public.reports FOR UPDATE USING (auth.uid() = assigned_volunteer_id);

-- RLS Policies for volunteer profiles
CREATE POLICY "Users can view volunteer profiles" ON public.volunteer_profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their volunteer profiles" ON public.volunteer_profiles FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for alerts
CREATE POLICY "Volunteers can view their alerts" ON public.alerts FOR SELECT USING (auth.uid() = volunteer_id);
CREATE POLICY "System can create alerts" ON public.alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Volunteers can update their alerts" ON public.alerts FOR UPDATE USING (auth.uid() = volunteer_id);

-- RLS Policies for report timeline
CREATE POLICY "Users can view timeline for all reports" ON public.report_timeline FOR SELECT USING (true);
CREATE POLICY "Users can add to timeline" ON public.report_timeline FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for dogs
CREATE POLICY "Users can view all dogs" ON public.dogs FOR SELECT USING (true);
CREATE POLICY "Users can add dogs" ON public.dogs FOR INSERT WITH CHECK (auth.uid() = added_by);
CREATE POLICY "Users can update dogs they added" ON public.dogs FOR UPDATE USING (auth.uid() = added_by);

-- RLS Policies for adoption requests
CREATE POLICY "Users can view all adoption requests" ON public.adoption_requests FOR SELECT USING (true);
CREATE POLICY "Users can create adoption requests" ON public.adoption_requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update their adoption requests" ON public.adoption_requests FOR UPDATE USING (auth.uid() = requester_id);

-- RLS Policies for donation campaigns
CREATE POLICY "Users can view all campaigns" ON public.donation_campaigns FOR SELECT USING (true);
CREATE POLICY "Users can create campaigns" ON public.donation_campaigns FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their campaigns" ON public.donation_campaigns FOR UPDATE USING (auth.uid() = created_by);

-- RLS Policies for donations
CREATE POLICY "Users can view all donations" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Users can create donations" ON public.donations FOR INSERT WITH CHECK (true);

-- RLS Policies for vet clinics
CREATE POLICY "Users can view all vet clinics" ON public.vet_clinics FOR SELECT USING (true);
CREATE POLICY "Users can add vet clinics" ON public.vet_clinics FOR INSERT WITH CHECK (auth.uid() = added_by);
CREATE POLICY "Users can update vet clinics they added" ON public.vet_clinics FOR UPDATE USING (auth.uid() = added_by);

-- RLS Policies for community events
CREATE POLICY "Users can view all events" ON public.community_events FOR SELECT USING (true);
CREATE POLICY "Users can create events" ON public.community_events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Organizers can update their events" ON public.community_events FOR UPDATE USING (auth.uid() = organizer_id);

-- RLS Policies for event participants
CREATE POLICY "Users can view event participants" ON public.event_participants FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON public.event_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their participation" ON public.event_participants FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteer_profiles_updated_at BEFORE UPDATE ON public.volunteer_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_dogs_updated_at BEFORE UPDATE ON public.dogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_adoption_requests_updated_at BEFORE UPDATE ON public.adoption_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_donation_campaigns_updated_at BEFORE UPDATE ON public.donation_campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vet_clinics_updated_at BEFORE UPDATE ON public.vet_clinics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_community_events_updated_at BEFORE UPDATE ON public.community_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create profiles automatically when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.phone);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
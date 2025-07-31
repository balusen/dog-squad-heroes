import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Camera, 
  Upload,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ReportIssueScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

const issueTypes = [
  { id: 'injured', label: 'Injured', color: 'bg-destructive text-destructive-foreground' },
  { id: 'lost', label: 'Lost', color: 'bg-warning text-warning-foreground' },
  { id: 'feeding', label: 'Feeding', color: 'bg-primary text-primary-foreground' },
  { id: 'aggressive', label: 'Aggressive', color: 'bg-destructive text-destructive-foreground' },
  { id: 'abuse', label: 'Abuse', color: 'bg-destructive text-destructive-foreground' },
  { id: 'puppies', label: 'Puppies', color: 'bg-accent text-accent-foreground' },
  { id: 'adoption', label: 'Adoption', color: 'bg-success text-success-foreground' },
  { id: 'other', label: 'Other', color: 'bg-muted text-muted-foreground' }
];

const ReportIssueScreen = ({ onBack, onSubmit }: ReportIssueScreenProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `reports/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!selectedType || !location || !user || !title) return;
    if (latitude === null || longitude === null) {
      toast({
        title: "Location Required",
        description: "Please get your current location or enter coordinates.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const { error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          issue_type: selectedType as any,
          title,
          description: notes,
          latitude,
          longitude,
          location_address: location,
          image_url: imageUrl,
          observed_at: new Date().toISOString()
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to submit report. Please try again.",
          variant: "destructive"
        });
        console.error('Error submitting report:', error);
      } else {
        // Add to timeline
        await supabase
          .from('report_timeline')
          .insert({
            report_id: null, // Will be set by the report ID from the above insert
            user_id: user.id,
            action: 'Report submitted',
            notes: `${selectedType} report created`
          });

        toast({
          title: "Report Submitted! ✅",
          description: "Local volunteers have been notified. We'll keep you updated.",
        });
        onSubmit();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }

    setIsSubmitting(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // Simple reverse geocoding simulation
          setLocation(`Current Location - ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          toast({
            title: "Location Retrieved",
            description: "Your current location has been set.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-primary-foreground">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="mr-4 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Report an Issue</h1>
        </div>
        <p className="text-primary-foreground/80">
          Help a dog in need by providing details
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Issue Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What type of issue?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {issueTypes.map((type) => (
                <Badge
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center transition-all ${
                    selectedType === type.id ? type.color : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Brief Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g., Injured dog near park gate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter location or address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={getCurrentLocation}
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
            {location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              {image ? (
                <div className="space-y-2">
                  <CheckCircle className="w-8 h-8 text-success mx-auto" />
                  <p className="text-sm font-medium">Photo uploaded</p>
                  <p className="text-xs text-muted-foreground">{image.name}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm font-medium">Add a photo</p>
                  <p className="text-xs text-muted-foreground">
                    Help volunteers identify the situation
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                asChild
              >
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {image ? 'Change Photo' : 'Upload Photo'}
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe what you observed..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full h-12 text-lg"
          disabled={!selectedType || !location || !title || isSubmitting}
        >
          {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your report will be shared with local volunteers and NGO partners
        </p>
      </div>
    </div>
  );
};

export default ReportIssueScreen;
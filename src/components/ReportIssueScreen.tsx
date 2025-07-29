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

interface ReportIssueScreenProps {
  onBack: () => void;
  onSubmit: () => void;
}

const issueTypes = [
  { id: 'injured', label: 'Injured', color: 'bg-destructive text-destructive-foreground' },
  { id: 'lost', label: 'Lost', color: 'bg-warning text-warning-foreground' },
  { id: 'feeding', label: 'Feeding', color: 'bg-primary text-primary-foreground' },
  { id: 'aggressive', label: 'Aggressive', color: 'bg-destructive text-destructive-foreground' },
  { id: 'abused', label: 'Abused', color: 'bg-destructive text-destructive-foreground' },
  { id: 'puppies', label: 'Puppies', color: 'bg-accent text-accent-foreground' },
  { id: 'adoption', label: 'Adoption', color: 'bg-success text-success-foreground' },
  { id: 'other', label: 'Other', color: 'bg-muted text-muted-foreground' }
];

const ReportIssueScreen = ({ onBack, onSubmit }: ReportIssueScreenProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedType || !location) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setLocation('Current Location - Koramangala, Bangalore');
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
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
          disabled={!selectedType || !location || isSubmitting}
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
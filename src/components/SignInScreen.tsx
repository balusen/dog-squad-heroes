import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Smartphone, ArrowRight } from 'lucide-react';
import logoImage from '@/assets/dogsquad-logo.png';

interface SignInScreenProps {
  onSignIn: () => void;
}

const SignInScreen = ({ onSignIn }: SignInScreenProps) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length < 10) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOtp(true);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;
    
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src={logoImage} 
            alt="DogSquad Logo" 
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to DogSquad</h1>
          <p className="text-muted-foreground">Join our community of dog lovers</p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-primary" />
              {showOtp ? 'Verify OTP' : 'Sign In'}
            </CardTitle>
            <CardDescription>
              {showOtp 
                ? `We've sent a verification code to +91 ${phone}`
                : 'Enter your mobile number to get started'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {!showOtp ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="flex">
                    <div className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input text-sm">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-l-none"
                      maxLength={10}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleSendOtp}
                  className="w-full"
                  disabled={phone.length < 10 || isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="number"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
                
                <Button 
                  onClick={handleVerifyOtp}
                  className="w-full"
                  disabled={otp.length < 6 || isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => setShowOtp(false)}
                  className="w-full"
                >
                  Change Number
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;
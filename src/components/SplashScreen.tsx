import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import logoImage from '@/assets/dogsquad-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowButton(true), 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-8 text-center">
      <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <img 
          src={logoImage} 
          alt="DogSquad Logo" 
          className="w-32 h-32 mx-auto mb-8 animate-bounce-gentle"
        />
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">
          DogSquad
        </h1>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-md">
          Building stronger communities, one dog at a time
        </p>
      </div>
      
      {showButton && (
        <Button 
          onClick={onComplete}
          size="lg"
          className="animate-slide-up bg-accent hover:bg-accent/90"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SplashScreen;
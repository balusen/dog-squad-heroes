import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import OnboardingCarousel from '@/components/OnboardingCarousel';
import SignInScreen from '@/components/SignInScreen';
import HomeScreen from '@/components/HomeScreen';
import ReportIssueScreen from '@/components/ReportIssueScreen';
import { useToast } from '@/hooks/use-toast';

type AppScreen = 'splash' | 'onboarding' | 'signin' | 'home' | 'report' | 'my-reports' | 'squad' | 'alerts';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { toast } = useToast();

  const handleSplashComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('signin');
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setCurrentScreen('home');
    toast({
      title: "Welcome to DogSquad! 🐕",
      description: "You're now part of our community of dog lovers.",
    });
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as AppScreen);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleReportSubmit = () => {
    toast({
      title: "Report Submitted! ✅",
      description: "Local volunteers have been notified. We'll keep you updated.",
    });
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'onboarding':
        return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
      case 'signin':
        return <SignInScreen onSignIn={handleSignIn} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'report':
        return <ReportIssueScreen onBack={handleBackToHome} onSubmit={handleReportSubmit} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default Index;

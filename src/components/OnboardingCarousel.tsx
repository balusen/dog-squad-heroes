import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, MapPin, Users, Target } from 'lucide-react';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: MapPin,
    title: "Report stray dog issues",
    subtitle: "in your area",
    description: "Quickly report injured, lost, or stray dogs with just a few taps. Include photos and location to help volunteers respond faster.",
    bgColor: "bg-gradient-primary"
  },
  {
    icon: Users,
    title: "Join your local",
    subtitle: "Dog Squad",
    description: "Connect with passionate volunteers in your neighborhood. Become a feeder, rescuer, foster parent, or transport helper.",
    bgColor: "bg-gradient-secondary"
  },
  {
    icon: Target,
    title: "Track outcomes and",
    subtitle: "make a difference",
    description: "See the real impact of your reports and volunteer work. Every action helps create a safer community for our furry friends.",
    bgColor: "bg-gradient-hero"
  }
];

const OnboardingCarousel = ({ onComplete }: OnboardingCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`flex-1 ${slide.bgColor} transition-all duration-500 ease-in-out`}>
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="animate-fade-in">
            <div className="bg-white/20 rounded-full p-6 mb-8">
              <IconComponent className="w-16 h-16 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {slide.title}
            </h2>
            <h3 className="text-2xl font-semibold text-white/90 mb-6">
              {slide.subtitle}
            </h3>
            <p className="text-lg text-white/80 max-w-sm leading-relaxed">
              {slide.description}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-background p-6">
        <div className="flex justify-center mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button onClick={onComplete} variant="ghost">
            Skip
          </Button>

          <Button onClick={nextSlide} className="flex items-center">
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
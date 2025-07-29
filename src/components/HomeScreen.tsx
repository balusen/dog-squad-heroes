import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Users, 
  Bell, 
  FileText, 
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import communityHero from '@/assets/community-hero.png';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const recentReports = [
    { id: 1, type: 'Injured', location: 'MG Road', status: 'pending', time: '2h ago' },
    { id: 2, type: 'Lost', location: 'Brigade Road', status: 'resolved', time: '1d ago' },
    { id: 3, type: 'Feeding', location: 'Koramangala', status: 'in-progress', time: '3h ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'in-progress': return <AlertTriangle className="w-3 h-3" />;
      case 'resolved': return <CheckCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-primary-foreground">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">Good morning! 👋</h1>
            <p className="text-primary-foreground/80">Ready to help some dogs today?</p>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onNavigate('alerts')}
            className="bg-white/20 hover:bg-white/30 border-white/30"
          >
            <Bell className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">Koramangala Squad</span>
          </div>
          <p className="text-sm text-primary-foreground/80">
            3 active volunteers nearby
          </p>
        </div>
      </div>

      {/* Main CTA */}
      <div className="p-6 -mt-4">
        <Card className="bg-gradient-secondary border-0 text-accent-foreground animate-slide-up">
          <CardContent className="p-6">
            <Button 
              onClick={() => onNavigate('report')}
              size="lg"
              className="w-full bg-white text-accent hover:bg-white/90 font-semibold text-lg h-14"
            >
              <Plus className="w-6 h-6 mr-2" />
              Report an Issue
            </Button>
            <p className="text-center text-sm text-accent-foreground/80 mt-3">
              Help a dog in need - report in seconds
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => onNavigate('my-reports')}
          >
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-sm">My Reports</p>
              <p className="text-xs text-muted-foreground">3 active</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => onNavigate('squad')}
          >
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-sm">My Squad</p>
              <p className="text-xs text-muted-foreground">Join team</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <Card key={report.id} className="cursor-pointer hover:shadow-sm transition-all">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="font-medium text-sm">{report.type} Dog</span>
                      <Badge 
                        className={`ml-2 text-xs ${getStatusColor(report.status)}`}
                      >
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">{report.status}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {report.location} • {report.time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Hero Image */}
      <div className="px-6 mb-8">
        <Card>
          <CardContent className="p-0">
            <img 
              src={communityHero} 
              alt="Community helping dogs" 
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-2">Join the Movement</h3>
              <p className="text-xs text-muted-foreground">
                Every report helps create a safer community for our furry friends
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
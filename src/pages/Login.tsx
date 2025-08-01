import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Shield, BarChart3 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    // Mock Google login
    const mockUser = {
      id: 'user_123',
      email: 'waqasahmed.it@gmassmailer.com',
      name: 'Waqas Ahmed',
      picture: '/gmass-mailer/avatar.jpg',
    };
    login(mockUser);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Mail,
      title: 'CSV Upload & Personalization',
      description: 'Upload contacts and personalize emails with dynamic variables'
    },
    {
      icon: Shield,
      title: 'Smart Scheduling',
      description: 'Control sending intervals and daily limits to avoid spam detection'
    },
    {
      icon: BarChart3,
      title: 'Real-time Tracking',
      description: 'Monitor campaign progress with detailed analytics and reports'
    }
  ];

  return (
    <>
      <div className='background-image'>
        <div className="min-h-screen bg-white/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding & Features */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                  <img
                    src="/gmass-mailer/gmass-mailer-logo.png"
                    alt="GMassMailer Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <h1 className="text-4xl font-bold bg-gradient-rainbow bg-clip-text text-transparent">
                    GMassMailer
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground mb-8">
                  Automate Gmail Campaigns: Upload CSV, Personalize, Schedule, Track.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-primary p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-md border bg-white/95 backdrop-blur">
                <CardHeader className="text-center space-y-4">
                  <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                  <CardDescription className="text-base">
                    Sign in with your Google account to continue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    onClick={handleGoogleLogin}
                    variant="google"
                    size="lg"
                    className="w-full"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      By signing in, you agree to our terms of service and privacy policy
                    </p>
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      variant="link"
                      onClick={() => navigate('/pricing')}
                      className="text-primary hover:text-primary-dark"
                    >
                      View Pricing Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
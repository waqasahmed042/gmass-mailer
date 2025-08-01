import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  Plus,
  CreditCard,
  LogOut,
  User,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const stats = [
    {
      title: 'Total Campaigns',
      value: '12',
      icon: Mail,
      change: '+2 this month'
    },
    {
      title: 'Emails Sent',
      value: user?.emailsSent.toLocaleString() || '0',
      icon: Send,
      change: `${user?.emailsSent || 0}/${user?.emailLimit === Infinity ? '∞' : user?.emailLimit}`
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      icon: CheckCircle,
      change: '+1.2% from last month'
    },
    {
      title: 'Active Campaigns',
      value: '3',
      icon: Clock,
      change: '2 scheduled'
    }
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: 'Product Launch Newsletter',
      status: 'completed',
      sent: 1250,
      opened: 678,
      clicked: 123,
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Holiday Sale Campaign',
      status: 'active',
      sent: 890,
      opened: 445,
      clicked: 89,
      date: '2024-01-12'
    },
    {
      id: 3,
      name: 'Customer Feedback Survey',
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      date: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      case 'scheduled': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const usagePercentage = user ? (user.emailsSent / (user.emailLimit === Infinity ? 10000 : user.emailLimit)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ba1f7687-2cac-439b-9466-bbbb27a70db8.png" 
                alt="GMassMailer" 
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold text-primary">GMassMailer</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                  <Badge variant={user.plan === 'pro' ? 'default' : 'secondary'}>
                    {user.plan.toUpperCase()}
                  </Badge>
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            Manage your email campaigns and track performance
          </p>
        </div>

        {/* Usage Section */}
        {user?.plan === 'free' && (
          <Card className="mb-8 border-accent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Email Usage</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.emailsSent} / {user.emailLimit} emails sent this month
                  </p>
                </div>
                <Button variant="gradient" onClick={() => navigate('/pricing')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/campaign/start')}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-primary p-3 rounded-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">New Campaign</h3>
                  <p className="text-sm text-muted-foreground">Start a new email campaign</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-accent p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View detailed reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary p-3 rounded-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your account</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>Overview of your latest email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <p className="text-sm text-muted-foreground">{campaign.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{campaign.sent}</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{campaign.opened}</p>
                      <p className="text-xs text-muted-foreground">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{campaign.clicked}</p>
                      <p className="text-xs text-muted-foreground">Clicked</p>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Plus,
  CreditCard,
  Settings,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Campaigns',
      value: '12',
      icon: Mail,
      change: '+2 this month',
      color: 'text-primary'
    },
    {
      title: 'Emails Sent',
      value: user?.emailsSent.toLocaleString() || '0',
      icon: Send,
      change: `${user?.emailsSent || 0}/${user?.emailLimit === Infinity ? '∞' : user?.emailLimit}`,
      color: 'text-success'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      icon: CheckCircle,
      change: '+1.2% from last month',
      color: 'text-success'
    },
    {
      title: 'Active Campaigns',
      value: '3',
      icon: TrendingUp,
      change: '2 scheduled',
      color: 'text-accent'
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

  const dashboardContent = (
    <div className="p-6 max-w-7xl mx-auto bg-background min-h-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your email campaigns today.
        </p>
      </div>

      {/* Usage Section */}
      {user?.plan === 'free' && (
        <Card className="mb-8 border-l-4 border-l-accent bg-gradient-to-r from-accent/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Email Usage</h3>
                <p className="text-sm text-muted-foreground">
                  {user.emailsSent} / {user.emailLimit} emails sent this month
                </p>
              </div>
              <Button variant="gradient" onClick={() => navigate('/pricing')} size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
            <Progress value={usagePercentage} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(usagePercentage)}% of monthly limit used
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className="bg-gradient-primary p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group" onClick={() => navigate('/campaign/start')}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-primary p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">New Campaign</h3>
                <p className="text-sm text-muted-foreground">Start a new email campaign</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-accent p-4 rounded-xl group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Analytics</h3>
                <p className="text-sm text-muted-foreground">View detailed reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="bg-secondary p-4 rounded-xl group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your account</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Campaigns</CardTitle>
              <CardDescription>Overview of your latest email campaigns</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
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
  );

  return (
    <DashboardLayout>
      {dashboardContent}
    </DashboardLayout>
  );
};

export default Dashboard;
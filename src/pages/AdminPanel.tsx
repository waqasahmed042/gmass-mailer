import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  Users,
  Mail,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Mock admin data
  const adminStats = [
    {
      title: 'Total Users',
      value: '2,847',
      icon: Users,
      change: '+12% this month',
      color: 'text-primary'
    },
    {
      title: 'Emails Sent Today',
      value: '45,231',
      icon: Mail,
      change: '+8% from yesterday',
      color: 'text-success'
    },
    {
      title: 'Active Campaigns',
      value: '189',
      icon: TrendingUp,
      change: '23 new today',
      color: 'text-accent'
    },
    {
      title: 'System Health',
      value: '99.9%',
      icon: Shield,
      change: 'All systems operational',
      color: 'text-success'
    }
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'pro', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'free', status: 'active', joined: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', plan: 'pro', status: 'suspended', joined: '2024-01-13' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', plan: 'free', status: 'active', joined: '2024-01-12' },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High email volume detected on server 3', time: '10 minutes ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance completed successfully', time: '2 hours ago' },
    { id: 3, type: 'error', message: 'Failed login attempts from suspicious IP', time: '4 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'suspended': return 'bg-destructive text-destructive-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-accent" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-subtle">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="flex items-center space-x-3">
                  <img
                    src="/gmass-mailer/gmass-mailer-logo.png"
                    alt="GMassMailer"
                    className="w-8 h-8"
                  />
                  <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {user && (
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-gradient-primary text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
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
              Admin Dashboard
            </h2>
            <p className="text-muted-foreground">
              Monitor system performance and manage users
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Badge variant={user.plan === 'pro' ? 'default' : 'secondary'}>
                            {user.plan.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{user.joined}</span>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Overview</CardTitle>
                  <CardDescription>Monitor all active campaigns across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Campaign management features would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>Comprehensive analytics and reporting</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics dashboard would be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Recent system notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system-wide settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Email Server Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
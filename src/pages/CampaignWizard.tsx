import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload,
  Mail,
  Clock,
  BarChart3,
  CheckCircle,
  FileText,
  Eye,
  Calendar,
  Play,
  Download,
  RefreshCw
} from 'lucide-react';

const CampaignWizard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    subject: '',
    body: '',
    csvData: null,
    sendInterval: 60,
    dailyLimit: 500,
    pauseWhenLimitReached: true,
    resumeAutomatically: true,
    scheduledTime: ''
  });

  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Welcome', icon: FileText },
    { number: 2, title: 'Upload Contacts', icon: Upload },
    { number: 3, title: 'Compose Email', icon: Mail },
    { number: 4, title: 'Schedule', icon: Clock },
    { number: 5, title: 'Review & Launch', icon: Play },
    { number: 6, title: 'Complete', icon: CheckCircle }
  ];

  const sampleData = [
    { name: 'John Doe', email: 'john@example.com', company: 'Acme Corp' },
    { name: 'Jane Smith', email: 'jane@example.com', company: 'TechStart' },
    { name: 'Bob Johnson', email: 'bob@example.com', company: 'InnovateX' },
  ];

  const campaignProgress = {
    total: 1000,
    sent: 750,
    pending: 150,
    failed: 100
  };

  const emailStatuses = [
    { email: 'john@example.com', status: 'sent', timestamp: '2024-01-15 09:30:00' },
    { email: 'jane@example.com', status: 'sent', timestamp: '2024-01-15 09:31:00' },
    { email: 'bob@example.com', status: 'pending', timestamp: '-' },
    { email: 'alice@example.com', status: 'failed', timestamp: '2024-01-15 09:32:00' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep >= step.number 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step.number ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Welcome to Campaign Wizard</CardTitle>
              <CardDescription className="text-lg">
                Create and launch your Gmail campaign in just a few simple steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Upload CSV</h3>
                  <p className="text-sm text-muted-foreground">Import your contact list</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Personalize</h3>
                  <p className="text-sm text-muted-foreground">Customize your message</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Track</h3>
                  <p className="text-sm text-muted-foreground">Monitor performance</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter campaign name"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Your Contacts</CardTitle>
              <CardDescription>
                Upload a CSV file with your contact list. Required columns: Name, Email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drag and drop your CSV file</h3>
                <p className="text-muted-foreground mb-4">or click to browse files</p>
                <Button variant="outline">Choose File</Button>
              </div>
              
              {/* Sample Data Preview */}
              <div>
                <h3 className="font-semibold mb-4">Preview (Sample Data)</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Company</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((row, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{row.name}</td>
                          <td className="px-4 py-2">{row.email}</td>
                          <td className="px-4 py-2">{row.company}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  3 contacts detected. CSV format is valid.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Compose Your Email</CardTitle>
                <CardDescription>
                  Create your email content with personalization variables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    placeholder="Hi {{First Name}}, Special offer just for you!"
                    value={campaignData.subject}
                    onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea
                    id="body"
                    rows={12}
                    placeholder="Dear {{First Name}}, I hope this email finds you well at {{Company}}. Best regards, Your Name"
                    value={campaignData.body}
                    onChange={(e) => setCampaignData({...campaignData, body: e.target.value})}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p><strong>Available variables:</strong> {`{{First Name}}, {{Last Name}}, {{Email}}, {{Company}}`}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Email Preview
                </CardTitle>
                <CardDescription>See how your email will look to recipients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white min-h-96">
                  <div className="border-b pb-2 mb-4">
                    <p><strong>Subject:</strong> Hi John, Special offer just for you!</p>
                    <p className="text-sm text-muted-foreground">From: you@gmail.com</p>
                  </div>
                  <div className="space-y-2">
                    <p>Dear John,</p>
                    <p>I hope this email finds you well at Acme Corp.</p>
                    <p>Best regards,<br />Your Name</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Your Campaign
              </CardTitle>
              <CardDescription>
                Configure sending schedule and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="sendInterval">Send Interval (minutes)</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dailyLimit">Daily Email Limit</Label>
                <Input
                  id="dailyLimit"
                  type="number"
                  defaultValue="500"
                  max="1000"
                  min="1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Maximum 1000 emails per day for Gmail accounts
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Pause When Limit Reached</Label>
                    <p className="text-sm text-muted-foreground">Stop sending when daily limit is reached</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Resume Automatically Next Day</Label>
                    <p className="text-sm text-muted-foreground">Continue campaign the next day</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Review & Launch Campaign</CardTitle>
              <CardDescription>
                Review your campaign settings before launching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Campaign Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {campaignData.name || 'New Campaign'}</p>
                    <p><strong>Recipients:</strong> 3 contacts</p>
                    <p><strong>Subject:</strong> {`Hi {{First Name}}, Special offer just for you!`}</p>
                    <p><strong>Send Interval:</strong> 60 minutes</p>
                    <p><strong>Daily Limit:</strong> 500 emails</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Account Status</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Plan:</strong> <Badge variant={user?.plan === 'pro' ? 'default' : 'secondary'}>{user?.plan?.toUpperCase()}</Badge></p>
                    <p><strong>Emails Sent This Month:</strong> {user?.emailsSent || 0}</p>
                    <p><strong>Remaining:</strong> {user?.emailLimit === Infinity ? '∞' : (user?.emailLimit || 1000) - (user?.emailsSent || 0)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">⚠️ Important Notice</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Ensure your Gmail account allows less secure apps or use App Passwords</li>
                  <li>• Campaign will start immediately after launch</li>
                  <li>• You can pause or stop the campaign at any time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <div className="max-w-5xl mx-auto space-y-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Campaign Launched Successfully!</CardTitle>
                <CardDescription>Your email campaign is now running</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-success">{campaignProgress.sent}</p>
                    <p className="text-sm text-muted-foreground">Sent</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-accent">{campaignProgress.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-destructive">{campaignProgress.failed}</p>
                    <p className="text-sm text-muted-foreground">Failed</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">{campaignProgress.total}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
                
                <Progress value={75} className="h-3 mb-4" />
                <p className="text-center text-sm text-muted-foreground mb-6">
                  75% Complete - Estimated completion in 2 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Status</CardTitle>
                <CardDescription>Real-time status of your campaign emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailStatuses.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{email.email}</span>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(email.status)}>
                          {email.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{email.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Failed Emails
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="gradient" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit Wizard
              </Button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/ba1f7687-2cac-439b-9466-bbbb27a70db8.png" 
                  alt="GMassMailer" 
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold text-primary">Campaign Wizard</h1>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepIndicator />
        
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < totalSteps && (
          <div className="flex justify-between max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              variant={currentStep === 5 ? "gradient" : "default"}
              onClick={nextStep}
            >
              {currentStep === 5 ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Launch Campaign
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignWizard;
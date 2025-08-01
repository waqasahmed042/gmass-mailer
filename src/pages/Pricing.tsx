import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Check, ArrowLeft, Crown, Mail, Zap, Shield } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { user, upgradeToProPlan } = useAuth();

  const handleUpgrade = () => {
    upgradeToProPlan();
    navigate('/dashboard');
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '1,000 emails per month',
        'Basic templates',
        'CSV upload',
        'Basic analytics',
        'Email scheduling',
        'Community support'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const,
      popular: false,
      current: user?.plan === 'free'
    },
    {
      name: 'Pro',
      price: '$6',
      period: '/month',
      description: 'For growing businesses',
      features: [
        'Unlimited emails',
        'Advanced templates',
        'CSV upload & validation',
        'Advanced analytics & reporting',
        'Smart scheduling',
        'Priority support',
        'A/B testing',
        'Custom domains',
        'API access'
      ],
      buttonText: user?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      buttonVariant: user?.plan === 'pro' ? 'outline' as const : 'gradient' as const,
      popular: true,
      current: user?.plan === 'pro'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={() => navigate(user ? '/dashboard' : '/login')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <img
                src="/gmass-mailer/gmass-mailer-logo.png"
                alt="GMassMailer"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold text-primary">GMassMailer</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your <span className="bg-gradient-rainbow bg-clip-text text-transparent">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scale your email campaigns with our flexible pricing options.
            Start free and upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 ${plan.popular ? 'border-primary shadow-lg scale-105' : ''
                } ${plan.current ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-end justify-center space-x-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  className="w-full"
                  onClick={plan.name === 'Pro' && !plan.current ? handleUpgrade : undefined}
                  disabled={plan.current}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Pro?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Unlimited Emails</h3>
              <p className="text-sm text-muted-foreground">
                Send as many emails as you need without monthly limits
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Features</h3>
              <p className="text-sm text-muted-foreground">
                A/B testing, custom domains, and priority support
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Priority Support</h3>
              <p className="text-sm text-muted-foreground">
                Get help faster with dedicated pro support
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 text-left">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What happens if I exceed the free plan limit?</h3>
                <p className="text-sm text-muted-foreground">
                  You'll be notified when approaching the limit and given the option to upgrade to continue sending.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-sm text-muted-foreground">
                  No setup fees. You only pay the monthly subscription for the Pro plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
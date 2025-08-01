import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Mail,
  BarChart3,
  Settings,
  CreditCard,
  Users,
  Shield,
  Plus,
  Calendar,
  FileText,
  HelpCircle
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'New Campaign', url: '/campaign/start', icon: Plus },
  { title: 'Campaigns', url: '/campaigns', icon: Mail },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Schedule', url: '/schedule', icon: Calendar },
  { title: 'Templates', url: '/templates', icon: FileText },
];

const bottomMenuItems = [
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Pricing', url: '/pricing', icon: CreditCard },
  { title: 'Help', url: '/help', icon: HelpCircle },
];

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavCls = () =>
    'flex items-center w-full px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors duration-200';

  return (
    <>
      <Sidebar className="border-r bg-white">
        <SidebarContent className="flex flex-col h-full bg-white">
          {/* Logo Section */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src="/gmass-mailer/gmass-mailer-logo.png"
                alt="GMassMailer"
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-lg font-bold bg-gradient-rainbow bg-clip-text text-transparent">
                  GMassMailer
                </h1>
                <p className="text-xs text-muted-foreground">Email Automation</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          {/* {user && (
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={user.plan === 'pro' ? 'default' : 'secondary'} className="text-xs">
                      {user.plan.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {user.emailsSent}/{user.emailLimit === Infinity ? '∞' : user.emailLimit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Main Navigation */}
          <SidebarGroup className="flex-1">
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls()}>
                        <item.icon className="w-4 h-4" />
                        <span className="ml-2">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          {/* Admin Section */}
          {user?.isAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin" className={getNavCls}>
                        <Shield className="w-4 h-4" />
                        <span className="ml-2">Admin Panel</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/users" className={getNavCls}>
                        <Users className="w-4 h-4" />
                        <span className="ml-2">User Management</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Bottom Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-4 h-4" />
                        <span className="ml-2">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
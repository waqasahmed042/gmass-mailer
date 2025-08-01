import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
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
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'New Campaign',
    url: '/campaign/start',
    icon: Plus,
  },
  {
    title: 'Campaigns',
    url: '/campaigns',
    icon: Mail,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Schedule',
    url: '/schedule',
    icon: Calendar,
  },
  {
    title: 'Templates',
    url: '/templates',
    icon: FileText,
  },
];

const bottomMenuItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Pricing',
    url: '/pricing',
    icon: CreditCard,
  },
  {
    title: 'Help',
    url: '/help',
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted/50';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ba1f7687-2cac-439b-9466-bbbb27a70db8.png" 
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
          ) : (
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/ba1f7687-2cac-439b-9466-bbbb27a70db8.png" 
                alt="GMassMailer" 
                className="w-8 h-8"
              />
            </div>
          )}
        </div>

        {/* User Info */}
        {!collapsed && user && (
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
        )}

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
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
                      {!collapsed && <span>Admin Panel</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/users" className={getNavCls}>
                      <Users className="w-4 h-4" />
                      {!collapsed && <span>User Management</span>}
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
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
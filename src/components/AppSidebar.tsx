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
    isActive 
      ? 'bg-primary text-primary-foreground font-medium shadow-md' 
      : 'hover:bg-primary/10 hover:text-primary transition-colors duration-200';

  return (
    <Sidebar className="border-r bg-white" collapsible="icon">
      <SidebarContent className="flex flex-col h-full bg-white">
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
                  <SidebarMenuButton 
                    asChild 
                    className="group relative"
                    title={collapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      {!collapsed && <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>}
                      {collapsed && (
                        <span className="absolute left-12 bg-card border rounded-md px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {item.title}
                        </span>
                      )}
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
                  <SidebarMenuButton 
                    asChild 
                    className="group relative"
                    title={collapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      {!collapsed && <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>}
                      {collapsed && (
                        <span className="absolute left-12 bg-card border rounded-md px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {item.title}
                        </span>
                      )}
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
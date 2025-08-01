import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, Menu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col bg-background">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b h-14 flex items-center justify-between px-4">
            <div className="flex items-center gap-4 w-full max-w-xl">
              <SidebarTrigger variant="ghost" size="icon" className="p-2 rounded-md">
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <Input
                type="text"
                placeholder="Search Campaigns..."
                className="hidden lg:flex w-full h-9"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Notification */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
              </Button>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Avatar className="w-8 h-8 cursor-pointer">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback>WA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-0">
                  {user && (
                    <div className="p-4 border-b">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{user.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant={user.plan === 'pro' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
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
                  <DropdownMenuItem onClick={logout} className='m-2 cursor-pointer'>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
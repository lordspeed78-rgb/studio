'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Heart,
  HeartPulse,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [messagesLeft, setMessagesLeft] = React.useState<number | string>('...');
  const [isGuest, setIsGuest] = React.useState(false);

  React.useEffect(() => {
    const guestMessages = localStorage.getItem('crushai-guest-messages');
    if (guestMessages) {
      setMessagesLeft(parseInt(guestMessages, 10));
      setIsGuest(true);
    } else {
      // Assuming a logged-in user has a different limit
      setMessagesLeft(100);
      setIsGuest(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('crushai-guest-messages');
    localStorage.removeItem('crushai-persona');
    router.push('/auth');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Button
                variant="ghost"
                className="h-10 w-10 p-2 text-primary"
                asChild
              >
                <Link href="/chat">
                  <HeartPulse className="h-8 w-8" />
                </Link>
              </Button>
              <h2 className="text-xl font-semibold text-primary">CrushAI</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/chat'}>
                  <Link href="/chat">
                    <MessageSquare />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/profile'}>
                  <Link href="/profile">
                    <Settings />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-2 space-y-2">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Heart className="text-primary" /> <span>Upgrade to Pro</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
              <div className="font-semibold text-sm">
                Messages Left: {messagesLeft} {isGuest ? '' : '/ day'}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://placehold.co/100x100.png"
                        alt="User Avatar"
                        data-ai-hint="user avatar"
                      />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Upgrade</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

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
  Heart,
  LogOut,
  Settings,
  User,
  Bot,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/bottom-nav';

export default function MainAppLayout({
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
      // This is a logged in user, they have a different limit.
      // We'll set a placeholder, but a real app would fetch this.
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
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
           <Heart className="w-7 h-7" />
           CrushAI
        </Link>
        <div className="flex items-center gap-4">
          <div className="font-semibold text-sm hidden md:block">
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
               <DropdownMenuItem onClick={() => router.push('/lovecoach')}>
                <Award className="mr-2 h-4 w-4" />
                <span>LoveCoach</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/wingsman')}>
                <Bot className="mr-2 h-4 w-4" />
                <span>Wingsman</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/ai-girlfriend')}>
                <Heart className="mr-2 h-4 w-4" />
                <span>AI Girlfriend</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/upgrade')}>
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
      
      <main className="flex-1 p-4 md:p-6 pb-24">{children}</main>

      <BottomNav />
    </div>
  );
}

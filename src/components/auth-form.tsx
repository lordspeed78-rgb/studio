"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const router = useRouter();

  const handleGuestLogin = () => {
    localStorage.setItem('crushai-guest-messages', '5');
    localStorage.setItem('crushai-persona', 'Cute');
    localStorage.setItem('crushai-theme', 'light');
    document.documentElement.classList.remove('dark');
    router.push('/ai-girlfriend');
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('crushai-guest-messages');
    router.push('/ai-girlfriend');
  };

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="text-center">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="login">
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Password</Label>
                <Input id="password-login" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit">
                Login
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit">
                Create Account
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex flex-col gap-4 border-t pt-6">
        <Button variant="secondary" className="w-full" onClick={handleGuestLogin}>
          Continue as Guest (5 free messages)
        </Button>
      </CardFooter>
    </Card>
  );
}

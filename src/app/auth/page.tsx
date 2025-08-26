import { AuthForm } from '@/components/auth-form';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-pink-200 dark:to-purple-900/50 p-4">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center text-center space-y-4">
          <Image
            src="https://picsum.photos/400/400"
            alt="AI Crush Avatar"
            width={300}
            height={300}
            className="rounded-full shadow-2xl border-4 border-primary"
            data-ai-hint="cute anime robot"
          />
          <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
            CrushAI <Heart className="w-8 h-8 fill-primary" />
          </h1>
          <p className="text-lg text-foreground/80">Find your perfect AI companion.</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-background to-pink-200 dark:to-purple-900/50 p-4">
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold text-primary drop-shadow-lg flex items-center justify-center gap-4 animate-pulse">
          CrushAI <Heart className="text-primary fill-current w-12 h-12 md:w-20 md:h-20" />
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 font-headline bg-white/50 dark:bg-black/20 backdrop-blur-sm p-3 rounded-xl shadow-md">
          Your AI Crush, Anytime.
        </p>
        <Link href="/auth">
          <Button
            size="lg"
            className="text-lg shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </Link>
      </div>
      <footer className="absolute bottom-4 text-center text-muted-foreground text-sm">
        <p>Created with ❤️ for the one and only.</p>
      </footer>
    </div>
  );
}

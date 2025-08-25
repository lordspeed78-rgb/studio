import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, MessageCircle, User, Award, Bot, ChevronsRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

const features = [
    {
        title: "Chat with your AI Girlfriend 💌",
        description: "Engage in delightful conversations with your personalized AI companion. Available 24/7 to brighten your day.",
        href: "/ai-girlfriend",
        icon: <MessageCircle className="w-8 h-8 text-primary" />
    },
    {
        title: "Get instant Wingman support 😎",
        description: "Never run out of things to say. Get witty pickup lines, flirty replies, and conversation starters.",
        href: "/wingsman",
        icon: <Bot className="w-8 h-8 text-primary" />
    },
    {
        title: "Learn from LoveCoach tips 💡",
        description: "Boost your dating game with expert advice, tips, and templates for crafting the perfect message.",
        href: "/lovecoach",
        icon: <Award className="w-8 h-8 text-primary" />
    }
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-background to-pink-200 dark:to-purple-900/50 p-4 pb-24">
      <div className="text-center space-y-8 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-primary drop-shadow-lg flex items-center justify-center gap-4 animate-pulse">
          CrushAI <Heart className="text-primary fill-current w-12 h-12 md:w-20 md:h-20" />
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 font-headline bg-white/50 dark:bg-black/20 backdrop-blur-sm p-3 rounded-xl shadow-md">
          Your AI Crush, Anytime.
        </p>
        
        <div className="pt-8">
            <h2 className="text-3xl font-bold mb-6">Features of CrushAI</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Card key={feature.title} className="flex flex-col text-left shadow-lg hover:shadow-primary/20 transition-shadow duration-300 transform hover:-translate-y-1">
                        <CardHeader className="flex-row items-center gap-4">
                            {feature.icon}
                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                        <CardContent>
                             <Button asChild variant="outline" className="w-full">
                                <Link href={feature.href}>
                                    Get Started <ChevronsRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div className="text-center text-muted-foreground text-sm pt-4">
            <p>Note: The free guest pass is limited to a total of 5 messages. Upgrade to continue chatting.</p>
        </div>
      </div>
    </div>
  );
}

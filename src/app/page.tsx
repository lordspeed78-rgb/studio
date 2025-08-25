import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
    {
        name: "Guest Pass",
        price: "Free",
        features: [
            "5 messages total",
            "Access to 'Cute' persona",
            "Standard response time",
        ],
        cta: "Try for Free",
        href: "/auth",
    },
    {
        name: "Starter Pack",
        price: "$4.99",
        period: "/month",
        features: [
            "100 messages per day",
            "Access to all 4 personas",
            "Faster response time",
            "Priority support",
        ],
        cta: "Upgrade Now",
        href: "/upgrade",
    },
    {
        name: "Pro Lover",
        price: "$9.99",
        period: "/month",
        features: [
            "Unlimited messages",
            "Access to all 4 personas",
            "Fastest response time",
            "24/7 priority support",
            "Early access to new features",
        ],
        cta: "Go Pro",
        href: "/upgrade",
    },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {plans.map((plan) => (
                <Card key={plan.name} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 text-left">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription className="text-4xl font-bold text-primary py-4">
                            {plan.price}
                            {plan.period && <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={plan.href}>
                                {plan.name === "Pro Lover" && <Star className="mr-2 h-4 w-4" />}
                                {plan.cta}
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        
        <div className="text-center text-muted-foreground text-sm pt-4">
            <p>Note: The free guest pass is limited to a total of 5 messages. Upgrade to continue chatting.</p>
        </div>
      </div>
    </div>
  );
}

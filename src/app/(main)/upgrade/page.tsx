"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
    {
        name: "Guest Pass",
        price: "Free",
        features: [
            "5 messages total",
            "Access to 'Cute' persona",
            "Standard response time",
        ],
        cta: "Currently Active",
        disabled: true,
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
    },
]

export default function UpgradePage() {
    const router = useRouter();

    const handleUpgrade = () => {
        // Here you would integrate with a payment provider like Stripe
        alert("Redirecting to checkout...");
        // router.push('/checkout/pro');
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Find a Plan That's Right For You
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Unlock more features and keep the conversation going with your AI Crush.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card key={plan.name} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
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
                            <Button className="w-full" onClick={handleUpgrade} disabled={plan.disabled}>
                                {plan.name === "Pro Lover" && <Star className="mr-2 h-4 w-4" />}
                                {plan.cta}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

             <div className="text-center mt-12 text-muted-foreground text-sm">
                <p>Note: The free guest pass is limited to a total of 5 messages. Upgrade to continue chatting.</p>
            </div>
        </div>
    );
}

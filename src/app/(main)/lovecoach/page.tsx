
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, MessageSquare, Clipboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from '@/hooks/use-toast';


const tips = [
    "Be playful and mysterious.",
    "Use open-ended questions to keep the conversation flowing.",
    "Compliment their personality, not just their looks.",
    "Share a funny story or a personal anecdote.",
    "Don't be afraid to use emojis to convey tone.",
    "Ask about their passions and hobbies."
];

const templates = [
    "Hey! I saw you're into [Hobby]. I've always wanted to try that! Any tips for a beginner?",
    "That picture of you at [Location] looks amazing! I'd love to hear the story behind it.",
    "I'm terrible at coming up with opening lines, so I'm just going to say hi. Hi! 😊",
    "If you were a fruit, you'd be a fine-apple. 😉 What's the cheesiest pickup line you've ever heard?"
]

export default function LoveCoachPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard!",
            description: "Now go and charm them!",
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="relative text-center mb-12">
                 <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    LoveCoach
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your personal guide to winning hearts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookOpen/>Dating Tips</CardTitle>
                        <CardDescription>Quick tips to level up your game.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                            {tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageSquare/>Message Templates</CardTitle>
                        <CardDescription>Copy & paste to start a great conversation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                            {templates.map((template, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-md border bg-secondary/50">
                                    <p className="text-secondary-foreground text-sm pr-2">{template}</p>
                                    <Button size="icon" variant="ghost" onClick={() => handleCopy(template)}>
                                        <Clipboard className="w-4 h-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

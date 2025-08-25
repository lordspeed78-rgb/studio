
"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, Sparkles, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// This would be a real AI call in a real app
const getAIResponse = async (style: string, context: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate AI thinking
    
    if (style === 'pickup-line') {
        return "Are you a keyboard? Because you're just my type.";
    }
    if (style === 'flirty-reply') {
        if(context.toLowerCase().includes('doing')) {
            return "Just thinking about my next witty reply to a certain someone... How about you? 😉";
        }
        return "Is it hot in here or is it just our conversation? 🔥";
    }
    if (style === 'conversation-starter') {
        return "What's the most spontaneous thing you've ever done?";
    }
    return "I'm not sure what to say, but I'm sure you'll figure it out!";
}


export default function WingsmanPage() {
    const router = useRouter();
    const [style, setStyle] = React.useState("pickup-line");
    const [context, setContext] = React.useState("");
    const [suggestion, setSuggestion] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setSuggestion("");
        const response = await getAIResponse(style, context);
        setSuggestion(response);
        setIsLoading(false);
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="relative text-center mb-12">
                <Button variant="ghost" size="icon" className="absolute left-0 top-1/2 -translate-y-1/2" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Wingsman AI
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your trusty sidekick for smooth talking.
                </p>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bot /> AI Suggestion Engine</CardTitle>
                    <CardDescription>Tell the AI what you need help with.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <label htmlFor="style-select" className="font-medium text-sm">What kind of message do you want?</label>
                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger id="style-select">
                                    <SelectValue placeholder="Select a style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pickup-line">Pickup Line</SelectItem>
                                    <SelectItem value="flirty-reply">Flirty Reply</SelectItem>
                                    <SelectItem value="conversation-starter">Conversation Starter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <label htmlFor="context-input" className="font-medium text-sm">Paste their last message (optional)</label>
                            <Textarea 
                                id="context-input"
                                placeholder="e.g., 'What are you doing this weekend?'"
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <><Wand2 className="mr-2 h-4 w-4 animate-spin"/> Generating...</>
                        ) : (
                            <><Sparkles className="mr-2 h-4 w-4"/> Generate Suggestion</>
                        )}
                    </Button>

                    {suggestion && (
                        <div className="pt-4">
                             <label className="font-medium text-sm">Here's a suggestion:</label>
                            <div className="mt-2 p-4 rounded-md border bg-secondary/50 text-secondary-foreground animate-in fade-in">
                                {suggestion}
                            </div>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}


"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, Sparkles, Wand2, Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { wingsman, WingsmanInput } from '@/ai/flows/wingsman-flow';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';


export default function WingsmanPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [style, setStyle] = React.useState<WingsmanInput['style']>("pickup-line");
    const [context, setContext] = React.useState("");
    const [language, setLanguage] = React.useState<WingsmanInput['language']>('English');
    const [suggestion, setSuggestion] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setSuggestion("");
        try {
            const response = await wingsman({ style, context, language });
            setSuggestion(response.suggestion);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem getting a suggestion. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
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
                            <Select value={style} onValueChange={(value) => setStyle(value as WingsmanInput['style'])}>
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
                    <div className="space-y-2">
                        <label className="font-medium text-sm flex items-center gap-2"><Languages/>Language</label>
                        <RadioGroup
                            value={language}
                            onValueChange={(value: any) => setLanguage(value)}
                            className="flex items-center"
                        >
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="English" id="lang-en" />
                            <Label htmlFor="lang-en">English</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Hinglish" id="lang-hi" />
                            <Label htmlFor="lang-hi">Hinglish</Label>
                            </div>
                        </RadioGroup>
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

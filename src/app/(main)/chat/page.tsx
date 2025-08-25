"use client";

import * as React from 'react';
import { aiPersonaChat, AIPersonaChatInput } from '@/ai/flows/ai-persona-chat';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Send, Mic, Heart, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MessageBubble } from '@/components/message-bubble';
import type { Message } from '@/lib/types';
import { useRouter } from 'next/navigation';

const initialMessages: Message[] = [
    { id: '1', text: "Hey! I'm so excited to chat with you! What's on your mind? 😊", sender: 'ai' },
];

export default function ChatPage() {
    const [messages, setMessages] = React.useState<Message[]>(initialMessages);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [messagesLeft, setMessagesLeft] = React.useState(100);
    const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const scrollViewportRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const guestMessages = localStorage.getItem('crushai-guest-messages');
        if (guestMessages !== null) {
            setMessagesLeft(parseInt(guestMessages, 10));
        } else {
            // Logged in user, maybe fetch from a service later
            setMessagesLeft(100); 
        }
    }, []);

    React.useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTo({
                top: scrollViewportRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const isGuest = localStorage.getItem('crushai-guest-messages') !== null;
        if (isGuest && messagesLeft <= 0) {
            setShowUpgradeModal(true);
            return;
        }

        const newUserMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        if (isGuest) {
            const newCount = messagesLeft - 1;
            setMessagesLeft(newCount);
            localStorage.setItem('crushai-guest-messages', newCount.toString());
        }

        try {
            const persona = (localStorage.getItem('crushai-persona') || 'Cute') as AIPersonaChatInput['persona'];
            const aiResponse = await aiPersonaChat({ message: currentInput, persona });
            const newAiMessage: Message = { id: (Date.now() + 1).toString(), text: aiResponse.response, sender: 'ai' };
            setMessages(prev => [...prev, newAiMessage]);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem getting a response. Please try again.',
            });
            // Revert message count if AI call fails for guest
            if (isGuest) {
                const newCount = messagesLeft;
                setMessagesLeft(newCount);
                localStorage.setItem('crushai-guest-messages', newCount.toString());
            }
             // Also remove the user message that failed to send
            setMessages(prev => prev.slice(0, prev.length -1));
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-card rounded-xl shadow-md">
            <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
                <div className="p-6 space-y-6">
                    {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <Avatar className="h-8 w-8">
                                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="cute anime robot" />
                                <AvatarFallback><Bot/></AvatarFallback>
                            </Avatar>
                            <div className="flex items-center space-x-1 rounded-2xl px-4 py-3 bg-secondary text-secondary-foreground rounded-bl-none shadow-sm">
                                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background/50 rounded-b-xl">
                <form onSubmit={handleSendMessage} className="relative">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Say something nice..."
                        className="pr-24 min-h-[52px] resize-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        disabled={isLoading}
                    />
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" type="button"><Mic className="h-5 w-5"/></Button>
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            <Send className="h-5 w-5"/>
                        </Button>
                    </div>
                </form>
            </div>
            <AlertDialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">Unlock Unlimited Crush Time <Heart className="text-primary fill-primary"/></AlertDialogTitle>
                    <AlertDialogDescription>
                        You've run out of free messages. Upgrade your plan to keep the conversation going!
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>Maybe Later</Button>
                    <AlertDialogAction onClick={() => router.push('/upgrade')}>Upgrade Now</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

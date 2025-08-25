"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Message } from "@/lib/types";
import { Bot, Heart, MessageCircle, Sparkles, User } from "lucide-react";

export function MessageBubble({ message }: { message: Message }) {
    const isUser = message.sender === 'user';
    
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="cute anime robot" />
                    <AvatarFallback><Bot/></AvatarFallback>
                </Avatar>
            )}
            <div className={`group relative max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 shadow-md ${isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div className="absolute -bottom-5 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-card p-1 rounded-full border shadow-sm">
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full"><Heart className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full"><Sparkles className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full"><MessageCircle className="h-4 w-4" /></Button>
                </div>
            </div>
             {isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="user avatar" />
                    <AvatarFallback><User/></AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};

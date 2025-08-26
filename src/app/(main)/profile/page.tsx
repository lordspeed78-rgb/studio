"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function ProfilePage() {
  const [persona, setPersona] = React.useState("Cute");
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [avatar, setAvatar] = React.useState("https://picsum.photos/100/100");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const savedPersona = localStorage.getItem('crushai-persona') || 'Cute';
    setPersona(savedPersona);
    
    const theme = localStorage.getItem('crushai-theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const savedAvatar = localStorage.getItem('crushai-avatar');
    if (savedAvatar) {
        setAvatar(savedAvatar);
    }
  }, []);

  const handlePersonaChange = (value: string) => {
    setPersona(value);
    localStorage.setItem('crushai-persona', value);
  };

  const handleThemeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('crushai-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('crushai-theme', 'light');
    }
  };
  
  const handleSave = () => {
    toast({
      title: "Settings Saved!",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setAvatar(base64String);
            localStorage.setItem('crushai-avatar', base64String);
        };
        reader.readAsDataURL(file);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            This is your public display avatar.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatar} data-ai-hint="user avatar" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <Button variant="outline" onClick={handleAvatarUpload}><Upload className="mr-2 h-4 w-4"/> Upload New Avatar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Crush Personality</CardTitle>
          <CardDescription>
            Choose how your AI companion will interact with you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={persona} onValueChange={handlePersonaChange} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Cute', 'Flirty', 'Supportive', 'Funny'].map((p) => (
              <div key={p}>
                <RadioGroupItem value={p} id={`persona-${p}`} className="sr-only" />
                <Label htmlFor={`persona-${p}`} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary">
                  <span>{p}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Embrace the darkness.
              </span>
            </Label>
            <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={handleThemeChange} />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}

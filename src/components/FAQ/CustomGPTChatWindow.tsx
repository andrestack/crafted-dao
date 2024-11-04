"use client";

import { useState } from "react";
import { X, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ChatbotFAQCard from "./ChatWindowCard";

export function CustomGptChatWindow() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div className="relative">
          <div className="absolute bottom-12 right-0 bg-white text-black text-xs p-2 rounded shadow-lg">
            <span>Ask me anything!</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
            onClick={() => setIsOpen(true)}
            aria-label="Open Custom GPT Chat"
          >
            <MessageCircleQuestion className="h-6 w-6" />
          </Button>
        </div>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-lg z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Have more questions?
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <ChatbotFAQCard />
          </CardContent>
        </Card>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { MessageCircleQuestion, SquareArrowOutUpRight as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpandableChatButtonProps {
  text?: string;
  href?: string;
}

export default function Component({
  text = "Have questions? Chat with GPT John",
  href = "https://chatgpt.com/g/g-VgKzqOQ5m-john-the-craftsman-s-guide",
}: ExpandableChatButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed right-4 z-50">
      <Button
        variant="ghost"
        className={`
          relative flex items-center justify-center rounded-full
          transition-all duration-500 ease-in-out overflow-hidden
          ${isExpanded ? "pr-4 bg-crafted-white" : "aspect-square w-12"}
          hover:bg-orange-200
        `}
        onClick={toggleExpand}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse chat button" : "Expand chat button"}
      >
        <MessageCircleQuestion className="w-8 h-8 flex-shrink-0 text-crafted-black" />
        <span
          className={`
            ml-2 whitespace-nowrap overflow-hidden transition-all duration-500
            ${isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"}
          `}
        >
          {text}
        </span>
        {isExpanded && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-2 text-foreground hover:text-foreground/80 transition-colors duration-200"
            aria-label="Open chat in new window"
          >
            <LinkIcon className="w-4 h-4" />
          </a>
        )}
      </Button>
    </div>
  );
}

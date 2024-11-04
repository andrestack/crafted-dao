import { Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ChatbotFAQCardProps {
  text?: string;
  href?: string;
}

export default function Component({
  text = "Visit our custom Chatbot John",
  href = "https://chatgpt.com/g/g-VgKzqOQ5m-john-the-craftsman-s-guide",
}: ChatbotFAQCardProps) {
  return (
    <Card className="bg-gradient h-full">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-crafted-black mb-2">{text}</p>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-crafted-black hover:text-crafted-orange "
          aria-label={`External link: ${text}`}
        >
          <Bot className="w-20 h-20 mt-10 shadow-xl rounded-full " />
        </Link>
      </CardContent>
    </Card>
  );
}

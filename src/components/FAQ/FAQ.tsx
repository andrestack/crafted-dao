import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomGptChatWindow } from "./CustomGPTChatWindow";
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGridProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
}

export default function Component({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our products and services.",
  faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all our products.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days within the continental US.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping times and costs may vary.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our support team via email at support@example.com or by phone at 1-800-123-4567.",
    },
  ],
}: FAQGridProps) {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <Separator className="mb-4" />
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CustomGptChatWindow />
    </>
  );
}

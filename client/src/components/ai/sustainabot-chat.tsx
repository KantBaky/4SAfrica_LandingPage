import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiService } from '@/lib/ai-service';
import type { ChatMessage } from '@/types/sustainability';

const chatSuggestions = [
  'Find solutions for my region',
  'Investment opportunities',
  'How does AI help sustainability?',
  'Tell me about SDGs',
];

export function SustainaBotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hello! I'm SustainaBot, your AI assistant for sustainability solutions in Africa. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const sessionId = useRef(Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiService.getChatResponse(message, sessionId.current);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "I'm experiencing technical difficulties. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="w-80 max-h-96 mb-4 shadow-2xl">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <h4 className="font-semibold">SustainaBot</h4>
                <p className="text-xs opacity-90">AI Sustainability Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
              data-testid="button-close-chat"
            >
              <i className="fas fa-times"></i>
            </Button>
          </div>
          
          <CardContent className="p-0">
            <ScrollArea className="h-64 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground ml-8'
                        : 'bg-muted mr-8'
                    }`}
                    data-testid={`chat-message-${message.id}`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="bg-muted p-3 rounded-lg mr-8">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
                
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2">
                    {chatSuggestions.map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs"
                        data-testid={`button-suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="bg-primary text-primary-foreground btn-seed-hover"
                  data-testid="button-send-chat"
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-xl animate-pulse-slow"
        data-testid="button-open-chat"
      >
        <i className="fas fa-robot text-xl"></i>
      </Button>
    </div>
  );
}

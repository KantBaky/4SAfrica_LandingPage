import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLowBandwidth } from '@/hooks/use-low-bandwidth';
import { useVoiceSearch } from '@/hooks/use-voice-search';
import { useToast } from '@/hooks/use-toast';

export function AccessibilityControls() {
  const { isLowBandwidth, toggleLowBandwidth } = useLowBandwidth();
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState('');

  const { isListening, isSupported, startListening, stopListening } = useVoiceSearch({
    onResult: (transcript) => {
      setSearchInput(transcript);
      toast({
        title: "Voice Search Result",
        description: `Heard: "${transcript}"`,
      });
    },
    onError: (error) => {
      toast({
        title: "Voice Search Error",
        description: error,
        variant: "destructive",
      });
    },
  });

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLowBandwidth}
        data-testid="button-low-bandwidth-toggle"
        className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
      >
        <i className="fas fa-wifi mr-2"></i>
        {isLowBandwidth ? 'High Bandwidth' : 'Low Bandwidth'}
      </Button>
      
      {isSupported && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleVoiceSearch}
          data-testid="button-voice-search"
          className={`bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground ${
            isListening ? 'bg-red-500 text-white animate-pulse' : ''
          }`}
        >
          <i className={`fas fa-microphone mr-2 ${isListening ? 'animate-pulse' : ''}`}></i>
          {isListening ? 'Listening...' : 'Voice Search'}
        </Button>
      )}
      
      {searchInput && (
        <div className="bg-card p-3 rounded-md shadow-lg max-w-xs">
          <p className="text-sm text-muted-foreground">
            Last search: "{searchInput}"
          </p>
        </div>
      )}
    </div>
  );
}

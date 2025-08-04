import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAssistantProps {
  text: string;
  autoPlay?: boolean;
}

export default function VoiceAssistant({ text, autoPlay = false }: VoiceAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const speak = (message: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Voice Assistant",
          description: "Sorry, voice feature is not available right now.",
          variant: "destructive"
        });
      };

      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Voice Assistant",
        description: "Voice feature is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className="h-10 w-10 rounded-full bg-primary/10 border-primary/20 hover:bg-primary/20"
      title={isSpeaking ? "Stop speaking" : "Read aloud"}
    >
      {isSpeaking ? (
        <VolumeX className="h-4 w-4 text-primary animate-pulse" />
      ) : (
        <Volume2 className="h-4 w-4 text-primary" />
      )}
    </Button>
  );
}
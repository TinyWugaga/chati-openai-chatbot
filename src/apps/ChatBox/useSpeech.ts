import { useState, useEffect, useCallback, useRef } from "react";

import SpeechRecognition from "@/lib/SpeechRecognition";

export default function useSpeech() {
  const [currentSpeechText, setCurrentSpeechText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speechRecognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    speechRecognition.current = new SpeechRecognition();
    return () => {
      speechRecognition.current?.destroy();
    };
  }, []);

  const stopSpeech = useCallback(async (text = "") => {
    if (speechRecognition.current) {
      setCurrentSpeechText(text);
      setIsSpeaking(false);
    }
  }, []);

  const startSpeech = useCallback(async () => {
    if (speechRecognition.current) {
      setIsSpeaking(true);
      const speechText = await speechRecognition.current.start();
      stopSpeech(speechText);
    }
  }, [stopSpeech]);

  return {
    currentSpeechText,
    startSpeech,
    isSpeaking,
  };
}

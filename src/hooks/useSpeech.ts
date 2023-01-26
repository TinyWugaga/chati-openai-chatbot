import { useState, useEffect, useCallback, useRef } from "react";

import SpeechRecognition from "@/lib/SpeechRecognition";

export default function useSpeech() {
  const [currentSpeechText, setCurrentSpeechText] = useState("");
  const speechRecognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    speechRecognition.current = new SpeechRecognition();
    return () => {};
  }, []);

  const startSpeech = useCallback(async () => {
    if (speechRecognition.current) {
      const speechText = await speechRecognition.current.start();
      setCurrentSpeechText(speechText);
    }
  }, [speechRecognition]);

  return {
    currentSpeechText,
    startSpeech,
  };
}

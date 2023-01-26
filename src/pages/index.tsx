import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from "react";

import SpeechButton from "@/components/SpeechButton";
import useSpeech from "@/hooks/useSpeech";
import useAIConversation from "@/hooks/useAIConversation";
import styles from "./index.module.css";

export default function Home() {
  // const [conversation, setConversation] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [result, setResult] = useState();

  const { currentSpeechText, startSpeech } = useSpeech();
  const { requestConversation } = useAIConversation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContentInput(e.target.value);
  };

  const requestNewConversation = useCallback(async (content: string) => {
    const reply = await requestConversation(content);
    setResult(reply);
    setContentInput("");
  }, []);

  async function onSubmit(event: FormEvent | null = null) {
    event && event.preventDefault();
    if (contentInput.length === 0) return;
    requestNewConversation(contentInput);
  }

  useEffect(() => {
    if (contentInput !== currentSpeechText) {
      setContentInput(currentSpeechText);
      requestNewConversation(currentSpeechText);
    }
  }, [currentSpeechText, requestConversation]);

  return (
    <div>
      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Let's Chat</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="content"
            placeholder="Make Conversation"
            value={contentInput}
            onChange={handleInputChange}
          />
          <input type="submit" value="Chat!" />
        </form>
        <div className={styles.button_container}>
          <SpeechButton onClick={startSpeech} />
        </div>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

import { useState, useCallback } from "react";

export default function useAIConversation() {
  const [conversation, setConversation] = useState("");
  const [isProgressing, setIsProgressing] = useState(false);

  const requestConversation = useCallback(async (newContent: string) => {
    try {
      setIsProgressing(true);
      const content = `${conversation}
      user:${newContent}
      ai:`;
      const response = await fetch("/api/generateConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const reply = data.result;
      setConversation(`${content}${reply}\n`);

      setIsProgressing(false);
      return reply;
    } catch (error: any) {
      console.error(error);

      setIsProgressing(false);
      return "";
    }
  }, []);

  return {
    conversation,
    requestConversation,
    isProgressing,
  };
}

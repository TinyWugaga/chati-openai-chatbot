import { useState, useCallback } from "react";

export default function useAIConversation() {
  const [conversation, setConversation] = useState("");

  const requestConversation = useCallback(async (newContent: string) => {
    try {
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

      return reply;
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }, []);

  return {
    conversation,
    requestConversation,
  };
}

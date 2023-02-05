import { createContext } from "react";

import type { ChatBoxProviderState } from "@/types";
import { noop } from "@/utils/noop";

export default createContext<ChatBoxProviderState>({
  state: {
    inputValue: "",
    currentSpeechText: "",
    conversation: [],
    isSupportSpeech: false,

    isSpeaking: false,
    isProgressing: false,
  },
  actions: {
    startSpeech: noop,

    handleInputChange: noop,
    handleSubmit: noop,
  },
});

import { createContext } from "react";

import type { ChatBoxProviderState } from "@/types";
import { noop } from "@/utils/noop";

export default createContext<ChatBoxProviderState>({
  state: {
    inputValue: "",
    currentSpeechText: "",
    conversations: [],

    isSpeaking: false,
    isProgressing: false,
    isSupportSpeech: false,
    loadingTime: 0,
  },
  actions: {
    startSpeech: noop,

    handleInputChange: noop,
    handleSubmit: noop,
  },
});

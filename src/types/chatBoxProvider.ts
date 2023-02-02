export interface Conversation {
  time: Date;
  author: string;
  content: string;
}

export interface ChatBoxState {
  inputValue: string;
  currentSpeechText: string;
  conversation: Conversation[];

  isSpeaking: boolean;
  isProgressing: boolean;
}
export interface ChatBoxAction {
  startSpeech: () => void;
  handleInputChange: (value: string) => void;
  handleSubmit: (value: string) => void;
}
export interface ChatBoxProviderState {
  state: ChatBoxState;
  actions: ChatBoxAction;
}

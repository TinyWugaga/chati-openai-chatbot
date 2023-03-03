import { Conversation } from "./conversation";
export interface ChatBoxState {
  inputValue: string;
  currentSpeechText: string;
  conversations: Conversation[];

  isSpeaking: boolean;
  isProgressing: boolean;
  isSupportSpeech: boolean;

  loadingTime: number;
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

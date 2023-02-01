export interface ChatBoxState {
  inputValue: string;
  currentSpeechText: string;
  reply: string;

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

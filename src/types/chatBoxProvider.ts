export enum ConversationRequestStatus {
  PROGRESSING = "progressing",
  FINISHED = "finished",
  SUCCESS = "success",
  ERROR = "error",
}

export interface Conversation {
  id: string;
  time: Date;
  author: string;
  content: string;
  status: ConversationRequestStatus;
}

export interface ChatBoxState {
  inputValue: string;
  currentSpeechText: string;
  conversation: Conversation[];

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

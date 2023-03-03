import { ConversationGenerateAPIErrorResponse } from "@/types";

export default function handleConversationErrorMessage(
  status: ConversationGenerateAPIErrorResponse["status"] | undefined
) {
  let message = "";
  switch (status) {
    case 400:
      message = "Some words is sensitive in your content.";
      break;
    case 500:
      message = "Something get wrong, please try it again.";
      break;
    case 504:
      message = "Timeout.";
      break;
    default:
      message =
        "Sorry, I can not reply your message now, maybe you can try it again.";
      break;
  }
  return message;
}

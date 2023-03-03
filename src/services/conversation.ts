import {
  ConversationGenerateAPIRequestParams as RequestParams,
  ConversationGenerateAPIResultResponse as ResultResponse,
  ConversationGenerateAPIErrorResponse as ErrorResponse,
} from "@/types";

type generateConversationResponse = Partial<ResultResponse & ErrorResponse>;

export const generateConversation = (
  params: RequestParams
): Promise<generateConversationResponse> =>
  fetch("/api/conversation/generate", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...params }),
  })
    .then((response) => response.json())
    .then((data: ResultResponse) => data)
    .catch((error: ErrorResponse) => error);

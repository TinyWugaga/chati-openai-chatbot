import generateConversationAPI from "@/pages/api/conversation/generate";
import { MOCK_CONVERSATIONS } from "@/utils/api/testUtils/conversations";

jest.mock("@/lib/OpenAI");

const checkStatus = jest.fn((status, expectedStatus) => {
  expect(status).toEqual(expectedStatus);
});

const createMockRequestResponse = (body, handleResponse) => {
  return {
    req: { body },
    res: {
      status: (status) => {
        const handleResult = handleResponse(status);
        return {
          json: handleResult || ((result) => result),
        };
      },
    },
  };
};

describe("Test API conversation/generate", () => {
  test("Test response return 200", async () => {
    const { req, res } = createMockRequestResponse(
      {
        conversationId: `user_${new Date(2023, 1, 14, 0, 3, 0).valueOf()}`,
        conversations: MOCK_CONVERSATIONS,
        role: "user",
        content: "I hate lovers holiday.",
      },
      (status) => checkStatus(status, 200)
    );
    await generateConversationAPI(req, res);
  });

  test("Test response return 400", async () => {
    const { req, res } = createMockRequestResponse({}, (status) =>
      checkStatus(status, 400)
    );
    await generateConversationAPI(req, res);
  });

  test("Test response return 500", async () => {
    const { req, res } = createMockRequestResponse(
      {
        content: () => {
          throw new Error("test error");
        },
      },
      (status) => checkStatus(status, 500)
    );
    await generateConversationAPI(req, res);
  });
});

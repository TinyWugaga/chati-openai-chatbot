import generateConversationAPI from "@/pages/api/generateConversation";

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

describe.skip("Test generateConversation API", () => {
  test("Test response return 200", async () => {
    const { req, res } = createMockRequestResponse(
      {
        conversations: [
          {
            id: "user_1676892434372",
            time: new Date(),
            role: "user",
            content: "Test content.",
            status: "processing",
          },
        ],
      },
      (status) => checkStatus(status, 200)
    );
    await generateConversationAPI(req, res);
  });

  test("Test response return 400", async () => {
    const { req, res } = createMockRequestResponse(
      { conversations: [] },
      (status) => checkStatus(status, 400)
    );
    await generateConversationAPI(req, res);
  });

  test("Test response return 500", async () => {
    const { req, res } = createMockRequestResponse(
      {
        conversations: [
          () => {
            throw new Error("test error");
          },
        ],
      },
      (status) => checkStatus(status, 500)
    );
    await generateConversationAPI(req, res);
  });
});

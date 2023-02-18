const mockOpenAI = jest.fn(() => {
  return {
    createConversation: async (content: string) => {
      return "This is a test conversation result";
    },
  };
});

export default mockOpenAI;

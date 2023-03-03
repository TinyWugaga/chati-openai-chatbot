const mockOpenAI = jest.fn(() => {
  return {
    createConversation: async () => {
      return "This is a test conversation result";
    },
  };
});

export default mockOpenAI;

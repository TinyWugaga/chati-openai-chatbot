export const MOCK_CONVERSATIONS = [
  {
    id: `user_${new Date(2023, 1, 14, 0, 1, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 1, 0),
    role: "user",
    content: "Valentine Day is not happy.",
    status: "success",
  },
  {
    id: `ai_${new Date(2023, 1, 14, 0, 2, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 2, 0),
    role: "assistant",
    content: "Oh..., sorry to hear that:(",
    status: "success",
  },
];

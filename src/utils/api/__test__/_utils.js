export const TEST_SENSITIVE_WORDS = ["sex", "幹"][
  Math.floor(Math.random() * 2)
];

export const TEST_CONVERSATIONS = [
  {
    id: `system_${new Date(2023, 1, 14, 0, 0, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 0, 0),
    author: "system",
    content: "It's Valentine Day.",
    status: "error",
  },
  {
    id: `ai_${new Date(2023, 1, 14, 0, 0, 1).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 0, 1),
    author: "ai",
    content: "Happy Valentine Day!",
    status: "success",
  },
  {
    id: `user_${new Date(2023, 1, 14, 0, 1, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 1, 0),
    author: "user",
    content: "No, Valentine Day is not happy.",
    status: "finished",
  },
  {
    id: `ai_${new Date(2023, 1, 14, 0, 2, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 2, 0),
    author: "ai",
    content: "Oh..., sorry to hear that:(",
    status: "success",
  },
];

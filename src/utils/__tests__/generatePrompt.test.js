import { CHATTING_AI_PROMPT } from "../constant";
import generatePrompt from "../generatePrompt";

const TEST_CONVERSATIONS = [
  {
    id: `system_${new Date(2023, 1, 14, 0, 0, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 0, 0),
    role: "system",
    content: "It's Valentine Day.",
    status: "error",
  },
  {
    id: `ai_${new Date(2023, 1, 14, 0, 0, 1).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 0, 1),
    role: "ai",
    content: "Happy Valentine Day!",
    status: "success",
  },
  {
    id: `user_${new Date(2023, 1, 14, 0, 1, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 1, 0),
    role: "user",
    content: "No, Valentine Day is not happy.",
    status: "finished",
  },
  {
    id: `ai_${new Date(2023, 1, 14, 0, 2, 0).valueOf()}`,
    time: new Date(2023, 1, 14, 0, 2, 0),
    role: "ai",
    content: "Oh..., sorry to hear that:(",
    status: "success",
  },
];

describe("Generate content by conversations", () => {
  test("Test content is generated with default prompt.", () => {
    expect(generatePrompt(TEST_CONVERSATIONS)).toEqual(
      expect.stringContaining(CHATTING_AI_PROMPT)
    );
  });

  test("Test content is generated without system message.", () => {
    expect(generatePrompt(TEST_CONVERSATIONS)).toEqual(
      expect.not.stringContaining("system:")
    );
  });

  test("Test content is generated with all conversations.", () => {
    expect(generatePrompt(TEST_CONVERSATIONS).match(/ai:/g)).toHaveLength(3);
    expect(generatePrompt(TEST_CONVERSATIONS).match(/user:/g)).toHaveLength(1);
  });
});

import { CHATTING_AI_PROMPT } from "../constant";
import generateContent from "../generateContent";

import { TEST_CONVERSATIONS } from "./_utils";

describe("Generate content by conversations", () => {
  test("Test content is generated with default prompt.", () => {
    expect(generateContent(TEST_CONVERSATIONS)).toEqual(
      expect.stringContaining(CHATTING_AI_PROMPT)
    );
  });

  test("Test content is generated without system message.", () => {
    expect(generateContent(TEST_CONVERSATIONS)).toEqual(
      expect.not.stringContaining("system:")
    );
  });

  test("Test content is generated with all conversations.", () => {
    expect(generateContent(TEST_CONVERSATIONS).match(/ai:/g)).toHaveLength(3);
    expect(generateContent(TEST_CONVERSATIONS).match(/user:/g)).toHaveLength(1);
  });
});

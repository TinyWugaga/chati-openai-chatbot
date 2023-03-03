import validateContent from "../validateContent";

describe("Validate prompt content", () => {
  test("Normal content is valid", () => {
    expect(validateContent("Happy")).toBeTruthy();
  });

  test("Empty content is invalid", () => {
    expect(validateContent("")).toBeFalsy();
  });

  test("Sensitive words is invalid", () => {
    const TEST_SENSITIVE_WORDS = ["sex", "幹"][Math.floor(Math.random() * 2)];
    expect(validateContent(TEST_SENSITIVE_WORDS)).toBeFalsy();
  });
});

import validateContent from "../validateContent";
import { TEST_SENSITIVE_WORDS } from "./_utils";

describe("Validate prompt content", () => {
  test("Normal content is valid", () => {
    expect(validateContent("Happy")).toBeTruthy();
  });

  test("Empty content is invalid", () => {
    expect(validateContent("")).toBeFalsy();
  });

  test("Sensitive words is invalid", () => {
    expect(validateContent(TEST_SENSITIVE_WORDS)).toBeFalsy();
  });
});

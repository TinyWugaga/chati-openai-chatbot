export function generateErrorEventParams(error: any) {
  if (error) {
    const stack = error.stack?.split("\n")[1];
    return {
      errorName: error.name,
      errorMessage: error.message,
      ...(stack && { stack }),
    };
  }
  return {};
}

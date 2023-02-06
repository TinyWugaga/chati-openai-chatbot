export function generateErrorEventParams(error: any) {
  const stack = error.stack.split("\n")[1];
  return {
    errorName: error.name,
    message: error.message,
    ...(stack && { stack }),
  };
}

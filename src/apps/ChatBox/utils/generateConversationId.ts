export default function generateConversationId(prefix: string) {
  return `${prefix ? prefix + "_" : ""}${new Date().valueOf()}`;
}

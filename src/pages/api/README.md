# Chatting bot API Documentation

## `/generateConversation` [POST]

### Request Options

```js
const options = {
  method: "POST",
  url: "/generateConversation",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  body: {
    conversations: [{ ...conversationDetail }],
  },
};
```

**BODY PARAMS**

**conversations: \<Conversation\>[]**

This is an array of conversation objects, each including the following properties: `id`, `time`, `author`, `content`, and `status`. These properties record the details of user, AI, or system conversation.

params:

- id: string
  - conversation ID, which is a combination of the user ID (or **000** if the user ID does not exist), author, and timestamp.
- time: Date object
- role: `<user | ai | system>`
- content: string
- status: `<progressing | success | failed | error>`
  - user conversation status would be `progressing` when waiting for ai response
  - if ai response return 200, both status of user and ai would be `successed`
  - if ai response return any error ([doc](https://platform.openai.com/docs/guides/error-codes/api-errors): 401 | 429 | 500)，both status of user and ai would be `failed`
  - if any error occur in the process that disrupted the conversation, would add system log, and both status of user and system would be `error`

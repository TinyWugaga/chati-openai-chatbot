export interface NotionLogProperties {
  event: "console_log" | "console_error";
  type: "log" | "error";
  api: string;
  message: string;
  extra?: any;
}

export function generateNotionLogProperties(properties: NotionLogProperties) {
  const { event, type, api, message, extra = {} } = properties;
  return {
    event: {
      title: [
        {
          text: {
            content: event,
          },
        },
      ],
    },
    type: {
      select: {
        name: type,
      },
    },
    api: {
      rich_text: [
        {
          text: {
            content: api,
          },
        },
      ],
    },
    message: {
      rich_text: [
        {
          text: {
            content: message,
          },
        },
      ],
    },
    extra: {
      rich_text: [
        {
          text: {
            content: JSON.stringify(extra),
          },
        },
      ],
    },
  };
}

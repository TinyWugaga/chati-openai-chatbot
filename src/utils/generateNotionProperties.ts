export interface NotionLogProperties {
  logger: "console_log" | "console_error";
  type: "log" | "error";
  api: string;
  message: string;
  url: string;
  extra?: any;
}

export function generateNotionLogProperties(properties: NotionLogProperties) {
  const { logger, type, api, message, url, extra = {} } = properties;
  return {
    logger: {
      title: [
        {
          text: {
            content: logger,
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
    url: {
      url,
    },
  };
}

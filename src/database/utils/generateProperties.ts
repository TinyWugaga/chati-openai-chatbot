export interface NotionLogProperties {
  logger: string;
  type: "log" | "error";
  extra?: Record<string, string> | Record<string, string>[];
  url: string;
  version: string;
}

export function generateLogDBProperties(properties: NotionLogProperties) {
  const { logger, type, url, extra = {} } = properties;
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
    version: {
      rich_text: [
        {
          text: {
            content: process.env.APP_VERSION,
          },
        },
      ],
    },
  };
}

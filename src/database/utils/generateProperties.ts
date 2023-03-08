import { ConversationLog } from "@/types";

export interface NotionLogProperties {
  logger: string;
  type: "log" | "error";
  extra?: Record<string, string> | Record<string, string>[];
  url: string;
  version: string;
}
export interface NotionConversationProperties extends ConversationLog {
  url: string;
  version: string;
}

export function generateLogDBProperties(properties: NotionLogProperties) {
  const { logger, type, url, extra = {}, version } = properties;
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
            content: version,
          },
        },
      ],
    },
  };
}

export function generateConversationDBProperties(
  properties: Partial<NotionConversationProperties>
) {
  const { conversationId, userId, content, result, status, url, version } =
    properties;
  return {
    ...(conversationId
      ? {
          conversationId: {
            title: [
              {
                text: {
                  content: conversationId,
                },
              },
            ],
          },
        }
      : {}),
    ...(userId
      ? {
          userId: {
            rich_text: [
              {
                text: {
                  content: userId,
                },
              },
            ],
          },
        }
      : {}),
    ...(content
      ? {
          content: {
            rich_text: [
              {
                text: {
                  content,
                },
              },
            ],
          },
        }
      : {}),
    ...(result
      ? {
          result: {
            rich_text: [
              {
                text: {
                  content: result,
                },
              },
            ],
          },
        }
      : {}),
    ...(status
      ? {
          status: {
            select: {
              name: status,
            },
          },
        }
      : {}),
    ...(url
      ? {
          url: {
            url,
          },
        }
      : {}),
    ...(version
      ? {
          version: {
            rich_text: [
              {
                text: {
                  content: version,
                },
              },
            ],
          },
        }
      : {}),
  };
}

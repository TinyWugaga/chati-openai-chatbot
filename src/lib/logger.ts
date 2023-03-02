import { notionDB, NotionLogger, NotionErrorLogger } from "@/database";
import { generateErrorEventParams } from "@/utils/generateEventParams";

interface customParams {
  [key: string]: any;
}

export const consoleLog = (message: string, params: customParams = {}) =>
  console.log({
    message,
    ...params,
  });

export const consoleError = (error: any, params: customParams = {}) =>
  console.error({
    ...generateErrorEventParams(error),
    ...params,
  });

export default {
  log: (logger: string, message: string, extra = {}) => {
    if (!process.env.IS_PROD && !process.env.IS_PREVIEW) {
      consoleLog(message, {
        logger,
        ...extra,
      });
    } else {
      const log = NotionLogger(logger, { message, ...extra });
      notionDB.addLog(log);
    }
  },
  error: (logger: string, error: any, extra = {}) => {
    if (!process.env.IS_PROD && !process.env.IS_PREVIEW) {
      consoleError(error, {
        logger,
        ...extra,
      });
    } else {
      const errorLog = NotionErrorLogger(logger, error);
      notionDB.addLog(errorLog);
    }
  },
};

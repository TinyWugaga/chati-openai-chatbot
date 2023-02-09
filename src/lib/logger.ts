import { noop } from "@/utils/noop";
import { generateErrorEventParams } from "@/utils/generateEventParams";

interface customParams {
  [key: string]: any;
}

export const consoleLog = (message: any, params: customParams = {}) =>
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
  log: !process.env.IS_PROD ? consoleLog : noop,
  error: !process.env.IS_PROD ? consoleError : noop,
};

import logger from "./logger";
import { generateErrorEventParams } from "@/utils/generateEventParams";

export interface ActionEventParams {
  event: string;
  category: "action";
  label: string;
  element?: string;
}

export interface CustomEventParams {
  [key: string]: any;
}

export interface GoogleTagEventParams {
  category?: string;
  label?: string;
  [key: string]: any;
}

export const sendLogEvent = (message: any, params: CustomEventParams = {}) => {
  const { event = "console_log", ...data } = params;
  sendEvent(event, {
    category: "logger",
    label: "log",
    message,
    ...data,
  });
};

export const sendErrorEvent = (error: any, params: CustomEventParams = {}) => {
  const { event = "console_error", ...data } = params;
  sendEvent(event, {
    category: "logger",
    label: "error",
    ...generateErrorEventParams(error),
    ...data,
  });
};

export function sendEvent(name: string, params: GoogleTagEventParams) {
  const gtag = typeof window !== "undefined" && window.gtag;
  const { category, label, ...data } = params;

  if (process.env.IS_PROD && gtag) {
    gtag("event", name, {
      ...(category && { event_category: category }),
      ...(label && { event_label: label }),
      ...data,
    });
  } else {
    if (label === "error") {
      logger.error(null, {
        event: name,
        ...params,
      });
    } else {
      logger.log(null, {
        event: name,
        ...params,
      });
    }
  }
}

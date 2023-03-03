import logger from "./logger";
import { generateErrorEventParams } from "@/utils/generateEventParams";

interface EventParams {
  name: string;
  category: string;
  version: string;
}

interface ActionEventParams {
  category: "action";
  label?: string;
  element?: string;
}

interface ErrorEventParams {
  category: "error";
  label?: string;
  errorName: string;
  errorMessage: string;
  errorStack: string;
}

type GoogleTagEventParams = EventParams &
  (ActionEventParams | ErrorEventParams);

export function trackAction(
  actionName: string,
  params: Omit<ActionEventParams, "category">
) {
  sendEvent(actionName, {
    category: "action",
    ...params,
  });
}

export function trackError(error: any, params: { label?: string }) {
  sendEvent("track_error", {
    category: "error",
    ...generateErrorEventParams(error),
    ...params,
  });
}

export function sendEvent(
  eventName: string,
  params: ActionEventParams | ErrorEventParams
) {
  const gtag = typeof window !== "undefined" && window.gtag;
  const { category, label, ...value } = params;

  const gtagParams = {
    category,
    label,
    version: process.env.APP_VERSION,
    ...value,
  } as GoogleTagEventParams;

  if ((process.env.IS_PROD || process.env.ON_TRACK) && gtag) {
    gtag("event", eventName, gtagParams);
  } else {
    if (category === "error") {
      logger.error(eventName, gtagParams);
    } else {
      logger.log("GA Tracker", eventName, gtagParams);
    }
  }
}

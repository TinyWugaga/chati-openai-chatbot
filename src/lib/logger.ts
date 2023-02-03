import { noop } from "@/utils/noop";

// TODO: record to ga when IS_PROD
export default {
  log: !process.env.IS_PROD ? console.log : noop,
  error: !process.env.IS_PROD ? console.error : noop,
};

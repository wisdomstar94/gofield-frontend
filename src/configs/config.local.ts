import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const mode = 'local';
const apiVersion = 'v1';

const configLocal = getConfigs({
  baseUrl,
  mode,
  apiVersion,
});

export default configLocal;

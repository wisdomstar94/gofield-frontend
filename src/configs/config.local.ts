import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const mode = 'local';

const configLocal = getConfigs({
  baseUrl,
  mode,
});

export default configLocal;

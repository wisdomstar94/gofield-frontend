import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const mode = 'development';
const apiVersion = 'v1';

const configDevelopment = getConfigs({
  baseUrl,
  mode,
  apiVersion,
});

export default configDevelopment;

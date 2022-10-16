import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const mode = 'production';
const apiVersion = 'v1';

const configProduction = getConfigs({
  baseUrl,
  mode,
  apiVersion,
});

export default configProduction;

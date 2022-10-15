import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const mode = 'production';

const configProduction = getConfigs({
  baseUrl,
  mode,
});

export default configProduction;

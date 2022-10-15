import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const mode = 'development';

const configDevelopment = getConfigs({
  baseUrl,
  mode,
});

export default configDevelopment;

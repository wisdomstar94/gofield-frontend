import getConfigs from "./config.common";

const baseUrl = 'development_base_url';
const mode = 'development';

const configDevelopment = getConfigs({
  baseUrl,
  mode,
});

export default configDevelopment;

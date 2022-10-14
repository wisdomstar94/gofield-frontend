import getConfigs from "./config.common";

const baseUrl = 'production_base_url';
const mode = 'production';

const configProduction = getConfigs({
  baseUrl,
  mode,
});

export default configProduction;

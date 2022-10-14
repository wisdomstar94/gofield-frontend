import getConfigs from "./config.common";

const baseUrl = 'local_base_url';
const mode = 'local';

const configLocal = getConfigs({
  baseUrl,
  mode,
});

export default configLocal;

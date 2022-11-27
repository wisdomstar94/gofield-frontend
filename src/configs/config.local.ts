import getConfigs from "./config.common";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
const signNotInUserJwt = process.env.NEXT_PUBLIC_SIGN_NOT_IN_USER_JWT ?? '';
const mode = 'local';
const apiVersion = 'v1';

const configLocal = getConfigs({
  baseUrl,
  signNotInUserJwt,
  mode,
  apiVersion,
});

export default configLocal;

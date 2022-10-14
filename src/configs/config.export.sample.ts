import configDevelopment from "./config.development";
import configLocal from "./config.local";
import configProduction from "./config.production";

const Config = () => {
  switch(process.env.NEXT_PUBLIC_RUN_MODE) {
    case 'local': return configLocal;
    case 'development': return configDevelopment;
    case 'production': return configProduction;
    default: return configLocal;
  }
};

export default Config;

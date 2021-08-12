interface EnvProps {
  baseUrl: string;
}
interface DefaultConfigProps {
  beta?: EnvProps;
  release?: EnvProps;
  [key: string]: any;
}

const defaultConfig: DefaultConfigProps = {
  development: {
    baseUrl: '/dev/',
  },
  beta: {
    baseUrl: '/beta/',
  },
  release: {
    baseUrl: '/prod/',
  },
};
export default defaultConfig;

interface EnvProps {
  baseUrl: string;
}
interface DefaultConfigProps {
  beta?: EnvProps;
  release?: EnvProps;
  [key: string]: any;
}

const defaultConfig: DefaultConfigProps = {
  dev: {
    baseUrl: '/',
  },
  beta: {
    baseUrl: '/dev/',
  },
  release: {
    baseUrl: '/prod/',
  },
};
export default defaultConfig;

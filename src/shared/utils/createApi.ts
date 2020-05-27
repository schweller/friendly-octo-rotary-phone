import { getToken } from './accessToken';

interface ApiConfig {
  headers?: {}
}

function createApi(apiPath: string) {
  // Ideally this would be defined on a env variable
  const basePath = 'https://stagingapi.riskmethods.net/v2'
  
  async function baseApi<P>(
    path: string, 
    config: ApiConfig = {}
  ): Promise<Error | P> {
    const accessToken = getToken();

    let resp: Response;
    try {
      resp = await fetch(`${basePath}/${path}`, {
        ...config,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...(accessToken != null
            ? { authorization: `Bearer ${accessToken}` }
            : null),
          ...config.headers,
        },
      });
    } catch (_err) {
      const error = _err as Error;
      if (process.env.NODE_ENV === 'test') {
        throw error;
      }
      return error
    }

    return resp.json()
  }

  return {
    async get<P>(path: string, config?: ApiConfig) {
      return baseApi<P>(path, config);
    }
  };  
}

export default createApi
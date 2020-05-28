import axios, { AxiosResponse, AxiosError } from 'axios';
import { getStoredAccessToken } from 'shared/utils/accessToken';

const defaults = {
  baseURL: `https://stagingapi.riskmethods.net/v2`,
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAccessToken() ? `Bearer ${getStoredAccessToken()}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

async function api(
  url: string, 
  variables?: any
): Promise<AxiosResponse<{data: any}>> {
  return axios({
    url: `${defaults.baseURL}${url}`,
    method: 'GET',
    headers: defaults.headers(),
    params: variables
  })
}

export default {
  get: (...args: [string, any?]) => api(...args),
};

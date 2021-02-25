import request from 'umi-request';

export async function queryBasicProfile(params) {
  return request('/workflow/api/getProcessById', {
    params,
  });
}

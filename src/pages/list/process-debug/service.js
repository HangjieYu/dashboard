import request from 'umi-request';
export async function queryRule(params) {
  return request('/workflow/api/getProcessDebugList', {
    params,
  });
}
export async function removeRule(params) {
  return request('/workflow/api/evictProcessDebug', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/workflow/api/putProcessDebug', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/workflow/api/putProcessDebug', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

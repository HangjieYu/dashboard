import request from 'umi-request';
export async function queryRule(params) {
  return request('/workflow/api/getRule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/workflow/api/deleteRule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/workflow/api/addRule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/workflow/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

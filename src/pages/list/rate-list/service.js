import request from 'umi-request';

export async function queryRule(params) {
  return request('/workflow/api/getRateLimitList', {
    params,
  });
}

export async function removeRule(params) {
  return request('/workflow/api/evictRateLimiter', {
    method: 'POST',
    data: {...params, method: 'delete'},
  });
}

export async function addRule(params) {
  return request('/workflow/api/putRateLimiter', {
    method: 'POST',
    data: {...params, method: 'post'},
  });
}

export async function updateRule(params) {
  return request('/workflow/api/putRateLimiter', {
    method: 'POST',
    data: {...params, method: 'update'},
  });
}

export async function removeUseCount(params) {
  return request('/workflow/api/removeUseCount', {
    method: 'POST',
    data: {...params, method: 'update'},
  });
}

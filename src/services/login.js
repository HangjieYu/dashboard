import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/workflow/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/workflow/api/login/captcha?mobile=${mobile}`);
}

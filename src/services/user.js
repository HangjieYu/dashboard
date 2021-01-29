import request from '@/utils/request';
export async function query() {
  return request('/workflow/api/users');
}
export async function queryCurrent() {
  return request('/workflow/api/currentUser');
}
export async function queryNotices() {
  return request('/workflow/api/notices');
}

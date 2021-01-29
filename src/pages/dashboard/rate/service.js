import request from 'umi-request';
export async function fakeChartData() {
  return request('/workflow/api/fake_chart_data');
}

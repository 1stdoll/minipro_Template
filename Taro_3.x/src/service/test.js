import Request from '../utils/request';

export async function getCount(data) {
  return Request({
    url: '/act/app/activity/list',
    method: 'get',
    data,
  });
}

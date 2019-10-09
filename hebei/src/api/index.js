import { fetch } from './base';
export default {
  sendCode(req) {
    return fetch('post', '/api/dq/hb/sendCode', req, { 'Content-Type': 'multipart/form-data' });
  },
  saveOrders(req) {
    // return new Promise((resolve) => {
    //   resolve({code: 201, msg: '异常'});
    // });
    return fetch('post', '/api/dq/hb/saveOrders', req, { 'Content-Type': 'multipart/form-data' });
  },
};
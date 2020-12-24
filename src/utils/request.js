/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
 headers: {
   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOGZjZmUzNjE4ZGE5YmY4NzhmYWI3MDA3ZGUxM2JmN2NhODY0YmRiMmYzMTc0MWMwYjlhMzAxZWNhNzE4MWEyYWJjZGZmMTg5MmJiNDBhMDMiLCJpYXQiOjE2MDg1MTU1MjYsIm5iZiI6MTYwODUxNTUyNiwiZXhwIjoxNjQwMDUxNTI2LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.ArQIR_zQ8A1nqKKnFSq4zOXwRD9LyDG2nmahbzukKIJXCT0z5UKX4AkLLOtykGFYWBdZEDvwmIWaYeXdBOyz7Wmj-2uy0CtkfjIt_2QDelg1gFcNs63Id7X95EGJyHh7xUU_Y_b4hCnrtcORNnG3unYERn-s4A3v_Ptl2xwg1vRfNXTampR2dADZhodI1PBfDRHa8-GbSNHKvTuAZ0p22ljdbONme2GwhK6KBIEIXiPbRikW7LjKv8kzAP4LJZeFXteUihc4oe5FsxNUYLiu4Whbr-qbPEXBiiWgaGC4YEuTl_e8NNf5aJuUu8ngEWLcKcI6uguNi5Q9xofW1Us0uZXqWOuFOzUJ5A7Of7ulrCsTAAPekQSnYdtGQyGXCb82OkrsWFgXT6j5Xb6-fFkeuY4y0HK1HL17PKBBsO-MEfmDpb3mvOHlmOh9qlktkR4oZm9aFzQbiBRn12zkiCUMz541SNPkko1wMu4iFeA2gKOt0W_uC8_uoi663Uu-0HIb6Hthzy6B72e0zOLPZQbBnQS_Eew3SxgmC9w5UwxffzDLQHCNhUnIsPifKfLAn4JNBo9vXRbzJppg_QZnonpxR05nu37RfCE_TwaiRExWTe1sjKu_kpuNCKlQRkyG571whw0D8ounT5_kPuXWZDW3qcn4ue7WtSCgSOEdAhL801Y'
 }
});
export default request;

/*
 * @FilePath: \ccit-admin-to-web\src\views\test\curd\utils.js
 * @Author: maggot-code
 * @Date: 2022-09-08 10:14:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-08 10:46:23
 * @Description:
 */
const requestQueue = new WeakMap();

function removeRequest(key) {
  if (!requestQueue.has(key)) return;

  clearTimeout(requestQueue.get(key));
  requestQueue.delete(key);
}

export function mockRequest(url, response) {
  const key = { url };
  removeRequest(key);

  // 随机 2-5 秒
  const delayed = Math.floor(Math.random() * 3000 + 2000);

  return new Promise((resolve) => {
    requestQueue.set(
      key,
      setTimeout(() => {
        resolve(response);
        removeRequest(key);
      }, delayed)
    );
  });
}

export default requestQueue;

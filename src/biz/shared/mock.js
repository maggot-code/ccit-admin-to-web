/*
 * @FilePath: \ccit-web-kit\src\biz\shared\mock.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:34:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 14:27:33
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

  // 随机 0.5-2 秒
  const delayed = Math.floor(Math.random() * 1500) + 500;
  // 随机true或false
  // const success = Math.random() > 0.5;

  return new Promise((resolve, reject) => {
    // const func = success ? resolve : reject;
    requestQueue.set(
      key,
      setTimeout(() => {
        resolve(response);
        // func(response);
        removeRequest(key);
      }, delayed)
    );
  });
}

export default requestQueue;

/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\entity\Store.js
 * @Author: maggot-code
 * @Date: 2022-09-15 16:25:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 16:26:42
 * @Description:
 */
export const DialogStore = new Map();

export function getStore(key) {
  if (!DialogStore.has(key)) return null;

  return Object.assign({}, DialogStore.get(key), { key });
}

export default DialogStore;

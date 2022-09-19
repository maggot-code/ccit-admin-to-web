/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\entity\Job.js
 * @Author: maggot-code
 * @Date: 2022-09-19 17:42:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 17:45:54
 * @Description:
 */
import { shallowRef } from "@vue/composition-api";

export function Job() {
  const data = shallowRef({});

  return {
    data,
  };
}

export default Job;

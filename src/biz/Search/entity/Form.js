/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\entity\Form.js
 * @Author: maggot-code
 * @Date: 2022-09-19 17:42:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 18:12:46
 * @Description:
 */
import { onMounted, unref, ref } from "@vue/composition-api";

function Props() {
  const token = ref("");
  const proName = ref("");

  return {
    token,
    proName,
  };
}

export function Form() {
  const refs = ref();
  const props = Props();

  onMounted(() => {
    console.log(unref(refs));
  });

  return {
    refs,
    props,
  };
}

export default Form;

/*
 * @FilePath: \ccit-admin-to-web\src\biz\Form\entity\Form.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:25:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 14:40:54
 * @Description:
 */
import { ref } from "@vue/composition-api";
import SchemaFactory from "@/biz/shared/schema";

function Data() {
  const data = SchemaFactory({});

  return data;
}

function Token() {
  const token = ref("");
  return token;
}

function Other() {
  const token = Token();
  const proName = ref("");

  return {
    token,
    proName,
  };
}

export function Form() {
  const isReady = ref(false);
  const refs = ref();
  const other = Other();
  const data = Data();

  function toReady() {
    isReady.value = true;
  }
  function toNotReady() {
    isReady.value = false;
  }

  return {
    isReady,
    refs,
    other,
    data,
    toReady,
    toNotReady,
  };
}

export default Form;

/*
 * @FilePath: \ccit-web-kit\src\biz\Form\usecase\defineForm.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:23:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 14:20:37
 * @Description:
 */
import { onBeforeUnmount, unref } from "@vue/composition-api";

import Form from "../entity/Form";
import Job from "../entity/Job";
import Schema from "../entity/Schema";

export function defineForm() {
  const form = Form();
  const job = Job();
  const schema = Schema();
  
  async function setupFormData(usecheck = false) {
    const { validate, data } = unref(form.refs).formOutput();
    form.data.setup(data);
    
    if (!usecheck) return [true, data];

    const check = await validate().catch(() => {
      return Promise.resolve(false);
    });
    return [check, data];
  }
  async function resetFormData() {
    unref(form.refs).resetForm();
    return setupFormData();
  }

  onBeforeUnmount(form.toNotReady);

  const template = {
    ...form.other,
    formReady: form.isReady,
    formRefs: form.refs,
    formJob: job.data,
    formSchema: schema.formSchema,
    cellSchema: schema.cellSchema,
  };
  return {
    template,
    form,
    job,
    schema,
    setupFormData,
    resetFormData,
  };
}

export default defineForm;

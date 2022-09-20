/*
 * @FilePath: \ccit-admin-to-web\src\biz\Form\usecase\defineForm.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:23:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 10:57:44
 * @Description:
 */
import { onBeforeUnmount } from "@vue/composition-api";

import Form from "../entity/Form";
import Job from "../entity/Job";
import Schema from "../entity/Schema";

export function defineForm() {
  const form = Form();
  const job = Job();
  const schema = Schema();

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
  };
}

export default defineForm;

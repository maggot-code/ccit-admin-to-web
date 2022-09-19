/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\usecase\defineSearch.js
 * @Author: maggot-code
 * @Date: 2022-09-19 17:58:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 18:20:09
 * @Description:
 */
import {} from "@vue/composition-api";

import Form from "../entity/Form";
import Job from "../entity/Job";
import Schema from "../entity/Schema";

export function defineSearch(options) {
  const { tmpParams } = options;
  console.log(tmpParams);

  const form = Form();
  const job = Job();
  const schema = Schema();

  function handlerQuery() {
    console.log("to search query");
  }
  function handlerReset() {
    console.log("to search reset");
  }

  const output = {
    ...form.props,
    searchRefs: form.refs,
    searchJob: job.data,
    formSchema: schema.formSchema,
    cellSchema: schema.cellSchema,
    handlerQuery,
    handlerReset,
  };
  return {
    output,
    form,
    job,
    schema,
    handlerQuery,
    handlerReset,
  };
}

export default defineSearch;

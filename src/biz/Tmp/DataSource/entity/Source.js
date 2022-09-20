/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\entity\Source.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:09:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 14:24:23
 * @Description:
 */
import { unref, computed, ref } from "@vue/composition-api";
import SchemaFactory from "@/biz/shared/schema";

function DataSchema() {
  const schema = SchemaFactory([]);

  return schema;
}

function ChoiceSchema() {
  const schema = SchemaFactory([]);

  return schema;
}

export function Source() {
  const choice = ChoiceSchema();
  const data = DataSchema();
  const total = ref(0);
  const choiceSchema = computed(() => unref(choice.data));
  const dataSchema = computed(() => unref(data.data));

  function setup(response) {
    choice.setup(response?.choiceSchema);
    data.setup(response?.dataSchema);
    total.value = response?.total;
  }

  return {
    choice,
    data,
    total,
    choiceSchema,
    dataSchema,
    setup,
  };
}

export default Source;

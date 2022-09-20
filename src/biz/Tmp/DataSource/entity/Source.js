/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\entity\Source.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:09:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 14:30:08
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
  const dataSchema = computed(() => unref(data.data));
  const choiceSchema = computed(() => unref(choice.data));

  function setup(response) {
    const rawData = response?.data ?? [];
    const rawChoice = [];
    data.setup(rawData);
    choice.setup(rawChoice);
    total.value = response?.total ?? 0;
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

/*
 * @FilePath: \ccit-admin-to-web\src\bff\result\apply.js
 * @Author: maggot-code
 * @Date: 2022-09-05 11:30:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-05 13:07:17
 * @Description: 
 */
import { getConfigData } from "@/api/onlineDev/visualDev";

const modelId = "1566623528395083776";
export function useResultApply() {
    getConfigData(modelId).then((res) => {
        console.log(res);
    });

    return {}
}

export default useResultApply;

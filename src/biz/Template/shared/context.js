/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\shared\context.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:52:45
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 13:25:23
 * @Description:
 */
// 模板参数注入关键字
export const TmpParamsSymbolKey = Symbol("TmpParams");
// 模板弹框注入关键字
export const TmpDialogSymbolKey = Symbol("TmpDialog");

// 搜索配置服务注入关键字
export const SearchConfigSymbolKey = Symbol("SearchConfig");
// 列表配置服务注入关键字
export const ListConfigSymbolKey = Symbol("ListConfig");
// 数据配置服务注入关键字
export const DataConfigSymbolKey = Symbol("DataConfig");
// 数据源服务注入关键字
export const DataSourceSymbolKey = Symbol("DataSource");

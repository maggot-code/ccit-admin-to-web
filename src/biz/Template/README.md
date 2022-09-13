# Biz Template

## Service
> 主要思路是参考 VueUse 中的 UseFetch 的实现
> 因为这套项目中绝大部分功能都不是自己实现的，所以很多情况下还是考虑在不进行任何改动并且最大限度的使用已经存在的功能的情况下进行开发
> 这就需要对项目中的axios进行一些兼容，在使用axios的同时，上层提供类似hooks的能力进行一些整合

```ts
export interface UseServiceReturn {
    // 请求是否完成
    isFinished: Ref<boolean>;

    // 请求是否继续中
    isPending: Ref<boolean>;

    // 响应异常
    error: Ref<any>;

    // 响应结果
    result: Ref<any>;

    // 请求调用方法
    execute: () => Promise<any>;
}
```

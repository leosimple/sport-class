/**
 * @description 基于Promise全局封装wx.request请求，全局请求添加全局loading状态
 * @method axios
 * @param params
 */
const baseURL = "http://192.168.1.6:2828";
// const baseURL = '';

// 请求的计数器 -- 不加计数器的话会显示三次/隐藏三次 loading, 加了计数器之后,只当所有请求完成之后只需要隐藏一次loading

let requestCount = 0;

const showLoading = () => {
    wx.showToast({
        title:'加载中', //设置标题
        // duration:2000, //设置显示时间
        mask:true,//是否打开遮罩,默认不打开
        icon:'loading'	//图标样式，none为无图标
    });
}
const cancelLoading = () => {
    wx.hideToast();
}

// 1.axios 是个函数,
const axios = (params) => {
    // 累计请求计数器
    requestCount++;
    showLoading();
    // 2. 函数内部返回Promise 对象
    return new Promise((resolve, reject) => {
        // 3.wx.request()  小程序发送请求
        wx.request({
            // 把调用axios时传过来的所有参数解构赋值
            ...params,
            // 将基地址和请求的地址拼接起来
            url: baseURL + params.url,
            // 请求成功之后调用的函数
            success: (result) => {
                // resolve(result)
                // 这里优化一下 -- 如果不需要显示其他返回的数据,而且这个项目后台所有返回的数据都是data.message的格式,
                // 我们就可以在封装axios的时候把返回的数据解构出来,这样的话,在请求的时候就会直接返回数据给我们了,就没有这么层数据的嵌套了
                if (result.data.message) {
                    resolve(result.data.message)
                } else {
                    resolve(result)
                }
            },
            // 请求失败之后调用的函数
            fail: (error) => {
                reject(error)
            },
            complete: () => {
                // 每次请求完成,就是所有的请求都完成了
                requestCount--;
                if (requestCount === 0) {
                    cancelLoading();
                }
            }
        });
    });

}

// 导出 axios 函数
export default axios;
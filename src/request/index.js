import * as axios from "axios";


//创建axios实例
var instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// 添加请求拦截器(可以检查是否登录)
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


requestUtil = (resArgs) => {
    const method = resArgs.method;
    const url = resArgs.url;
    const data = resArgs.data;
    var promise = new Promise();
    const configRequestBody = {
        method: method,
        url: url,
        data: method === "post" ? data : null,
        params: method === "get" ? data : null,
    };
    axios(configRequestBody)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { requestUtil };


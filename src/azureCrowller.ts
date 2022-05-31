
class AzureCrowller {
    analysis():Promise<Object> {
        return new Promise((resolve,reject) => {
            var XMLHttpRequest = require('xhr2');
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', 'https://github.com/Azure/azure-functions-core-tools/releases/latest', true);
            httpRequest.onreadystatechange = function () {
                //readyState的不同值，代表了不同的状态：
                //0：尚未初始化
                //1：正在加载
                //2：加载完毕
                //3：正在处理
                //4：处理完毕
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    var url = httpRequest.responseURL;
                    var res = url.substring(url.lastIndexOf('/') + 1);
                    resolve({
                        name: 'azure-functions-core-tools',
                        version: res
                    })
                }
            }
            httpRequest.send();
        })
    }

    constructor() {
    }
}

export {AzureCrowller}

import axios from "axios";
export class AzureCrowler {
    analysis(): Promise<Object> {
        return new Promise((resolve, reject) => {
            axios.get('https://github.com/Azure/azure-functions-core-tools/releases/latest')
            .then(function (response) {
                if(response.status == 200){
                    let path = response.request.path;
                    var res = path.substring(path.lastIndexOf('/') + 1);
                    resolve({
                        name: 'azure-functions-core-tools',
                        version: res
                    })
                }else{
                    reject('axios error : '+ response.statusText)
                }
            })
            .catch(function (error) {
                reject('axios error : '+ error)
            });
        })
    }
}

import superaggent from 'superagent'
export class SpfxCrowler {
    analysis(): Promise<Object[]> {
        return new Promise(async (resolve, reject) => {
            const result = await superaggent.get('https://raw.githubusercontent.com/SharePoint/sp-dev-docs/main/docs/spfx/compatibility.md');
            var text = result.text;
            text = text.substring(text.lastIndexOf('|              SPFx               |         Node.js          |') + 1)
            text = text.substring(text.indexOf('\n') + 1)
            text = text.substring(text.indexOf('\n|') + 1)
            text = text.substring(text.indexOf('|') + 1)
            text = text.substring(0, text.indexOf('|\n'))
            //  [1.14](release-1.14.md)       | LTS v12, LTS v14         | v5, v6                                    | v3.9           | v16.13.1    
            var versionList = text.split('|')
            if (versionList.length == 5) {
                var resList = [];
                const nameList = ['SPFx', 'SPFx for Node.js', 'SPFx for NPM', 'SPFx for TypeScript', 'SPFx for React'];
                versionList.forEach((v, i) => {
                    resList.push({
                        name: nameList[i],
                        version: v.trim()
                    })
                })
                resolve(resList)
            } else {
                reject('analysis err')
            }
        })
    }

    constructor() { }
}
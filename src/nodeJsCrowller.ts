import superaggent from 'superagent'
class NodeJsCrowller {
    private url = `https://nodejs.org/download/release/index.json`;
    private jsonObj = null;

    getJsonInfo(html: string) {
        let jsonObj = JSON.parse(html);
        return jsonObj;
    }

    async analysis2() {
        await this.initSpiderProcess();
        let res = this.jsonObj[0];
        let latestDate = new Date(res.date);
        let latestVersion = res.version;
        for (let i = 0; i < this.jsonObj.length; i++) {
            let tmpDate = new Date(this.jsonObj[i].date);
            if (tmpDate > latestDate) {
                latestDate = tmpDate;
                latestVersion = this.jsonObj[i].version;
            }
        }
        return latestVersion;
    }

    analysis(): Promise<Object> {
        return new Promise((resolve, reject) => {
            const { exec } = require('node:child_process');
            exec('nvm list available', (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return;
                }
                /**
                 * 
                 * /n
                |   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
                |--------------|--------------|--------------|--------------|
                |    18.2.0    |   16.15.0    |   0.12.18    |   0.11.16    |
                |    18.1.0    |   16.14.2    |   0.12.17    |   0.11.15    |
                |    18.0.0    |   16.14.1    |   0.12.16    |   0.11.14    |
                |    17.9.0    |   16.14.0    |   0.12.15    |   0.11.13    |
                |    17.8.0    |   16.13.2    |   0.12.14    |   0.11.12    |
                |    17.7.2    |   16.13.1    |   0.12.13    |   0.11.11    |
                |    17.7.1    |   16.13.0    |   0.12.12    |   0.11.10    |
                 */
                stdout = stdout.substring(stdout.indexOf('\n') + 1)
                stdout = stdout.substring(stdout.indexOf('\n') + 1)
                stdout = stdout.substring(stdout.indexOf('\n') + 1)
                stdout = stdout.substring(stdout.indexOf('|') + 1)
                stdout = stdout.substring(0, stdout.indexOf('|')).trim()
                if (stderr.length > 0) {
                    reject(stderr)
                } else {
                    resolve(
                        {
                            name: 'Node.js',
                            version: stdout
                        }
                    )
                }
            })
        })
    }

    async getRawHtml() {
        const result = await superaggent.get(this.url);
        return result.text;
    }

    async initSpiderProcess() {
        const html = await this.getRawHtml();
        this.jsonObj = await this.getJsonInfo(html);
    }
}
new NodeJsCrowller();
export { NodeJsCrowller }

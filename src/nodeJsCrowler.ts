export class NodeJsCrowler {
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
}

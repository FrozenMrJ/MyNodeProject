import { NodeJsCrowler } from './nodeJsCrowler'
import { AzureCrowler } from './azureCrowler'
import { SpfxCrowler } from './spfxCrowler';

async function main() {
    // NodeJs解析
    const njc = new NodeJsCrowler();
    const njcRes = await njc.analysis();
    console.log('njcRes', njcRes);

    // azure-functions-core-tools解析
    const ac = new AzureCrowler();
    const acRes = await ac.analysis();
    console.log('acRes', acRes);

    // SPFx解析
    const sc = new SpfxCrowler();
    const scRes = await sc.analysis();
    console.log('scRes', scRes);

    var resArray = [];
    resArray.push(njcRes)
    resArray.push(acRes)
    scRes.forEach((v, i) => {
        resArray.push(v)
    })
    console.log('resArray', resArray);
}
main();
import {NodeJsCrowller} from './nodeJsCrowller'
import {AzureCrowller} from './azureCrowller'
import { SpfxCrowller } from './spfxCrowller';

async function main() {  
    // NodeJs解析
    const njc = new NodeJsCrowller();
    const njcRes = await njc.analysis();
    console.log('njcRes', njcRes);

    // azure-functions-core-tools解析
    const ac = new AzureCrowller();
    const acRes = await ac.analysis();
    console.log('acRes', acRes);

    // SPFx解析
    const sc = new SpfxCrowller();
    const scRes = await sc.analysis();
    console.log('scRes', scRes);

    var resArray = [];
    resArray.push(njcRes)
    resArray.push(acRes)
    scRes.forEach((v,i)=>{
        resArray.push(v)
    })
    console.log('resArray', resArray);
}
main();
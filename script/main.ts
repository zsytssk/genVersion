import * as path from 'path';
import { intConfig } from './const';
import { genVersion } from './genVersion';

const type = process.argv.slice(2)[0] || 'genVersion';
const config_path = path.resolve(path.dirname(process.argv[1]), './config.json');

async function main() {
    console.time('costTime');
    await intConfig(config_path);
    const actions = {
        genVersion,
    };
    if (actions[type]) {
        await actions[type]();
    }
    console.timeEnd('costTime');
}
main();

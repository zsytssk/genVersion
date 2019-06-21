import md5File from 'md5-file';
import * as path from 'path';
import { bin, project_folder, version_pos } from './const';
import { normalize } from './ls/pathUtil';
import { write } from './ls/write';
import { findBinFiles } from './utils/listBinFiles';
import { stringify } from './utils/util';

export async function genVersion() {
    const result = {} as { [key: string]: string };
    const files = await findBinFiles();

    for (const item of files) {
        const md5 = await getFileMd5(item);
        const key = normalize(path.relative(bin, item));
        result[key] = md5;
    }
    const file_path = path.resolve(project_folder, version_pos, 'version.json');
    write(file_path, stringify(result));
}

async function getFileMd5(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
        file = path.resolve(project_folder, file);
        md5File(file, (err, hash) => {
            if (err) {
                return reject(err);
            }
            hash = hash.substr(0, 8);
            resolve(hash);
        });
    });
}

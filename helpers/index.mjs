import axios from 'axios';
import { createWriteStream } from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);

/**
 * 
 * @param {string} fileUrl 
 * @param {string} outputLocationPath 
 * @returns {Promise<any>}
 */
export async function downloadFile(fileUrl, outputLocationPath) {
    const writer = createWriteStream(outputLocationPath);
    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {
        response.data.pipe(writer);
        return finished(writer); //this is a Promise
    });
}
// @ts-check

import axios from 'axios';
import { createWriteStream } from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);

/**
 * Download file using Axios
 * @param {string} remoteUrl
 * @param {string} localPath 
 * @returns {Promise<any>}
 */
export async function downloadFile(remoteUrl, localPath) {
    const writer = createWriteStream(localPath)

    return axios({
        method: 'get',
        url: remoteUrl,
        responseType: 'stream'
    })
        .then(response => {
            response.data.pipe(writer)
            return finished(writer)
        })
        .catch(reason => {
            console.log('ocurrió un error al descargar el audio. razón:', reason)
            return null
        })


}

/**
 * Return a new UUID
 * @returns {string}
 */
export function generateUUID() {
    let d = new Date().getTime()
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16
        if (d > 0) {
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
        } else {
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}
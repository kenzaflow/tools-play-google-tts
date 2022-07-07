import * as googleTTS from 'google-tts-api';
import { downloadFile } from './helpers/index.mjs';
import { playAudioFile } from 'audic';
import { rm } from 'fs/promises';
import glob from 'glob';

const getAudioURL = (text = String()) => {
    const url = googleTTS.getAudioUrl(text, {
        lang: 'es-US',
        slow: false,
        host: 'https://translate.google.com',
    });
    return url
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

let audioWaiting = []
let playing = false

const pushText = async (text = String(), sayText = false, endWith = false) => {
    const audioUrl = getAudioURL(text)
    const file = '.temp-' + generateUUID() + '.wav'

    const index = audioWaiting.push({ ready: false, file: file, sayText: sayText && text, endWith: endWith })

    await downloadFile(audioUrl, file)

    let intervalito = setInterval(() => {
        if (audioWaiting[index - 1]) {
            clearInterval(intervalito)
            audioWaiting[index - 1].ready = true
        }
    }, 100);
}



setInterval(async () => {
    if (playing === false && audioWaiting.length > 0 && audioWaiting[0].ready === true) {
        playing = true
        const { file, sayText, endWith } = audioWaiting.shift()
        if (sayText) setTimeout(() => {
            console.log(sayText)
        }, 1000);
        await playAudioFile(file);
        await rm(file, { force: true, maxRetries: 10 })
        if (endWith) process.exit()
        playing = false
    }
}, 100);



const main = async () => {



    console.clear()

    let text

    text = 'hola perrito malvado'
    pushText(text, true)

    text = 'tanto tiempo'
    pushText(text, true)

    text = 'chupame el pingo. puto. chau. gil de mierda.'
    pushText(text, true, true)

}


glob(".temp*", async function (er, files) {
    for (const file of files) {
        await rm(file)
    }
})

main()
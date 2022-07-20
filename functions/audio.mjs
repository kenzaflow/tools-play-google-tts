// @ts-check

import { playAudioFile } from "audic";
import { rm } from 'fs/promises';
import { downloadFile, generateUUID } from "./download.mjs";
import getAudioUrl from "./google.mjs";

let audioInitialized = false

let audioWaiting = []

/**
 * Play some text with TTS
 * @param {string} text
 * @return {Promise<void>}
 */
export default async function playText(text) {

    if (!audioInitialized) {
        audioInitialized = true
        playAudioFile('.')
    }

    const audioUrl = getAudioUrl(text)
    const file = '.temp-' + generateUUID() + '.wav'

    audioWaiting.push({
        text: text,
        ready: false,
        file: file
    })

    process.stdout.write(`\x1b[36mdescargando:\x1b[0m: '${text}'...`);
    await downloadFile(audioUrl, file)

    process.stdout.write(` \x1b[36mreproduciendo\x1b[0m...`);
    await playAudioFile(file);

    process.stdout.write(` \x1b[36mlisto\x1b[0m\n.`);
    await rm(file, { force: true, maxRetries: 10 })

}
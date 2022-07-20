// @ts-check
import * as googleTTS from 'google-tts-api';
import { readFile } from 'fs/promises'

const pkg = JSON.parse(await readFile('./package.json', { encoding: 'utf8' }))

/**
 * Get a Url with TTS from Google Servers
 * @param {string} text Text to get from Google
 * @returns {string} Url
 */
export default function getAudioUrl(text = String()) {
    const url = googleTTS.getAudioUrl(text, {
        lang: pkg.config.lang || 'es-US',
        slow: false,
        host: 'https://translate.google.com',
    });
    return url
}
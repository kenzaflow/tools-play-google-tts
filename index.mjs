// @ts-check
import playText from './functions/audio.mjs';

const main = async () => {

    console.clear()

    const args = process.argv.slice(2, process.argv.length)

    if (args.length > 0) {
        for (const text of args) {
            await playText(text)
        }
    } else {
        await playText('Este es un ejemplo. Lee el README.MD para saber cómo usar este programa.')
    }

    process.exit(0)

}


main()
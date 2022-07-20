# tools-play-google-tts

Reproduce la voz del traductor de Google directamente desde Node.js :)

Idioma por defecto: `es-US`. Se puede cambiar en [package.json](./package.json)) en `config.lang`.

Los códigos de idiomas se pueden ver [acá](https://cloud.google.com/text-to-speech/docs/voices)

## Instalación
1. Clonar o descargar... (puede ser desde [Releases](https://github.com/kenzaflow/tools-play-google-tts/releases))
2. Abrir la carpeta en una terminal y ejecutar `npm install`

## Uso

Ejemplos:

```bash
## Lee un ejemplo.
npm run play
```

```bash
## Dice "hola", seguido de "todo bien?"
npm run play -- 'hola' 'todo bien?
```
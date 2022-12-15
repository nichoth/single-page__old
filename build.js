// @ts-check
const path = require('path')
const esbuild = require('esbuild')

//
// build CJS and ESM versions
//
async function main () {
    // cjs
    await esbuild.build({
        entryPoints: ['src/index.js'],
        bundle: true,
        keepNames: true,
        format: 'cjs',
        outfile: path.join('./dist/', 'index.js'),
        platform: 'browser'
    })

    // esm
    await esbuild.build({
        entryPoints: ['src/index.js'],
        bundle: true,
        keepNames: true,
        format: 'esm',
        outfile: path.join('./dist/', 'index.esm.js'),
        platform: 'browser'
    })
}

main()

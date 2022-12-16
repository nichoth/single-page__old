// @ts-check
import esbuild from 'esbuild'

//
// build CJS and ESM versions
//
async function main () {
    // cjs
    await esbuild.build({
        entryPoints: ['index.mjs'],
        bundle: true,
        keepNames: true,
        format: 'cjs',
        outfile: 'index.cjs',
        platform: 'browser'
    })
}

main()

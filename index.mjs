import { transformSync } from '@swc/core'
import { readFileSync } from 'fs'


const transform =  () => {
  const content = readFileSync('./simple.jsx', 'utf8')
  
   return transformSync(content, {
    sourceMaps: false,
    inlineSourcesContent: false,
    jsc: {
      target: 'es2022',
      parser: {
        jsx: true
      }
    }
  })
}

const bench = () => {
  const startTime = process.hrtime.bigint()
  transform()
  const diff = process.hrtime.bigint() - startTime
  console.log(`${Number(diff) / Math.pow(10, 6)}ms`)
}

bench()

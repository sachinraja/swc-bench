const swc = require('@swc/core');
const fs = require('fs')
const transform =  () => {
  const content = fs.readFileSync('./simple.jsx', 'utf8')
  
   return swc.transformSync(content, {
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
  const diffs = []
  const runCount = 1
  for (let i = 0; i < runCount; i++) {
    const startTime = process.hrtime.bigint()
    transform()
    const diff = process.hrtime.bigint() - startTime
    diffs.push(diff)
  }
  const bigIntAvgNanoseconds = diffs.reduce((a, b) => a + b, BigInt(0)) / BigInt(runCount)
  const avgNanoseconds = Number(bigIntAvgNanoseconds)
  console.log(`${Number(avgNanoseconds) / Math.pow(10, 6)}ms`)
}

bench()

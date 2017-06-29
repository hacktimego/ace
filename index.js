const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const sizeOf = require('image-size')
const ls = promisify(fs.readdir)
const getSize = promisify(sizeOf)

;(async function () {
  const num = 1
  const dir = path.resolve(__dirname, 'images', `${num}`)
  const files = await ls(dir)

  const obj = { results: [] }
  for (const x of files) {
    const { width, height } = await getSize(path.resolve(dir, x))
    obj.results.push({
      image: [`https://raw.githubusercontent.com/hacktimego/ace/master/images/${num}/${x}`],
      wh: { h: height, w: width }
    })
  }

  fs.writeFileSync(path.resolve(__dirname, 'api', `img${num}.json`), JSON.stringify(obj)) 
})()


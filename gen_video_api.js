const url = require('url')
const fs = require('fs')
const path = require('path')

const m = 'video/20 vids for Xfun'

const dirs = fs.readdirSync(path.resolve(__dirname, m)).filter(dir => {
  const filename = path.resolve(__dirname, m, dir)
  const stats = fs.lstatSync(filename)
  return stats.isDirectory()
})

const filenames = dirs.map(di => {
    const d = path.resolve(__dirname, m, di)
    const mp4 = fs.readdirSync(d).filter(x => x.indexOf('.mp4') !== -1)[0]
    const png = fs.readdirSync(d).filter(x => x.indexOf('.png') !== -1)[0]
    return {
      cover: url.resolve('https://raw.githubusercontent.com/hacktimego/ace/master/', `${m}/${di}/${png}`),
      desc: mp4,
      url: url.resolve('https://media.githubusercontent.com/media/hacktimego/ace/master/', `${m}/${di}/${mp4}`)
    }
})
 
const obj = {}
obj.msg = 'it works'
obj.s = filenames

console.log(JSON.stringify(obj, null, 2))
fs.writeFileSync(path.resolve(__dirname,`${m}.json`), JSON.stringify(obj))



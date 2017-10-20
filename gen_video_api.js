const url = require('url')
const fs = require('fs')
const path = require('path')

const dirs = fs.readdirSync(path.join(__dirname, 'video')).filter(dir => {
  const filename = path.resolve(__dirname, 'video', dir)
  const stats = fs.lstatSync(filename)
  return stats.isDirectory()
})

console.log(dirs)
for (const dir of dirs) {
  const filenames = fs.readdirSync(path.resolve(__dirname, 'video', dir))
  
  const obj = {}
  obj.msg = 'it works'
  obj.s = filenames.map(filename => {
    const urlStr = url.resolve('https://raw.githubusercontent.com/hacktimego/ace/master/', `music/${dir}/${filename}`)
    return { image: [urlStr], name: filename }
  })

  fs.writeFileSync(path.resolve(__dirname, 'video', `${dir}.json`), JSON.stringify(obj))
}


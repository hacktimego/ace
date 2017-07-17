const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const baseUrl = 'https://raw.githubusercontent.com/hacktimego/ace/master'

const fsStat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

;(async function () {
  const cat = 'sexy'
  const catPath = path.resolve(__dirname, './picture', cat)
  const list = await readdir(catPath)

  const result = { has_more: false, message: '', success: true, data: [] }
  for (const filename of list) {
    const albumPath = path.resolve(catPath, filename)
    const stat = await fsStat(albumPath)
    let arr = []
    if (stat.isDirectory()) {
      const pics = await readdir(albumPath)
      arr = pics.map(pic => {
        const link = `${baseUrl}/picture/${cat}/${filename}/${pic}` 
        return link
      })
    }
    const obj = { title: filename, image: arr }
    result.data.push(obj)
  }

  fs.writeFile('./api/images0.json', JSON.stringify(result))  
})()


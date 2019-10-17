const GIFEncoder = require('gifencoder')
const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const glob = require('glob')

const width = parseInt(process.env.WIDTH) || 854
const height = parseInt(process.env.HEIGHT) || 480
const match = process.env.MATCH
const when = new Date()
const format = `${when.getFullYear()}${when.getMonth() + 1}${when.getDate()}${when.getHours()}${when.getMinutes()}`

console.log(`W: ${width} H: ${height} M:${match}`)

const encoder = new GIFEncoder(width, height)
const pics = glob.sync(`images/${match}*.jpg`)
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

encoder.createReadStream().pipe(fs.createWriteStream(`gifs/${match}${format}.gif`))

encoder.start()
encoder.setRepeat(0)
encoder.setDelay(500)
encoder.setQuality(10)

for (let i = 0; i < pics.length; i++) {
  console.log(`Image: ${pics[i]}`)
  const data = fs.readFileSync(__dirname + `/${pics[i]}`)
  const img = new Image()
  img.src = data
  ctx.drawImage(img, 0, 0, width, height)
  encoder.addFrame(ctx)
}
encoder.finish()

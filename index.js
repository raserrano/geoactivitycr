const cron = require('node-cron')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const volcanos = {
  poasCha: {
    key: 'livechahuites'
  },
  irazu: {
    key: 'liveirazu'
  },
  poasSO:{
    key: 'livepoas'
  },
  turrialba:{
    key: 'liveturrialba'
  },
  poas: {
    key: 'livecraterpoas'
  },
  rincon: {
    key: 'liverincon'
  }
}


const download = function (uri, filename, callback) {
  axios({
    method: 'get',
    url: uri,
    responseType: 'stream'
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream(filename).on('close', callback))
  })
}

function grabImages () {
  const when = new Date()
  const parts = [
    when.getMonth() + 1,
    when.getDate(),
    when.getHours(),
    when.getMinutes()
  ]
  const format = `${when.getFullYear()}${parts.map(e => String(e).padStart(2, '0')).join('')}`
  console.log(`Grabbing images at ${when}`)
  const imagesPath = path.join(__dirname, './images/')

  Object.entries(volcanos).forEach(([key, value])=> {
    const url = `http://www.ovsicori.una.ac.cr/images/stories/camaras/${value.key}/camara.jpg`
    download(url, `${imagesPath}${key}-${format}.jpg`, () => {
      console.log(`Done downloading ${key}-${format} picture.`)
    })
  })
}

cron.schedule(`*/${process.env.FREQ ? process.env.FREQ : 5} * * * *`, () => {
  grabImages()
})

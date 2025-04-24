const cron = require('node-cron')
const fs = require('fs')
const axios = require('axios')


const poasCha = {
  name: 'poasCha',
  url: 'http://www.ovsicori.una.ac.cr/images/stories/camaras/livechahuites/camara.jpg'
}
const irazu = {
  name: 'irazu',
  url: 'http://www.ovsicori.una.ac.cr/images/stories/camaras/liveirazu/camara.jpg'
}
const poasSO = {
  name: 'poasSO',
  url: 'http://www.ovsicori.una.ac.cr/images/stories/camaras/livepoas/camara.jpg'
}
const turrialba = {
  name: 'turrialba',
  url: 'http://www.ovsicori.una.ac.cr/images/stories/camaras/liveturrialba/camara.jpg'
}
const poas = {
  name: 'poas',
  url: 'http://www.ovsicori.una.ac.cr/images/stories/camaras/livecraterpoas/camara.jpg'
}
const rincon = {
  name: 'rincon',
  url: 'http://www.ovsicori.una.ac.cr/images/stories/camaras/liverincon/camara.jpg'
}

const volcanos = [poas, poasCha, poasSO, irazu, turrialba, rincon]

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
  const format = `${when.getFullYear()}${when.getMonth() + 1}${when.getDate()}${when.getHours()}${when.getMinutes()}`
  console.log(`Grabbing images at ${when}`)
  volcanos.forEach(v=>{
    download(v.url, `images/${v.name}-${format}.jpg`, () => {
      console.log('done')
    })
  })
}

cron.schedule(`*/${process.env.FREQ} * * * *`, () => {
  grabImages()
})

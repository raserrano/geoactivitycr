const turrialba = 'http://www.ovsicori.una.ac.cr/images/stories/camaras/liveturrialba/camara.jpg'
const poas = 'http://www.ovsicori.una.ac.cr/images/stories/camaras/livecraterpoas/camara.jpg'
const rincon = 'http://www.ovsicori.una.ac.cr/images/stories/camaras/liverincon/camara.jpg'

const fs = require('fs'),
  request = require('request')

const download = function(uri, filename, callback){
  request.head(uri, function(err, res){
    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

download(turrialba, 'images/turrialba.png', () =>{
  console.log('done')
})

download(poas, 'images/poas.png', () =>{
  console.log('done')
})

download(rincon, 'images/rincon.png', () =>{
  console.log('done')
})
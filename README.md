# geoactivitycr
Getting info from tremors, earthquakes and volcanic activity 

## Install packages
`npm install`

## Run 
Make sure to create _images_ folder where images will be store.
To let the script run and grab images run:
`FREQ=5 node index.js`

Make sure you create the _gifs_ folder and then once you have a few images create the GIF as follows:

`WIDTH=800 HEIGHT=600 MATCH="poas" node gifencoder.js`
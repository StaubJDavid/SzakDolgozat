const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');
const cors = require('cors');
const imageProxy = require('./node_modules/proxy-image-service/src/imageProxy');
const imageProxyErrors = require('./node_modules/proxy-image-service/src/imageProxyErrors');
const axios = require('axios');
const fs = require('fs');


const app = express();
app.use('*', cors());
app.use(express.static('public'));

const PUBLIC_ADDRESS = "localhost";
const PORT = 3000;
const HOST = "0.0.0.0";
//A kívánt API URL cím törzsének megadása
const API_SERVICE_URL = "https://api.mangadex.org";
const PROXY_ADDRESS = `http://${PUBLIC_ADDRESS}:${PORT}`;
const API_IMAGE_SERVICE_URL = "https://uploads.mangadex.org/covers";

app.use(morgan('dev'));

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service');
});

//Hozzáadjuk az express API egyik végpontjához a proxy middlewaret
app.use('/endpoint', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/endpoint`]: '',
    },
}));

const download_image = (url, image_path) =>{
    //Promise létrehozása, hogy használni tudjuk a Javascript await metódusát
    return new Promise((resolve, reject) => {
        //Axios segítségével megszerezzük a kép adatait
        axios({
            url,
            responseType: 'stream',
        }).then(
            response =>{
                //A képet elmentjük a szerveren
                response.data
                .pipe(fs.createWriteStream("public/"+image_path))
                .on('finish', () => resolve("public/"+image_path))
                .on('error', e => reject(e))
            }
                
        ).catch(
            error => {
                reject("download error");
            }
        );
    });
  }


  app.get('/img/:id/:filename', async (req, res) => {
    
    //Megfelelő elérési út létrehozása
    const requestUrl = `https://uploads.mangadex.org/covers/${req.params.id}/${req.params.filename}`
 
    //Try catch block a hibák elkapására
    try {

        //Ellenőrizzük hogy létezik-e a kívánt kép a szerveren
        if (fs.existsSync(`public/${req.params.id}(-)${req.params.filename}`)) {

            //Létezik a fájl, vissza adjuk az elérési útját
            res.json({url:`${PROXY_ADDRESS}/${req.params.id}(-)${req.params.filename}`});
            
        }else{

            //Nem létezik a fájl, letöltjük a MangaDex szerveréről
            await download_image(requestUrl, `${req.params.id}(-)${req.params.filename}`);
            
            //Vissza adjuk a letöltött fájl elérési útját
            res.json({url:`${PROXY_ADDRESS}/${req.params.id}(-)${req.params.filename}`});
        }
        
    } catch (error) {

        //ha valami hiba merül fel vissza adunk egy hiba képet
        res.status(400).json({url:`${PROXY_ADDRESS}/error.jpg`});
    }
});

app.get('/chapter/:hash/:filename', async (req, res) => {

    //Megfelelő elérési út létrehozása
    const baseUrl = "https://uploads.mangadex.org";
    const {hash,filename} = req.params;
    const requestUrl = `${baseUrl}/data/${hash}/${filename}`

    //Try catch block a hibák elkapására
    try {

        //Ellenőrizzük hogy létezik-e a kívánt kép a szerveren
        if (fs.existsSync(`public/panel(-)data(-)${hash}(-)${filename}`)) {

            //Létezik a fájl, vissza adjuk az elérési útját
            res.json({url:`${PROXY_ADDRESS}/panel(-)data(-)${hash}(-)${filename}`});
            
        }else{

            //Nem létezik a fájl, letöltjük a MangaDex szerveréről
            await download_image(requestUrl, `panel(-)data(-)${hash}(-)${filename}`);

            //Vissza adjuk a letöltött fájl elérési útját
            res.json({url:`${PROXY_ADDRESS}/panel(-)data(-)${hash}(-)${filename}`});
        }
    } catch (error) {

        //ha valami hiba merül fel vissza adunk egy hiba képet
        res.status(400).json({url:`${PROXY_ADDRESS}/error.jpg`});
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });

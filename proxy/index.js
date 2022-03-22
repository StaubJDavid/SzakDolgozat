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

const PORT = 3000;
const HOST = "0.0.0.0";
const API_SERVICE_URL = "https://api.mangadex.org";
const API_IMAGE_SERVICE_URL = "https://uploads.mangadex.org/covers";

app.use(morgan('dev'));

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

app.use('/xd', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/xd`]: '',
    },
}));

//REACT_APP_PROXY_IMAGE_URL=http://80.98.214.13:3000/image
/*app.use('/image', createProxyMiddleware({
    target: API_IMAGE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/image`]: '',
    }
}));*/

const download_image = (url, image_path) =>{
    //console.log("in download");
    return new Promise((resolve, reject) => {
        //console.log("in download promise");
        axios({
            url,
            responseType: 'stream',
        }).then(
            response =>{
                //console.log("in download response");
                response.data
                .pipe(fs.createWriteStream("public/"+image_path))
                .on('finish', () => resolve("public/"+image_path))
                .on('error', e => reject(e))
                /*console.log(response.status);
                resolve("response");*/
            }
                
        ).catch(
            error => {
                //console.log("in download catch");
                //console.log(error.status);
                reject("download error");
            }
        );
    });
  }


  app.get('/img/:id/:filename', async (req, res) => {
    console.log(`Request received: ${req.params.id}/${req.params.filename}`);
    
    const requestUrl = `https://uploads.mangadex.org/covers/${req.params.id}/${req.params.filename}`

    
    try {
        //console.log("before exists");
        if (fs.existsSync(`public/${req.params.id}(-)${req.params.filename}`)) {
            console.log("exists");
            res.json({url:`http://80.98.214.13:3000/${req.params.id}(-)${req.params.filename}`});
            
        }else{
            //console.log("before download");
            await download_image(requestUrl, `${req.params.id}(-)${req.params.filename}`);
            //console.log("after download");
            res.json({url:`http://80.98.214.13:3000/${req.params.id}(-)${req.params.filename}`});
        }
        //console.log("outside");
        
    } catch (error) {
        //console.log("in main catch");
        //console.log(error.status);
        res.status(400).json({url:`http://80.98.214.13:3000/error.jpg`});
    }
    
});

app.get('/chapter/:hash/:filename', async (req, res) => {
    const baseUrl = "https://uploads.mangadex.org";
    //console.log(`Request received: ${baseUrl}/${req.params.id}/${req.params.filename}`);
    const {hash,filename} = req.params;
    const requestUrl = `${baseUrl}/data/${hash}/${filename}`

    
    try {
        //console.log("before exists");
        if (fs.existsSync(`public/panel(-)data(-)${hash}(-)${filename}`)) {
            //console.log("exists");
            res.json({url:`http://80.98.214.13:3000/panel(-)data(-)${hash}(-)${filename}`});
            
        }else{
            //console.log("before download");
            await download_image(requestUrl, `panel(-)data(-)${hash}(-)${filename}`);
            //console.log("after download");
            res.json({url:`http://80.98.214.13:3000/panel(-)data(-)${hash}(-)${filename}`});
        }
        //console.log("outside");
        
    } catch (error) {
        //console.log("in main catch");
        //console.log(error.status);
        res.status(400).json({url:`http://80.98.214.13:3000/error.jpg`});
    }
    
});

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });
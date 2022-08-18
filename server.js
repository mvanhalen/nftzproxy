'use strict';

const express = require('express')
const app = express()

//var http = require('http');
var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);




//Main
//const proxy = require('pass-cors')
app.use('/proxy', (req, res) => {
    let data = req.query
    if (data.url) {
        let n = 1
        let uri = ''
        for (let param in data) {
            if (n == 1) {
                uri += data[param]
            } else {
                uri += `&${param}=${data[param]}`
            }
            n += 1
        }
        // console.log(uri);
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Credentials', true)
        try {
            let url = new URL(uri)
            req(uri).pipe(res)
        } catch (err) {
            console.log(err);
        }
    } else {
        res.setHeader("Content-Type", "application/json")
        res.json({
            "error": "404",
            "desc": "Enter URL in the format /proxy?url='yourURLHere'"
        })
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
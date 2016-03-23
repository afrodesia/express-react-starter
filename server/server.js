var express = require('express')
var path = require('path')
var http = require('http')
var config = require('../webpack.config.js')
var webpack = require('webpack')
var fs = require('fs')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var app = express()

// Dev middleware
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {noInfo: false, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(express.static('./dist'))

app.use('/', function (req, res){

    res.set("Content-Type",'text/html')
    res.sendFile(path.resolve('client/index.html'))

})

// app.use('/', express.static(__dirname + '/client'));

var port = 3333

app.listen(port, function(error){
    if (error) throw error
    console.log("Express server is listening on http://localhost:",port)
})

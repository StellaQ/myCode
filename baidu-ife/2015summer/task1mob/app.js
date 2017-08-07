var express = require('express');
var app = express();

// var webpack = require('webpack'),
//     webpackDevMiddleware = require('webpack-dev-middleware'),
//     webpackHotMiddleware = require('webpack-hot-middleware'),
//     webpackConfig = require('./build/webpack.config.js');

// var compiler = webpack(webpackConfig);

// var devMiddleware = webpackDevMiddleware(compiler,{
//     publicPath: webpackConfig.output.publicPath,
//     stats: {
//         colors: true,
//         chunks: false
//     }
// });
// var hotMiddleware = webpackHotMiddleware(compiler);

// app.use(devMiddleware);
// app.use(hotMiddleware);
// compiler.plugin('compilation', function(compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
//         hotMiddleware.publish({ action: 'reload' });
//         cb();
//     });
// });

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.send('Hello Express');
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000! http://localhost:3000/');
});

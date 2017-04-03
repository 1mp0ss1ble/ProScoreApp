import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import controllers from './controllers';
import mongoose from 'mongoose';
let app = express();

const port = process.env.PORT || 3000;

let bodyParser = require('body-parser');

let favicon = require('serve-favicon');


const compiler  = webpack(webpackConfig);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/server/public'));

//app.use(favicon(__dirname + '/server/public/favicon.ico'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(webpackMiddleware(compiler,{
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));

app.use(webpackHotMiddleware(compiler));


app.use(controllers);


app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});


app.listen(port, () => console.log('Server running on 3000'));



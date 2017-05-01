import express from 'express';
import path from 'path';
import webpackConfig from './webpack.config.dev';
import controllers from './server/controllers';
import mongoose from 'mongoose';
let app = express();

const port = process.env.PORT || 3000;

let bodyParser = require('body-parser');

let favicon = require('serve-favicon');

app.use(bodyParser.json());

//app.use(express.static('../public'));
//app.use(express.static(__dirname + '/public'));

//const indexPath = path.join(__dirname, 'index.html')
//const publicPath = express.static(path.join(__dirname, 'public'))

//app.use(express.static(__dirname + '/'))
app.use(express.static(__dirname + '/public'))


//app.use('/public', publicPath);


//app.use(express.static(__dirname + '/server/public'));
//app.use(express.static(path.join(__dirname, 'dist')));


//app.use(favicon(__dirname + '/server/public/favicon.ico'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler  = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler,{
  	publicPath: webpackConfig.output.publicPath,
  	noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}


app.use(controllers);

/*
app.get('/*', function(req, res) {
	res.sendFile(indexPath);
	//res.send('FFF');
	//res.sendFile(__dirname + '/dist/index.html')
});
/*
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
*/
app.get('/*', function(req, res) {
  //var text  = path.resolve(__dirname, 'public/index.html') + ' & ' +  __dirname;
  //  /app/public/index.html & /app
  res.sendFile(path.join(__dirname, 'public/index.html'));
   //res.send(text);
});

app.listen(port, () => console.log('Server running...'));

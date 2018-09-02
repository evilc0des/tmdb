const express = require('express');
const path = require('path');
const http = require('http');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(`${__dirname}/dist`));

// send the user to index html page inspite of the url

app.get('/assets/:file', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/assets`, req.params.file)) ;
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist`, 'index.html'));
});

let server = http.Server(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`App running on http://localhost:${bind}`);
}
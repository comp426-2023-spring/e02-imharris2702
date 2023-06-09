//// Load most basic dependencies
// Create require function 
// https://nodejs.org/docs/latest-v18.x/api/module.html#modulecreaterequirefilename
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// The above two lines allow us to use ES methods and CJS methods for loading
// dependencies.
// Load minimist for command line argument parsing
// https://www.npmjs.com/package/minimist
const minimist = require('minimist')
// Parse our command line arguments
const args = minimist(process.argv.slice(2))
// Are we debugging or testing?
// If so, then let's look at our command line arguments just to see what is in there
if (args.debug) {
    console.info('Minimist parsed and created the following `args` object:')
    console.info(args)
}
// Did we call for help? 
if (args.h || args.help) {
    console.log(`
usage: node server.js --port=5000

This package serves the static HTML, CSS, and JS files in a /public directory.
It also creates logs in a common log format (CLF) so that you can better.

  --stat,  -s    Specify the directory for static files to be served
                    Default: ./public/
  --port, -p    Specify the port for the HTTP server to listen on
                    Default: 8080
  --log,  -l    Specify the directory for the log files
                    Default: ./log/
  --help, -h    Displays this help message and exit 0 
                    (Does not work when run with nodemon)
  --debug       Echos more information to STDOUT so that you can see what is
                    stored in internal variables, etc.
    `)
    process.exit(0)
} 
// Load express and other dependencies for serving HTML, CSS, and JS files
import express from 'express'
// Use CJS __filename and __dirname in ES module scope
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Load dependencies for logging
const fs = require('fs')
const morgan = require('morgan')
// Create log path
const logpath = args.log || args.l || process.env.LOGPATH || path.join(__dirname, 'log')
if (!fs.existsSync(logpath)){
    fs.mkdirSync(logpath);
}
if (args.debug) {
    console.info('HTTP server is logging to this directory:')
    console.info(logpath)
}
// Create an app server
const app = express()
// Set a port for the server to listen on
const port = args.port || args.p || process.env.PORT || 8080
// Load app middleware here to serve routes, accept data requests, etc.
//
// Create and update access log
// The morgan format below is the Apache Foundation combined format but with ISO8601 dates
app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    {stream: fs.createWriteStream(path.join(logpath, 'access.log')), flags: 'a' }
))
// Serve static files
const staticpath = args.stat || args.s || process.env.STATICPATH || path.join(__dirname, 'public')
app.use('/', express.static(staticpath))

// Connect rpsls_routes
import { rps, rpsls } from './lib/rpsls.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root endpoint
app.get("/app", (req,res) => {
	res.status(200).send("200 OK");
});

// Single player rps endpoint
app.get("/app/rps", (req,res) => {
	res.json(rps());
});

// Single player rpsls endpoint
app.get("/app/rpsls", (req,res) => {
	res.json(rpsls());
});

// Multiplayer url encoded request body rps endpoint
app.get("/app/rps/play", (req,res) => {
	let shot = req.body.shot;	
	if (!shot) {
		shot = req.query.shot;
	}
	res.json(rps(shot));
});

// Multiplayer json request body rps endpoint
app.post("/app/rps/play", (req,res) => {
	let shot = req.body.shot;	
	if (!shot) {
		shot = req.query.shot;
	}
	res.json(rps(shot));
});

// Multiplayer url encoded request body rpsls endpoint
app.get("/app/rpsls/play", (req,res) => {
	let shot = req.body.shot;	
	if (!shot) {
		shot = req.query.shot;
	}
	res.json(rpsls(shot));
});

// Multiplayer json request body rpsls endpoint
app.post("/app/rpsls/play", (req,res) => {
	let shot = req.body.shot;
	if (!shot) {
		shot = req.query.shot;
	}
	res.json(rpsls(shot));
});

// Multiplayer parameter rps endpoint
app.get("/app/rps/play/:shot", (req,res) => {
	res.json(rps(req.params.shot));
});

// Multiplayer parameter rpsls endpoint
app.get("/app/rpsls/play/:shot", (req,res) => {
	res.json(rpsls(req.params.shot));
});

// Defualt route
app.use(function(req, res){
	res.status(404).send("404 NOT FOUND");
});

// Create app listener
const server = app.listen(port)
// Create a log entry on start
let startlog = new Date().toISOString() + ' HTTP server started on port ' + port + '\n'
// Debug echo start log entry to STDOUT
if (args.debug) {
    console.info(startlog)
} 
// Log server start to file
fs.appendFileSync(path.join(logpath, 'server.log'), startlog)
// Exit gracefully and log
process.on('SIGINT', () => {
// Create a log entry on SIGINT
    let stoppinglog =  new Date().toISOString() + ' SIGINT signal received: stopping HTTP server\n'
//  Log SIGINT to file
    fs.appendFileSync(path.join(logpath, 'server.log'), stoppinglog)
// Debug echo SIGINT log entry to STDOUT
    if (args.debug) {
        console.info('\n' + stoppinglog)
    }
// Create a log entry on stop
    server.close(() => {
        let stoppedlog = new Date().toISOString() + ' HTTP server stopped\n'
// Log server stop to file
        fs.appendFileSync(path.join(logpath, 'server.log'), stoppedlog)
// Debug echo stop log entry to STDOUT
        if (args.debug) {
            console.info('\n' + stoppedlog)
        }    
    })
})

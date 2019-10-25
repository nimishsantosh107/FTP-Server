#!/usr/bin/env node --harmony
const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const FtpSvr = require ('ftp-srv');


//RECV CMD LINE INPUT
program
	.option('-L, --local', 'Local network', true)
	.option('-P, --public', 'Public network')
	.option('-a, --address <address>', 'IPv4 address', '127.0.0.1')
	.option('-p, --port <port>', 'Port', '21')
	.parse(process.argv);
var opts = program.opts();
//PROCESS
	//PUBLIC SPECIFIED BUT NO ADDRESS
if ((opts.public) && (opts.address === '127.0.0.1')){
	opts.local = undefined;
	opts.address = '192.168.1.100';
}
	//PUBLIC AND ADDRESS SPECIFIED
else if ((opts.public) && (opts.address !== '127.0.0.1')){
	opts.local = undefined; 
}

//PRINT OPTS

//INIT SERVER
const ftpServer = new FtpSvr ( 'ftp://'+opts.address+':'+opts.port,{ anonymous: true } );

//HANDLE LOGIN
ftpServer.on ( 'login', ({connection, username, password}, resolve, reject) => {
	//RES / REJ
});

//LISTEN
ftpServer.listen().then(() => {console.log( chalk.bold.green( `FTP SERVER UP ON ftp://${opts.address}:${opts.port}/` ));});

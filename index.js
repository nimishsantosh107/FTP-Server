#!/usr/bin/env node --harmony
const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const FtpSvr = require ('ftp-srv');
const ftpd = require('simple-ftpd');
const fs = require('fs');
const users = require('./users.js')

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
const PASV_URL = 'ftp://'+opts.address+':'+opts.port;
const ftpServer = new FtpSvr ({ pasv_url: opts.address, pasv_min: 21} );

//HANDLE LOGIN
ftpServer.on ( 'login', ({connection, username, password}, resolve, reject) => {
	if(username in users){
		if(password === users[username]){
			resolve( {root: './'} )
		}else {reject('INVALID CREDENTIALS');}
	}else {reject('NO USER');}
});

//LISTEN
ftpServer.listen().then(() => {console.log( chalk.bold.green( `FTP SERVER UP ON ftp://${opts.address}:${opts.port}/` ));});

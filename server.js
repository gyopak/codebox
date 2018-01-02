const express = require('express')
const cmd = require('node-cmd')
const shell = require('shelljs');

const app = express()

app.use('/static', express.static('static'))

shell.cd("/")

app.get('/', (req, res) => res.sendFile(__dirname + '/static/index.html'))



app.get('/tree', function(req, res) {
  let runCommand = function (command) {
	shell.exec(command, function(err, data, stderr){
		let returnList = [];
        data.split(/\r?\n/).forEach(function (element) {
        	returnList.push(element);
        })
        res.send(returnList);
    }
	);
}
  runCommand("ls | xargs -n 1 basename");
});

app.get('/cd/:where', function(req, res) {
  let runCommand = function (command) {
	shell.exec(command, function(err, data, stderr){
		let returnList = [];
        data.split(/\r?\n/).forEach(function (element) {
        	returnList.push(element);
        })
        res.send(returnList);
    }
	);
}
  shell.cd(req.params.where == "<<<" ? ".." : req.params.where)
  runCommand("ls | xargs -n 1 basename");
});

app.get('/file/:file', function(req, res) {
  let runCommand = function (command) {
	shell.exec(command, function(err, data, stderr){
        res.send({"content": data});
    }
	);
  }
  runCommand("cat " + req.params.file);
});


app.listen(2001, () => console.log('port 2001!'))
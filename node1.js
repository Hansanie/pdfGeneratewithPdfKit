var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var pdf = require ('pdfkit');																	//to create PDF using NODE JS
var fs = require('fs');																			// to create write streams
var myDoc = new pdf;																			//creating a new pdf document

app.use(bodyParser());								
app.use( express.static(__dirname) );	

app.get('/', function (req, res){																//to get the first get request
	res.sendFile('./index.html',{root : __dirname});
	console.log('sent file');
});

app.post('/download', function (req, res){
	console.log(req.body.username);
	console.log(req.body.amount);

			myDoc.pipe(fs.createWriteStream('pdf/' + req.body.username + '.pdf'));									//creates pdf with the name of the user
			myDoc.fontSize(30);
			myDoc.text(req.body.username);
			myDoc.text( req.body.amount);
			myDoc.end();
			setTimeout(function(){	
				var data = fs.readFileSync('./pdf/' + req.body.username + '.pdf');
				res.contentType("application/pdf");
				res.send(data);		
				},3000);
			setTimeout(	function(){res.end();}, 7000);
	});

app.listen(9080 , function(){																										//to listen to any particular port
	console.log('Listening at port 9080');
});















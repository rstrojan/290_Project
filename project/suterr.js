var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3469);

app.get('/',function(req,res){
	res.render('home');
});

app.get('/citypage', function(req,res){
	res.render('citypage');
});

app.get('/tickets', function(req,res){
	res.render('tickets');
});

app.get('/Find_out_more', function(req,res){
	res.render('Find_out_more');
});

app.get('/ticket_print',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  varqParams2= [];
  for (var p in req.query){
	  qParams2.push(p:req.query[p],)
  }
  var context = {};
  context.callType = 'GET';
  context.dataList = qParams;
  context.dataList
  res.render('ticket_print', context);
});


app.post('/ticket_print', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.callType = 'POST';
  context.dataList = qParams;
  res.render('ticket_print', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

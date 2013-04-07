var http = require('http');
var fs = require('fs');

PORT = 8080;
console.log('sse server started @ port '+PORT);

http.createServer(function(req, res) {

  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    if (req.url == '/events') {
    console.log("accessed by event client");
      sendSSE(req, res);
    } else {
    console.log("bad access");
      res.writeHead(404);
      res.end();
    }
  } else {
  console.log("accessed by http browser");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync(__dirname + '/sse_client.html'));
    res.end();
  }
}).listen(PORT);

function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  var id = (new Date()).toLocaleTimeString();

  // Sends a SSE every 6 seconds on a single connection.
  setInterval(function() {
    constructSSE(res, id, (new Date()).toLocaleTimeString());
  }, 6000);

  constructSSE(res, id, (new Date()).toLocaleTimeString());
}

function constructSSE(res, id, data) {
  var newData = "Time:" + data + ", random Quote : "+getQuoteOfTheDay();
  console.log("new pushed data: "+newData);
  res.write('id: ' + id + '\n');
  res.write("data: "+newData+' \n\n');
}

function getQuoteOfTheDay() {
	var myArray = [
		'The quickest way to double your money is to fold it over and put it back in your pocket. - Will Rogers', 
		'Women who seek to be equal with men lack ambition. - Marilyn Monroe', 
		'Patience is something you admire in the driver behind you, but not in one ahead. - Bill McGlashen', 
		'Some cause happiness wherever they go; others whenever they go - Oscar Wilde', 
		'The only mystery in life is why the kamikaze pilots wore helmets - Al McGuire',
		'A bank is a place that will lend you money if you can prove that you dont need it. - Bob Hope',
		'A computer once beat me at chess, but it was no match for me at kick boxing. - Emo Philips',
		'If at first you dont succeed, skydiving is not for you! - Henny Youngman',
		'Get your facts first, then you can distort them as you please. - Mark Twain',
		'People who think they know everything are a great annoyance to those of us who do. - Isaac Asimov',
		'I always wanted to be somebody, but now I realize I should have been more specific. - Lily Tomlin',
		'Why do they call it rush hour when nothing moves? - Robin Williams',
		'Amazing that the amount of news that happens in the world every day always just exactly fits the newspaper. - Jerry Seinfeld'
	];
	var randomQuote = function() {
		var rand = myArray[Math.floor(Math.random() * myArray.length)];
		return rand;
	}
	return randomQuote();
}
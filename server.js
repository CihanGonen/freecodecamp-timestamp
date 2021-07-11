// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  console.log(Date.now())
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?',(req,res)=>{
    if(req.params.date){
      let input = req.params.date;
      console.log(input,typeof(input));
      if(input.includes('-')){
        let fixedInput = input.split('-').map(elem=> elem.length<2 ? '0'+elem : elem).join('-');
        let unix = Number((+new Date(fixedInput)).toFixed(0))
        if(isNaN(unix)){
          res.json({ error : "Invalid Date" })
        }
        else{
          let date = (new Date(unix)).toUTCString();
          res.json({'unix':unix,'utc':date});
        }
      }
      else{
        let numInput = Number(input);
        if(!isNaN(numInput)){
          let date = (new Date(numInput)).toUTCString();
          res.json({'unix':numInput,'utc':date});
        }
        else{
          res.json({ error : "Invalid Date" })
        }
      }
    }
    else{
      let unix = Date.now();
      let date = (new Date(unix)).toUTCString();
      res.json({'unix':unix,'utc':date});
    }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

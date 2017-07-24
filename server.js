var express = require('express'),
    exphbs  = require('express-handlebars'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    url = require('url'),
    cheerio = require('cheerio'),
    root = __dirname + '/css',
    app = express(),
    server = http.Server(app),
    helpers = require(__dirname + '/helpers.js');

function cleanURL(url){
  /* Remove UTM tracking */
  var utmPos = url.indexOf('utm_');
  if (utmPos > -1){
    url = url.substring(0, utmPos - 1);
  }
  /* Remove extra line breaks */
  url = url.replace(/(\r\n|\n|\r)/gm, '');
  
  return url;
}

var getPageMetadataFn = function getPageMetadata(pageURL){          
  if (pageURL.length > 0){
    return new Promise(function(resolve, reject){
      var domain = url.parse(pageURL).hostname;
      
      if (domain.indexOf('www.') === 0){
        /* Remove leading www */
        domain = domain.substr(4);    
      }
      

      var r = request.get(pageURL, function (err, res, body) {
        if (r !== undefined){
          var $ = cheerio.load(body);
          var webpageTitle = $("title").text();
          
          return resolve({
            'title': webpageTitle.trim(),
            'original-url': pageURL,
            'domain': domain
          });
        }
      });
    });    
  }
  else{
    return false;
  }
}

function generateCode(data, options, res){
/*
options = {
  'format': html/markdown
  'wrap-list': yes/undefined (wrap links inside a list?),
  'show-domain': yes/undefined (add domain name after the link)   
}

*/  
  var link_prefix = '', link_suffix = '';
  var include_domain = '';
  
  if (options['wrap-list'] === 'yes'){
    if (options['format'] === 'html'){
      link_prefix = '<li>';
      link_suffix = '</li>';
    }
    else if (options['format'] === 'markdown'){
      link_prefix = '- ';
    }    
  }
  
  if (options.format === 'html'){
    var code = data.map(function(pageData){
      if (options['show-domain'] === 'yes'){
        include_domain = ` (${pageData['domain']})`;        
      }
      
      return `${link_prefix}<a href="${pageData['original-url']}">${pageData['title']}</a>${include_domain}${link_suffix}`;
    });    
  }
  else if (options.format === 'markdown'){
    var code = data.map(function(pageData){
      if (options['show-domain'] === 'yes'){
        include_domain = ` (${pageData['domain']})`;        
      }

      return `${link_prefix}[${pageData['title']}](${pageData['original-url']})${include_domain}${link_suffix}`;
    });        
  }
  
  code = code.join('\n');
  
  if (options.format === 'html' && options['wrap-list'] === 'yes'){
    code = '<ul>\n' + code + '\n</ul>';
  }
  
  res.render('formatter', {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    project_name: process.env.PROJECT_DOMAIN,
    code: code
  });
}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.render('home', {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    project_name: process.env.PROJECT_DOMAIN
  });
});

app.post('/', function (req, res) {
  var urls = req.body.urls.trim().split('\r');
  
  urls = urls.map(cleanURL);

  var actions = urls.map(getPageMetadataFn);
  var results = Promise.all(actions);  

  results.then(function (results) {
      generateCode(results, {
        'format': req.body.format,
        'wrap-list': req.body['wrap-list'],
        'show-domain': req.body['show-domain']        
      }, res)
  });
});

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3011);
app.set('ip', '127.0.0.1');

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is running on port ' + listener.address().port);
});

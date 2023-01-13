const express = require( 'express' ),
      exphbs  = require( 'express-handlebars' ),
      http = require( 'http' ),
      request = require( 'request' ),
      body_parser = require( 'body-parser' ),
      url = require( 'url' ),
      fs = require( 'fs' ),
      cheerio = require( 'cheerio' ),
      root = __dirname + '/css',
      app = express(),
      server = http.Server( app ),
      helpers = require( __dirname + '/helpers.js' );

const styles = fs.readFileSync(  __dirname + '/public/css/styles.min.css', 'utf8' );

const get_page_metadata_fn = function get_page_metadata( page_url ){          
  if ( page_url.length > 0 ){
    return new Promise( function( resolve, reject ){
      let domain = url.parse( page_url ).hostname;
      
      if ( domain.indexOf( 'www.' ) === 0 ){
        /* Remove leading www */
        domain = domain.substr( 4 );    
      }
      
      const r = request.get( page_url, function ( err, res, body ) {
        console.log( `processing ${page_url}...` );
        if ( r !== undefined ){
          const $ = cheerio.load( body );
          const pageTitle = $( 'meta[property="og:title"]' ).attr( 'content' ) || $( 'meta[property="twitter:text:title"]' ).attr( 'content' ) || $( 'title' ).text();
          
          return resolve( {
            'title': pageTitle.trim(),
            'original-url': page_url,
            'domain': domain
          } );
        }
      } );
    } );    
  }
  else{
    return false;
  }
}

app.engine( 'handlebars', exphbs( {defaultLayout: 'main'} ) );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'handlebars' );

app.use( body_parser.urlencoded( {
  extended: true
} ) );

app.get( '/', function ( req, res ) {
  res.render( 'home', {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    project_name: process.env.PROJECT_DOMAIN,
    styles: styles,
    head_scripts: process.env.HEAD_SCRIPTS
  } );
} );

app.post( '/', function ( req, res ) {
  let urls = req.body.urls.trim().split( '\r' );
  
  urls = urls.map( helpers.clean_url );

  let actions = urls.map( get_page_metadata_fn );
  let results = Promise.all( actions );  

  results.then( function ( results ) {
      helpers.generate_code( results, {
        'format': req.body.format,
        'wrap-list': req.body['wrap-list'],
        'show-domain': req.body['show-domain']        
      }, res )
  } );
} );

app.use( express.static( __dirname + '/public' ) );

app.set( 'port', process.env.PORT || 3011 );
app.set( 'ip', '127.0.0.1' );

const listener = app.listen( process.env.PORT, function () {
  console.log( 'Your app is running on port ' + listener.address().port );
} );

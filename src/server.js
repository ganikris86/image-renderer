var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    nconf = require('nconf'),
	log4js = require('log4js');

nconf.file({file: 'config/config.json'});
var host = nconf.get('host');
var port = nconf.get('port');
var loggerConfig = nconf.get('loggerConfig');
var logId = 'IMAGE_RENDERER';

http.createServer(function(req, res){

  log4js.configure(loggerConfig);
  logger = log4js.getLogger(logId);

  logger.info('*** Server.js > createServer - Init');
  var request = url.parse(req.url, true);
  var pathname = request.pathname;

  if(pathname.substring(pathname.length-7, pathname.length) === '/images'){
    var tenantCd = pathname.split('/')[1];
	logger.info('*** Server.js > createServer - Tenant code - ' + tenantCd);
    if(tenantCd !== '') {
      nconf.file({file: 'config/settingsTenant' + tenantCd + '.json'});
      var IMG_FOLDER = nconf.get('IMAGE_FOLDER_PATH');
      var imgName = request.query.img;
	  
	  logger.info('*** Server.js > createServer - Image folder - ' + IMG_FOLDER);
	  logger.info('*** Server.js > createServer - Image name - ' + imgName);

      if (imgName && IMG_FOLDER) {
        try {
          var img = fs.readFileSync(IMG_FOLDER + '/' + imgName);
          res.writeHead(200, {'Content-Type': 'image/gif' });
          res.end(img, 'binary');
        } catch (e) {
		  logger.msg('ERROR', 'Server', '', '', 'createServer', '*** Server.js > createServer - Error - ' + e);
          res.writeHead(200, {'Content-Type': 'text/plain' });
          res.end('');
        }
      } else { 
	    logger.info('*** Server.js > createServer - Image folder and image name cannot be empty');
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.end('');
      }
    } else {
	  logger.info('*** Server.js > createServer - Tenant code cannot be empty');
      res.writeHead(404, {'Content-Type': 'text/plain' });
      res.end('');      
    }
  } else {
    logger.info('*** Server.js > createServer - URL does not contain /images');
    res.writeHead(404, {'Content-Type': 'text/plain' });
    res.end('');
  }
}).listen(port, host);

console.log('Server running at http://' + host + ':' + port + '/');

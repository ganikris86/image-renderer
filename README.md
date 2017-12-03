# A node application to render the images

### Pre-requisite
1. Install Node.js 	(Version 8.1.3)

### About this application
1. This simple application acts as an image renderer for multiple tenants
2. The application host, port, image folder can be configured in the config.json file
3. File 'settingsTenantFacebook.json' contains the TENANT_CODE and IMAGE_FOLDER_PATH which should be configured
4. You can add multiple tenants by placing more tenant files like 'settingsTenantInstagram.json'
5. Following commands can be used to start/stop/restart the image renderer (Note: command should be executed in the deployment folder)
  a. Start the image renderer - "npm run startImageRenderer
  b. Stop the image renderer - "npm run stopImageRenderer"
  c. Restart the image renderer - "npm run restartImageRenderer"
6. Once the server is started, images can be rendered with a URL like below,
  <hostname>:<port>/<TENANT_CODE>/images?img=<IMAGE_NAME>
  Example URL: http://localhost:8001/Facebook/images?img=P1040148.JPG

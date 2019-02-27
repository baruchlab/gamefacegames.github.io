template = `
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="Bernie Sanders Election UK Telekommunisten GameFace Games" >
    <meta name="description" content="Put On Your Sanders Face Badge">
    <!--FACEBOOK-->
    <meta property="og:title" content="Put On Your Sanders Face" >
    <meta property="og:site_name" content="bernieface">
    <meta property="og:url" content="https://bernie.gameface.games" >
    <meta property="og:description" content="Put On Your Sanders Face" >
    <meta property="og:image" content="" >
    <meta property="fb:app_id" content="" >
    <meta property="og:type" content="website" >
    <meta property="og:locale" content="en_UK" >
    </head>
    <body>
      <img src={dataUrl}></img>
      <a href="https:bernieface.surge.sh">Put on your Bernie Face!</a>
    </body>
  </html>
`

var Evaporate = require('./evaporate.js')
var crypto = require('crypto')

var config = {
     signerUrl: '',
     aws_key: '',
     bucket: '',
     cloudfront: true,
     computeContentMd5: true,
     cryptoMd5Method: function (data) { return crypto.createHash('md5').update(data).digest('base64'); }
};

return Evaporate.create(config)
    .then(function (evaporate) {

      var file = new File([""], "file_object_to_upload"),
          addConfig = {
            name: file.name,
            file: file,
            progress: function (progressValue) { console.log('Progress', progressValue); },
            complete: function (_xhr, awsKey) { console.log('Complete!'); },
          },
          overrides = {
            bucket: AWS_BUCKET // Shows that the bucket can be changed per
          };
      evaporate.add(addConfig, overrrides)
          .then(function (awsObjectKey) {
                console.log('File successfully uploaded to:', awsObjectKey);
              },
              function (reason) {
                console.log('File did not upload sucessfully:', reason);
              });
    });



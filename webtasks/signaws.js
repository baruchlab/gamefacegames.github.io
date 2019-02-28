module.exports = function (context, cb) {
  var crypto = require('crypto')
  var secret = context.secrets.amazon
  var expire = new Date(new Date().getTime() + 1000 * 60 * 3).toISOString()
  var filename = 'gameface_' +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        '.jpg'
  var policy = {
    'expiration': expire,
    'conditions': [
      {'acl': 'public-read'},
      {'bucket': 'gamefacegames'},
      ['starts-with', '$key', filename],
      ['starts-with', '$Content-Type', 'image/jpeg'],
      ['content-length-range', 6400, 204800]
    ]
  }
  var encoded = Buffer.from(JSON.stringify(policy)).toString('base64')
  var signature = crypto.createHmac('sha1', secret)
    .update(encoded)
    .digest('base64')
  cb(null, [signature, encoded, filename])
}

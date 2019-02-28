var graph = require('fbgraph')
var request = require('request')

module.exports = function (context, cb) {
  var pageid = '1923190497951381'
  var token = context.secrets.fb
  var slogan = context.query.slogan
  var filename = context.query.filename
  var auth = context.query.auth
  if (filename && slogan && auth) {
    var url = 'http://s3.amazonaws.com/gamefacegames/' + filename
    console.log(url)
    request(url, {method: 'HEAD'}, function (err, res, body) {
      if (!err && res.statusCode === 200) {
        graph.setAccessToken(token)
        graph.post(pageid + '/photos', {
          caption: slogan + ': Put On Your Bernie Face! Share and promote #bernieface @putonyourbernieface VOLUNTEER FOR BERNIE https://act.berniesanders.com/signup/volunteer/ ',
          url: 'http://s3.amazonaws.com/gamefacegames/' + filename
        }, function (err, res) {
          if (!err) {
            console.log('posted')
            graph.get(res.id + '?fields=link', function (err, res) {
              if (!err) {
                cb(null, res)
              } else {
                cb(null, 'NOGET')
              }
            })
          } else {
            console.log('post failed', err)
            cb(null, 'NOPOST')
          }
        })
      } else {
        cb(null, 'NOHEAD')
      }
    })
  } else {
    cb(null, 'INCOMPLETE')
  }
}

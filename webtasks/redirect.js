module.exports = function (context, req, res) {
  var url = 'https://gameface.games'
  var content = '#gamefacegames'
  res.writeHead(302, {
    'Location': url,
    'Content-Length': content.length,
    'Content-Type': 'text/plain'
  })
  res.end(content)
}

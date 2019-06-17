;(function() {
  function sortOrder (arr) {
    var sorted = arr.sort(function(a, b) {
      return a[1] - b[1]
    }).reverse()
    
    var ordered = []
    for (var i = 0;i < sorted.length;i++) {
      if (sorted[i][0]) ordered.push(sorted[i][0])
        else ordered.push(null)
    }
    return ordered
  }

  window.FACESCORE = function (target_emotion, player_emotion) {

    function syn (emotion) {
      var synonyms = {}

      synonyms['happy'] = 'entertained'
      synonyms['sad'] = 'concerned'
      synonyms['angry'] = 'determined'
      synonyms['disgusted'] = 'bemused'
      synonyms['fear'] = 'suspicious'
      synonyms['surprised'] = 'amazed'

      return synonyms[emotion]
    }

    const t = sortOrder(target_emotion)
    const p = sortOrder(player_emotion)
    let s = 100
    let m = null

    if (t[0] != p[0]) {
      s = s - 41 
      m = 'A little more ' + syn(t[0])
    }
    if (t[1] != p[1]) {
      s = s - 12
      if (!m) m = 'A little less ' + syn(p[1])
    }
    if (t[2] != p[2]) {
      if (!m) m = 'A little more ' + syn(t[2])
      s = s - 9 
    }
    if (t[3] != p[3]) {
      s = s - 7
    }
    if (t[4] != p[4]) {
      s = s - 11
    }
    if (t[5] != p[5]) {
      if (!m) m = 'A little more ' + syn(p[5])
    }


    if (s == 100) {
      m = "Good"
      console.log('good', JSON.stringify(player_emotion))
    } else {
      if (!m) m = "Try to feel what Jagmeet is feeling!"
    }
    //console.log('scoring')
    //console.log('target', t)
    //console.log('player', p)
    //console.log('score', s,m)
    return { score:s, message:m }
  }
}())

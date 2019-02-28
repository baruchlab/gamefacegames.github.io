<badge>
  <canvas class="w-100 mv4" ref="badge" width="800" height="460" show={ opts.score > 0 }></canvas>
  <div class="mv3" show={ opts.score == 0 }>
    <img src="imgs/sandersface.gif">
    <p class="lh-copy f3 measure tl">You only got 0% Bernie. Don&rsquo;t give up! Make sure you have good lighting and try again. Keep your head a bit still.</p>
  </div>
  <canvas ref="scratch" width="400" height="300" show={ false }></canvas>
  <div show={ loading }>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div show={ !loading }>
    <div>
      <a href="#" class="f5 fw3 w5 ttu tc link ph3 pv2 mb2 dib white hover-bg-blue bg-dark-blue" onClick={ post } show={ opts.score > 0 }>Post to Facebook</a>
      <a class="f5 fw3 w5 ttu tc link ph3 pv2 mb2 dib white hover-bg-blue bg-orange" ref="download" download="bernieface.jpg" href={ dataUrl } show={ opts.score > 0 } disabled={ state != READY } >Download</a>
      <a href="#" class="f5 fw3 w5 ttu tc link ph3 pv2 mb2 dib white hover-bg-blue bg-green" onClick={ replay }>Play Again</a>
      <a href="https://act.berniesanders.com/signup/volunteer/" class="f5 fw3 w5 ttu tc link ph3 pv2 mb2 dib white hover-bg-blue bg-yellow">Volunteer for Bernie</a>
    </div>
    <div>
      <p class="lh-copy f3 measure mh3" show={ opts.score > 0 }>Share Your Bernie Face With Your Friends!</p>
    </div>
    <div class="f4 mv4" show={ opts.score > 0 }>
        <label class="db">
          <input ref="postToPage" name="post" type="radio" checked>
          Post publicly to the Put On Your Bernie Face page when I post to Facebook
        </label>
        <label class="db">
          <input name="post" type="radio">
          Only post on my own timeline when I post to Facebook
        </label>
    </div>
  </div>
  <p class="lh-copy f3 measure mh3 tl" show={ opts.score == 0 }>Common sources of difficulties are low lighting conditions, busy backgrounds, tape over camera, denied camera persions, or other apps or browser windows using your camera. Desktop browsers work much better than mobile, so if you&rsquo;re on your phone, try again when your on your computer.</p>

  <style>
    .spinner {
      margin: 100px auto;
      width: 50px;
      height: 40px;
      text-align: center;
      font-size: 10px;
    }

    .spinner > div {
      background-color: yellow;
      height: 100%;
      width: 6px;
      display: inline-block;
      
      -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .spinner .rect3 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    .spinner .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .spinner .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }

    @-webkit-keyframes sk-stretchdelay {
      0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
      20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes sk-stretchdelay {
      0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }
    .c-button:disabled {
      color: lightgrey;
    }
  </style>

  this.DRAWING = Symbol()
  this.READY = Symbol()

  this.state = this.DRAWING

  drawScratch () {
    console.log('badge', opts.player)
    const scratch = this.refs.scratch.getContext('2d')
    scratch.scale(-1, 1)
    scratch.drawImage(opts.player, 0, 0, -400, 300)
  }

  drawBadge () {
    const badgeCanvas = this.refs.badge
    const scratchCanvas = this.refs.scratch

    function prepareBadge () {
      return new Promise((resolve) => {
        this.state = this.DRAWING
        const badge = badgeCanvas.getContext('2d')
        badge.fillStyle = '#0070CC'
        badge.fillRect(0,0,800,460)
        resolve()
      })
    }

    function drawSlogan () {
      console.log('draw slogan')
      const badge = badgeCanvas.getContext('2d')
      const slogan = document.createElement('canvas')
      slogan.width = 780
      slogan.height = 90
      const sloganctx = slogan.getContext('2d')
      sloganctx.fillStyle = '#FFFFFF'
      console.log('slogan', opts.slogan)
      CanvasTextWrapper(slogan, opts.slogan, {
        font: "24pt 'Cabin', sans-serif",
        sizeToFill: false,
        maxFontSizeToFill: false,
        lineHeight: 2,
        allowNewLine: true,
        lineBreak: 'auto',
        textAlign: 'center',
        verticalAlign: 'top',
        justifyLines: false,
        paddingX: 4,
        paddingY: 8,
        fitParent: false,
        strokeText: false,
        renderHDPI: true,
        textDecoration: 'none'
      })
      const sloganImg = new Image(780, 90)
      sloganImg.src = slogan.toDataURL('image/png')
      return new Promise((resolve) => {
        sloganImg.onload = () => {
          console.log('prepare badge')
          badge.drawImage(sloganImg, 10, 10, 780, 90)
          resolve()
        }
      })
    }

    function drawText () {
      console.log('draw text')
      return new Promise((resolve) => {
        const badge = badgeCanvas.getContext('2d')
        badge.font = "32pt 'Cabin', sans-serif"
        badge.fillStyle = 'white'
        badge.fillText('PUT ON YOUR BERNIE FACE!', 130, 430)
        resolve()
      })
    }

    function drawUrl () {
      console.log('draw url')
      return new Promise((resolve) => {
        const badge = badgeCanvas.getContext('2d')
        badge.font = "12pt 'Cabin', sans-serif"
        badge.fillStyle = 'white'
        badge.fillText('https://telekommunisten.net/bernieface', 280, 455)
        resolve()
      })
    }

    function drawFace () {
      const badge = badgeCanvas.getContext('2d')
      const face = new Image()
      face.src = opts.face
      return new Promise((resolve) => {
        const badge = badgeCanvas.getContext('2d')
        face.onload = () => {
          badge.drawImage(face, 400, 90)
          resolve()
        }
      })
    }

    function drawPlayer () {
      const playerImg = new Image()
      playerImg.src = scratchCanvas.toDataURL('image/jpeg')
      return new Promise((resolve) => {
        const badge = badgeCanvas.getContext('2d')
        playerImg.onload = () => {
          badge.drawImage(playerImg, 0, 90)
          var t = ''.concat(opts.score,'% BERNIE!')
          badge.font = "20pt 'Cabin', sans-serif"
          badge.lineWidth  = 10
          badge.lineJoin = 'round'
          badge.strokeStyle = 'black'
          badge.strokeText(t, 110, 370)
          badge.fillStyle = 'white'
          badge.fillText(t, 110, 370)
          console.log(t)
          resolve()
        }
      })
    }

    prepareBadge()
    .then(drawSlogan)
    .then(drawText)
    .then(drawUrl)
    .then(drawFace)
    .then(drawPlayer).then(() => {
      this.dataUrl = this.refs.badge.toDataURL('image/jpeg')
      this.state = this.READY
      this.update()
    })

  }

  post () {
    this.loading = true
    console.log('uploadng to S3')

    let postToFB = (response) => {
      const data = this.refs.badge.toDataURL('image/jpeg')
      let byteString = atob(data.split(',')[1])
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], {type: 'image/jpeg'})

      const upload = new FormData()
      upload.append('acl', 'public-read')
      upload.append('AWSAccessKeyId', 'AKIAJNF3HA5CWUTAEB2Q')
      upload.append('Content-Type', 'image/jpeg')
      const s3url = 'https://s3.amazonaws.com/gamefacegames/'

      console.log('post to page', this.refs.postToPage.checked)

      fetch('https://wt-dk-trick-ca-0.sandbox.auth0-extend.com/signaws?auth=' + response.authResponse.accessToken)
      .then((data) => { return data.text() })
      .then((data) => {
        console.log('signing', data)
        var signed = JSON.parse(data)
        upload.append('signature', signed[0])
        upload.append('policy', signed[1])
        upload.append('key', signed[2])
        upload.append('file', blob)
        return new Promise((resolve) => {
          resolve(signed[2])
        })
      })
      .then((filename) => {
        console.log('post', filename)
        fetch(s3url, {
          method: 'POST',
          body: upload
        })
        .then((data) => {
          console.log('uploaded image')
          if (this.refs.postToPage.checked) {
            let query = '?slogan=' + encodeURIComponent(opts.slogan) + '&filename=' + filename
            query += '&auth=' + response.authResponse.accessToken
            fetch('https://wt-dk-trick-ca-0.sandbox.auth0-extend.com/postpage' + query)
            .then((data) => { return data.text() })
            .then((data) => {
              this.loading = false
              this.update()
              var p = JSON.parse(data)
              FB.ui({
                method: 'share',
                hashtag: '#bernieface',
                href: p.link
              }, (response) => {})
            })
          } else {
            FB.ui({
              method: 'share',
              hashtag: '#bernieface',
              href: 'http://s3.amazonaws.com/gamefacegames/' + filename
            }, (response) => {})
          }
        })
      })
    }
    FB.getLoginStatus((response) => {
      if (response.status == 'connected') {
        postToFB(response)
      } else {
        FB.login((response ) => {
          postToFB(response)
        })
      }
    })
  }

  replay () {
    opts.replay()
  }

  this.on('update', () => {
    if (!this.score || this.score !== opts.score) {
      this.drawScratch()
    }
    if (this.game && !opts.game) {
      this.drawBadge()
    }
    this.score = opts.score
    this.game = opts.game
  })
</badge>

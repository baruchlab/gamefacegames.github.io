<game>
  <div class="f3" ref="gamediv" show={ game != GAME_OVER }>
    <div>
      <h3>{ slogan }, put on your Sanders face!</h2>
      <div class="overlay-container">
        <div class="underlay">
          <player class="absolute" ref="player"></player><face ref="face" face={ face } callback={ faceLoad }></face>
        </div>
        <div class="overlay">
          <countdown ref="countdown" count={ count } tick={ tick }></countdown>
          <div class="message bernie-blue">{ message }</div>
        </div>
      </div>
    </div>
    <p><button onClick={ reload }>Reload</button></p>
    <p class="lh-copy measure ph3 tl center">Your Bernie score is not based on resemblence, but on emotion
    classification, so when you put on your Bernie Face, try to convey the same
      emotion as the picture of Bernie.</p>
    </div>
  </div>
  <badge ref="badge" game={ game != GAME_OVER } score={ score }
    slogan={ slogan } face={ face } player={ refs.player.refs.video } 
    replay={ reload } show={ game == GAME_OVER }></badge>
  <classifier classify={ classify } emotion={ emotionHandler } stop={ game != GAME_ON }></classifier>
  <style>
    .overlay-container {
      position: relative;
      width: 320px;
      height: 240px;
      margin: 0 auto;
    }
    .overlay, .underlay {
      position: absolute;
      width: 320px;
      height: 240px;
      top: 0;
      left: 0;
    }
    .overlay {
      text-align: center;
      z-index: 1;
    }
    .underlay {
      z-index: 0;
    }
    .message {
      padding: 2px;
      position: absolute;
      opacity: 50%;
      font-weight: 600;
      bottom: 4px;
      left: 4px;
      background-color: rgb(244, 244, 244, 0.25)
    }
  </style>

  this.GAME_ON = Symbol()
  this.GAME_LOADING = Symbol()
  this.GAME_OVER = Symbol()


  this.count = 10
  tick () {
    if (this.count < 7 && this.score === 100) {
      this.stop()
    }
    if (this.game == this.GAME_ON) {
      --this.count
      this.countdown.update()
    }
    if (this.count === 0) {
      this.stop()
      this.count = 10
    }
  }

  reload () {
    this.start()
  }

  targetEmotionHandler (emotion) {
    console.log('target', JSON.stringify(emotion))
    this.target_emotion = emotion
    classify = this.refs.player.refs.video
    this.emotionHandler = this.playerEmotionHandler
    this.update()
  }

  this.message = "Detecting Face, make sure your face is centered and well lit"
  playerEmotionHandler (emotion) {
    if (this.game == this.GAME_ON) {
      let facescore = window.FACESCORE(this.target_emotion, emotion)
      this.message = facescore.message
      if (facescore.score > this.score) {
        console.log(facescore)
        this.score = facescore.score
        this.update()
      }
    }
  }

  stop () {
    this.game = this.GAME_OVER
    this.update()
  }

  faceLoad () {
    this.count = 10
    this.score = 0
    this.target_emotion = []
    this.message = "Detecting Face, make sure your face is centered and well lit"
    console.log('face loaded')
    if (window.location.hash &&
        window.location.hash.substr(1) >= 0 &&
        window.location.hash.substr(1) < window.SLOGANS.length) {
      this.slogan = window.SLOGANS[parseInt(window.location.hash.substr(1))]
    } else {
      this.slogan = window.SLOGANS[Math.floor(Math.random()*window.SLOGANS.length)]
    }
    classify = this.faceCanvas
    this.emotionHandler = this.targetEmotionHandler
    this.game = this.GAME_ON
    this.update()
  }

  this.slogan = 'PUT ON YOUR SANDERS FACE!'
  start () {
    this.game = this.GAME_LOADING
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    this.face = 'faces/bernie-' + getRandomInt(0, 4) + '.jpg'
    this.faceCanvas = this.refs.face.refs.canvas
    this.countdown = this.refs.countdown
    this.count = 10
    this.refs.face.update()
  }

  this.on('mount', () => {
    this.game = this.GAME_LOADING
    //this.start()
  })
</game>

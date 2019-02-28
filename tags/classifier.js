<classifier>
  const ctrack = new clm.tracker()
  ctrack.init(pModel)
  const ec = new emotionClassifier()
  ec.init(emotionModel)
  let callback = () => {}

  getEmotion () {
    const cp = ctrack.getCurrentParameters()
    const ep = ec.predict(cp)
    let emotion = []
    if (ep) {
      for (let i = 0;i < ep.length;i++) {
        emotion.push([ep[i].emotion, ep[i].value])
      }
    }
    return emotion
  }

  onConverge() {
    opts.emotion(this.getEmotion())
    if (opts.stop || opts.classify.tagName === 'CANVAS') {
      ctrack.stop()
    }
  }

  onNotFound() {}
  

  onLost() {}
  

  this.on('update', () => {
    if (this.classify !== opts.classify) {
      console.log('clm update', pModel, '//')
      ctrack.reset()
      ctrack.start(opts.classify)
      this.classify = opts.classify
    } 
  })


  this.on('mount', () => {
    console.log('clm mount')
    document.addEventListener('clmtrackrConverged', this.onConverge, false)
    document.addEventListener('clmtrackrNotFound', this.onNotFound, false)
    document.addEventListener('clmtrackrLost', this.onLost, false)
  })

  this.on('unmount', () => {
    ctrack.stop()
    document.removeEventListener('clmtrackrIteration', this.onConverge, false)
    document.removeEventListener('clmtrackrNotFound', this.onNotFound, false)
    document.removeEventListener('clmtrackrLost', this.onLost, false)
  })
</classifier>

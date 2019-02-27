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

  this.on('update', () => {
    if (this.classify !== opts.classify) {
      ctrack.reset()
      ctrack.start(opts.classify)
      this.classify = opts.classify
    } 
  })

  this.on('mount', () => {
    document.addEventListener('clmtrackrConverged', this.onConverge, false)
  })

  this.on('unmount', () => {
    ctrack.stop()
    document.removeEventListener('clmtrackrConverged', this.onConverge, false)
  })
</classifier>

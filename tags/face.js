<face>
  <canvas class="bg-white" ref="canvas" width="320" height="240"></canvas>

  this.on('update', () => {
    if (this.face !== opts.face) {
      console.log('face', opts.face)
      const cc = this.refs.canvas.getContext('2d')
      const img = new Image()
      img.src = opts.face
      img.onload = () => {
        cc.drawImage(img, 0, 0, 320, 240)
        this.face = opts.face
        if (opts.callback) opts.callback()
      }
    }
  })
</face>

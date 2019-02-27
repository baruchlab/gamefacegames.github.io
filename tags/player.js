<player>
  <video class="bg-white" ref="video" width="96" height="72" autoplay></video>
  <style>
    video {
        -moz-transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        transform: scale(-1, 1);
    }
  </style>

  this.on('mount', () => {
    const video = this.refs.video
    video.onloadedmetadata = () => {
      video.play().catch((err) => {
        video.setAttribute("controls","controls")
      })
    }
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream
    })
  })
</player>

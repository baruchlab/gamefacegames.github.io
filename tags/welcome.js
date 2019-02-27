<welcome>
  <h1 class="f1 fw9 ttc">Put on your Bernie face!</h1>
  <img class="dn di-l mb4" src="imgs/banner.gif">
  <div class="dn di-l">
  <div show={ !facebook() }>
    <a href="#" class="f4 fw3 w5 ttu tc link br2 ph3 pv2 mb2 dib white hover-bg-blue bg-orange" href="https://www.facebook.com/sandersface/app/459401351061135/">Play on Facebook</a>
    <a href="#" class="f4 fw3 w5 ttu tc link br2 ph3 pv2 mb2 dib white hover-bg-blue bg-green" onClick={ start }>Play on website</a>
    </a>
  </div>
  </div>
  <div show={ facebook() }>
    <a class="f4 fw3 w5 ttu tc link br2 ph3 pv2 mb2 dib white hover-bg-blue bg-green" onClick={ start }>Play Now!</a>
    </a>
  </div>
    <h2 class="lh-copy ma4">
      The game you play by feeling what Bernie is feeling!
    </h2>
    <p class="lh-copy measure f4 f3-m center ph4 pb3 tl">
      <span class="fw9 i">Put on your Bernie face</span> is a game you play
by trying to convey the same emotions as Bernie is expressing in a picture. The
game works with emotional classifcation, so it doesn't matter if you look like
Bernie.  Regardless of your age, gender or heritage, you can score 100% bernie
if can feel what Benie is feeling.
    </p>
    <p class="dn-ns">
    <a href="#" class="f4 fw3 w5 ttu tc link br2 ph3 pv2 mb2 dib white hover-bg-blue bg-green" onClick={ start }>Play Now!</a>
    </p>

  start () {
    console.log('start game')
    riot.mount('#app', 'game')
  }

  facebook () {
    let facebookapp = true
    try {
      console.log('hostname', window.parent.location.hostname)
      facebookapp = false
    } catch (e) {
      facebookapp = true
    }
    return facebookapp
  }

</welcome>


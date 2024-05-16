if (process.env.GTM_ID) {
  ;(function (w, d, s, i) {
    var f = d.getElementsByTagName(s)[0]
    var j = d.createElement(s)
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i
    f.parentNode.insertBefore(j, f)

    w.dataLayer = w.dataLayer || []
    function gtag() {
      w.dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', i)
  })(window, document, 'script', process.env.GTM_ID)
}
if (process.env.ADOBE_LAUNCH_SCRIPT_URL) {
  ;(function (w, d, s, i) {
    const l = d.createElement(s)
    l.async = true
    l.src = i
    l.type = 'text/javascript'
    d.head.append(l)
  })(window, document, 'script', process.env.ADOBE_LAUNCH_SCRIPT_URL)
}

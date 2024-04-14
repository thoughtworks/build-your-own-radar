if (process.env.GTM_ID) {
  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'analytics.js' })
    var f = d.getElementsByTagName(s)[0]
    var j = d.createElement(s)
    var dl = l !== 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', process.env.GTM_ID)
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

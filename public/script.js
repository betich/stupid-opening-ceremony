function _endpoint() {
  // hack to detect if deployment or development environment
  const protocol = location.protocol.startsWith("https") ? "wss" : "ws"
  const url = protocol + "://" + location.host + "/ws"
  return url
}

const ws = new WebSocket(_endpoint())

ws.onmessage = function (msg) {
  const { i, max } = JSON.parse(msg.data)

  const astrokun = document.getElementsByClassName("astro")[0]

  const progressbar = document.getElementsByClassName("progress-percent")[0]
  const progressslash = document.getElementsByClassName("progress-slash")[0]

  if (i/max >= 1) {
    window.location.reload();
  }

  astrokun.style.transform = `translateX(calc(${(i * 100) / max}vw - 110px)) rotate(${Math.round(((i * 360) / max) * 4)}deg)`

  progressbar.innerHTML = `${~~((i * 100) / max)}%`
  progressslash.innerHTML = `${i}/${max}`

  return false
}

ws.onopen = function(){
  const astrokun = document.getElementsByClassName("astro")[0]

  astrokun.style.opacity = "1"
}
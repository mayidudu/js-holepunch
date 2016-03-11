const net = require('net')

var waiting = {}

var handlers = {}

handlers['listen'] = function (c, args) {
  waiting[args] = {host: c.remoteAddress, port: c.remotePort, conn: c}
}

handlers['connect'] = function (c, args) {
  if (waiting[args]) {
    var key = {host: waiting[args].host, port: waiting[args].port}
    c.end('connection::'+JSON.stringify(key))
    
    var s = waiting[args].conn
    var serv = JSON.stringify({host: s.remoteAddress, port: s.remotePort})
    waiting[args].conn.write('start::'+serv)
    waiting[args].conn.end()
    delete waiting[args]
  } else {
    c.write('ERR::not there')
  }
}

const server = net.createServer((c) => {

  c.on('data', (d) => {
    segs = d.toString().split('::')
    cmd = segs[0]
    if (handlers[cmd]) {
      handlers[cmd](c, d.toString().slice(cmd.length + 2))
    } else {
      console.log(d.toString())
      c.end('ERR::not recognized')
    }
  })
})

server.listen(process.env.PORT)

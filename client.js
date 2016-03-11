const net = require('net')

var direct
var server

// Register listeners for peer connections
function register(conn) {
  conn.on('data', (d) => {
    console.log(d.toString()) 
  })
  conn.write('greet!!!')
}

var holepuncher = net.createConnection({
  host: process.argv[2]
, port: process.argv[3]
})

// on response from the server
holepuncher.on('data', (d) => {
 
  data = d.toString()
  cmd = data.split('::')[0]
  rest = data.slice(cmd.length+2)
  
  if (cmd == 'ERR') {
    console.log('err: ' + rest)
    holepuncher.end()
  } else if (cmd == 'connection') {
    // wait and create connection to peer received
    var peer = JSON.parse(rest)
    console.log('connection: ' + peer)
    setTimeout(() => {
      direct = net.createConnection(peer)
      register(direct)
    }, 3000)
  } else if (cmd == 'start') {
    // start a server on same socket as before
    var opts = JSON.parse(rest)
    console.log(opts)
    setTimeout(() => {
      server = net.createServer(opts, function (conn) {
        register(conn)
        conn.write('greet to you toooo')
      }).listen(opts.port, () => {
        console.log('listening')
      })
    }, 2000)
  } else {
    console.log(data)
  }
})

holepuncher.on('end', () => {
  console.log('ended with hole puncher')
})

// send initial command (either listen or connect)
holepuncher.write(process.argv[4] + '::' + process.argv[5])

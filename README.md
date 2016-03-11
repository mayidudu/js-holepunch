# js-holepunch
proof of concept TCP hole-punching server

## what
try and broker a connection between two computers behind NATs 

## why
p2p

## how
 - create a connection to a server
 - hold the connection open waiting for a peer
 - once a peer connects: 
    - have the server send your host and port details to them
    - have the server tell you to start a server on the same socket
    - start a server on that socket
    - have peer connect to that socket

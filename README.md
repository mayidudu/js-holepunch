# js-holepunch
proof of concept TCP hole-punching server

## what
try and broker a connection between two computers behind NATs 

## why
p2p

## protocol
```listen::<identifier>``` - wait for peer to connect with <identifier>   
```connect::<identifier>``` - connect to any peer listening on <identifier>   
```err::<error message>``` - error   
```connection::<config to create connection with>``` - create a tcp connection to the address provided   
```start::<server config to start server on>``` - start a tcp server on the address provided   

## how
 - create a connection to a server
 - hold the connection open waiting for a peer
 - once a peer connects: 
    - have the server send your host and port details to them
    - have the server tell you to start a server on the same socket
    - start a server on that socket
    - have peer connect to that socket

# shell-client
Communicate to the Synxbios via Synx commands

# Installation
* Download RingoJs http://ringojs.org/download/
* Add Ringo to path


# Usage

* Cd into this directory.
* ringo
* var synx = require('./synx-shell');
* var ls = synx.login('http://dev.synxbios.com/synx','<username>','<password>');
** Warning: The above url is yet not available.
* synx.ls()
  [ 'altranName',
    'OsloAirport',
    'Paal',
    'BardLind',
    'SynxDemo' ]
  >>

# Debug

* ringo -d


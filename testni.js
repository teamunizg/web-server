var serialPort = require('./server/adapter/SerialAdapter.js');
var dbBuilder = require('./server/db/dbBuilder');

dbBuilder.createDatabase();


serialPort.init(function(){
    serialPort.send("NodeReport#");
});






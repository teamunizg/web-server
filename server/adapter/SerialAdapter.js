var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = 'COM9';
var _baudrate = 115200;
var separator = "\n";

var nodeParser = require('../parsers/NodeParser');
var measurementParser = require('../parsers/MeasurementParser');
var hubStatusParser = require('../parsers/HubStatusParser');
var eventParser = require('../parsers/EventParser');

var nodeDataService = require('../services/data/NodeDataService');

var persist = require('../services/Persist');

var _sp;

exports.init = function(callback) {
    var sp = new SerialPort(port, {
        baudrate: _baudrate,
        parser: serialport.parsers.readline(separator),
        buffersize : 512
    },true);

    sp.on('open',function(){
        callback();
    });

    _sp = sp;

    var nodes = [];
    var i = 0;

    sp.on('data', function(data) {
        var data = ""+data;
        console.log("UART: " + data);
        var string = data.split(']');

        if(string[0] == '[Table') {
            console.log("Odgovor je [Table]");

            // [Table] Number: 0, Address: 0x0, Type: 0, Identifier: 'nRF Hub', Location: [0-0-0] mm, Interval: 0 sec , Last Response: -1 sec, , TxPower: 0, Pending requests:  None

            var params = (string[1] + ']' + string[2]).split(',');
            nodeParser.parseNode(params, function (node) {
                i++;
                nodes.push([node.Address, node.NodeName, node.Location, node.TypeId, node.IntervalSeconds, node.TxPower, node.PendingRequests, node.MeasurementsCount]);
            });
            // tmp dok ne stave EndTable labelu
            if (i == 2) {
                console.log("upisujem u bazu");
                nodeDataService.bulkInsertOrReplace(nodes, function () {
                    console.log('Node upisan u bazu');
                    nodes = [];
                    i = 0;
                }, function () {
                    console.log('Node nije upisan u bazu');
                    nodes = [];
                    i = 0;
                });
            }
        } else if(string[0] == '[EndTable'){
            persist.persistNode(nodes,function(){
                console.log('Node upisan u bazu');
                nodes = [];
            },function(){
                console.log('Node nije upisan u bazu');
                nodes = [];
            });
            // perisist nodes
        } else if(string[0] == '[Status'){
            console.log("Odgovor je [Status]");

            var params = string[1].split(',');
            hubStatusParser.parseStatus(params, function(status){
                persist.persistHubStatus(status, function(){
                    console.log("status upisan u bazu");
                },function(error){
                    console.log("status nije upisan u bazu");
                });
            });

        } else if(string[0] == '[Measurement'){
            console.log("Odgovor je [Measurement]");
            var params = string[1].split(' ');
            measurementParser.parseMeasurement(params, function(measurement){
                persist.perisistMeasurements(measurement,function(){
                    console.log("Mjerenje upisano");
                }, function(){
                    console.log("Greska u upisivanju mjerenja");
                });
            });

        } else if(string[0] == '[Return'){

        } else if(string[0] == '[Event'){

        }

    });

};

var send =  function(data){
    console.log("saljem serija: " + data);
    if(!_sp)
        console.log("sp == NULL");

    if(_sp){
        _sp.write(data,function(err,results){
            if(err)
                console.log("err " + err);
            else
                console.log("results " + results);
        });
    }
};

exports.send = send;
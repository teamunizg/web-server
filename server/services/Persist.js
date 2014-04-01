/**
 * Created by Matej on 31.3.2014..
 */

//var nodeDataService = require('./data/NodeDataService');
var hubDataService = require('./data/HubDataService');
var measurementsDataService = require('./data/MeasurementDataService');
var sensorsDataService = require('./data/SensorDataService');
var sensorMeasurementsDataService = require('./data/SensorMeasurementDataService');

exports.persistNode = function(nodes,onSucces,onError){
    console.log("upisujem node u bazu");
    nodeDataService.bulkInsertOrReplace(nodes, onSucces, onError);
};

exports.persistHubStatus = function(node,onSuccess, onError){
    console.log("upisujem node u bazu");
    hubDataService.insertHubStatus(status, onSuccess, onError);
};

exports.perisistMeasurements = function(measurement,onSuccess, onError){
    var timestamp = new Date().getTime();
    measurementsDataService.insertMeasurement([measurement.Address, measurement.BatteryPercentage, timestamp],
        function (insertedId) {
            sensorsDataService.getByAddress(measurement.Address,
                function (sensors) {
                    var sensorMeasurements = [];
                    sensors.forEach(function (s) {
                        if (undefined != s.MeasurementsOrder && s.MeasurementsOrder < measurement.Values.length) {
                            var smValue = measurement.Values[s.MeasurementsOrder]
                            if (s.ScaleFactor && (s.ScaleFactor > 0 || s.ScaleFactor < 0)) {
                                smValue *= s.ScaleFactor;
                            }
                            var sm = [s.SensorId, insertedId, smValue, timestamp];
                            sensorMeasurements.push(sm);
                        } else {
                            console.log('Sensor with id : ' + s.SensorId + "has invalid MeasurementOrder");
                            onError();
                        }
                    });
                    sensorMeasurementsDataService.bulkInsert(sensorMeasurements, function () {
                        console.log("END: " + new Date().getTime());
                    });
                }, function () {
                    if(onError)
                        onError();
                });
        }, function (error) {
            if(onError)
                onError();
        });
};


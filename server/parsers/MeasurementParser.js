exports.parseMeasurement = function(params, onSuccess, onError) {

    //[Measurement] Node: 0x30 Data: 02,00,00,00,00,3f,1f,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,7d,01,00,00

    var measurement = {};
    var values = [];

    measurement['Address'] = parseInt(params[2],16);

    data = params[4].split(',');

    for(var i=0; i<data.length;i++){
        if(data[i].length == 1)
            data[i] = "0" + data[i];
    }

    measurement['BatteryPercentage'] = parseInt(data[4]+data[3]+data[2]+data[1],16);

    values.push(parseInt(data[8]+data[7]+data[6]+data[5],16));
    values.push(parseInt(data[12]+data[11]+data[10]+data[9],16));
    values.push(parseInt(data[16]+data[15]+data[14]+data[13],16));
    values.push(parseInt(data[20]+data[19]+data[18]+data[17],16));
    values.push(parseInt(data[24]+data[23]+data[22]+data[21],16));
    values.push(parseInt(data[28]+data[27]+data[26]+data[25],16));

    measurement['Values'] = values;

    onSuccess(measurement);


};
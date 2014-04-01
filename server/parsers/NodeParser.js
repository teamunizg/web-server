exports.parseNode = function (params, onSuccess, onError) {

    var node = {};

    var param = params[1].split(':');
    node['Address'] = parseInt(param[1],16);
    param = params[2].split(':');
    node['TypeId'] = parseInt(param[1]);
    param = params[3].split(':');
    node['NodeName'] = param[1].replace(' ','').split("'").join('');  // >-- maknuti ' ' ako je ikako moguce
    // Lokacija: x,y,z
    param = params[4].split(':');
    var lokacija = param[1].split('-');
    node['Location'] = parseInt(lokacija[0].replace('[','')) + ",";
    node['Location'] += parseInt(lokacija[1]) + ",";
    node['Location'] += parseInt(lokacija[2].replace('] mm',''));
    //-------------------------------
    param = params[5].split(':');
    node['IntervalSeconds'] = parseInt(param[1].replace('sec',''));
    param = params[8].split(':');  // Fali 7 jer se u odgovoru na 8. mjestu nalazi , ,
    node['TxPower'] =parseInt(param[1]);
    param = params[9].split(':');
    node['PendingRequests'] = param[1];

    node['MeasurementsCount'] = 5; // Ovo je zasad hardkodirano

    onSuccess(node);

};
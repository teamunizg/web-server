exports.parseStatus = function (params, onSuccess, onError) {

    //[Status] Rx FIFO empty, Tx FIFO empty, Retransmitted packets: 13, Lost packets: 0, Operating frequency: 2402 MHz, Transfer speed: 2 Mbps, Output power: 0dBm, Retransmit wait time: 1750 uS, Maximum retransmit count: 6 times, Address width: 4 bytes, Configured as: Receiver, Hub status: Powered up, CRC protection: 1 byte, CE pin state: Disabled, Receive address: 0x0, Transmit address: 0x30

    var status = {
        RxFIFO : '',
        TxFIFO : '',
        RetransmittedPackets : '',
        LostPackets : '',
        OperatingFrequency : '',
        TransferSpeed : '',
        OutputPower : '',
        RWT : '',
        MRC : '',
        AdressWidth : '',
        ConfiguredAs : '',
        HubStatus : '',
        CRCProtection : '',
        CEPinState : '',
        ReceiveAdress : '',
        TransmitAdress : ''
    }

    var param = params[0].split(' ');
    status['RxFIFO'] = param[3];
    param = params[1].split(' ');
    status['TxFIFO'] = param[3];

    param = params[2].split(':');
    status['RetransmittedPackets'] = param[1];
    param = params[3].split(':');
    status['LostPackets'] = param[1];
    param = params[4].split(':');
    status['OperatingFrequency'] = param[1];
    param = params[5].split(':');
    status['TransferSpeed'] = param[1];
    param = params[6].split(':');
    status['OutputPower'] = param[1];
    param = params[7].split(':');
    status['RWT'] =  param[1];
    param = params[8].split(':');
    status['MRC'] =  param[1];
    param = params[9].split(':');
    status['AdressWidth'] =  param[1];
    param = params[10].split(':');
    status['ConfiguredAs'] =  param[1];
    param = params[11].split(':');
    status['HubStatus'] =  param[1];
    param = params[12].split(':');
    status['CRCProtection'] =  param[1];
    param = params[13].split(':');
    status['CEPinState'] =  param[1];
    param = params[14].split(':');
    status['ReceiveAdress'] =  param[1];
    param = params[15].split(':');
    status['TransmitAdress'] =  param[1];

    onSuccess(status);

};
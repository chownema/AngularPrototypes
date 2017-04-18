/**
 * device.controller.js
 * @description  Desc
 * @author Miguel Saavedra
 */
(function () {
    angular.module('system.device')
        /** 
         * DeviceController
         * @description class which used to control access, 
         *              and states to the device objects 
         */
        .factory('DeviceController', [
            'Device',
            '$log',
            '$exceptionHandler',
            'DeviceConstants',
            'Dictionary',
            function (Device, log, $exceptionHandler, DeviceConstants, Dictionary) {
                /**
                 * @class DeviceController
                 * @description Desc of Class
                 */
                var DeviceController = function () {
                    var self = this;
                    self = {
                        vDeviceDict : new Dictionary(),
                        aDeviceDict : new Dictionary(),
                        selectedVideoDevice : null,
                        selectedAudioDevice : null
                    }

                    /**
                     * @function loadDevices
                     * @description loads devices into two Device Obj type lists 
                     * @return {boolean} Loaded devices status
                     */
                    self.loadDevices = function (otDeviceList) {
                        // filterDevices into correct list
                        for (i = 0; i < otDeviceList.length; i++) {
                            // Create Device objects with their given data
                            switch (otDeviceList[i]['kind']){ // NOTE : change on opentok OTdevices will break this
                                case DeviceConstants.DEVICE_TYPE.Video:
                                    var id = otDeviceList[i]['deviceId'];
                                    self.vDeviceDict.add(id, new Device(otDeviceList[i]));
                                    break;
                                case DeviceConstants.DEVICE_TYPE.Audio:
                                    var id = otDeviceList[i]['deviceId'];
                                    self.aDeviceDict.add(id, new Device(otDeviceList[i]));
                                    break;
                            }
                        }
                        console.log(self.vDeviceDict.getData());
                        console.log(self.aDeviceDict.getData());
                        // Check if devices recieved are empty
                        if (self.vDeviceDict === null ||  self.aDeviceDict.getLength() <= 0) {
                            $exceptionHandler('ERROR DeviceController loadDevices', 
                                'Audio Devices failed to load');
                        }
                        else if(self.vDeviceDict === null || self.aDeviceDict.getLength() <= 0) {
                            $exceptionHandler('ERROR DeviceController loadDevices',
                                 'Video Devices failed to load');
                        }
                    }
                    
                    /**
                     * @function setFirstDevices
                     * @return {boolean} setFirstDevices Status
                     */
                    self.setFirstSelectedDevices = function() {
                        // Booleans Video and Audio dictionaries are initialized
                        var isVDListInit = self.vDeviceDict.getLength() > 0;
                        var isADListInit = self.aDeviceDict.getLength() > 0;

                        // Check if selected devices are are null, reset and remove it if found
                        if (self.selectedVideoDevice && isVDListInit) {
                            // Search for device and reset it
                            for (i = 0; i < self.vDeviceDict.getLength(); i++) {
                                var device = self.vDeviceDict.getValue(self.selectedVideoDevice.getDeviceID);
                                if (device) {
                                    // Reset device ensure clean state
                                    device.resetDeviceState();
                                }
                            }
                            // unacloc selected device 
                            self.selectedVideoDevice = null;
                        }

                        // Check and set video input device 
                        if (self.vDeviceList.getLength() > 0 && isVDListInit) {
                            // getID of first item in dictionary
                            var id = self.vDeviceList.getKeys()[0];
                            self.selectedVideoDevice = self.vDeviceList.getValue(id);
                        } else {
                              $exceptionHandler('DeviceController : setFirstSelectedDevices', 
                                'Failed to set init video input device');
                        }

                        // Check and set audio input device
                        if (self.aDeviceList.getLength() > 0 && isADListInit) {
                            // getID of first item in dictionary
                            var id = self.aDeviceList.getKeys()[0];
                            self.selectedAudioDevice = self.aDeviceList.getValue(id);
                        } else {
                              $exceptionHandler('DeviceController : setFirstSelectedDevices', 
                                'Failed to set init audio input device');
                        }

                    }

                    /**
                     * @function selectVideoDevice
                     * @return {boolean} selectedDevice Status
                     */
                    self.selectVideoDevice = function (DeviceID) {
                        var selectedDevice = false;
                        if (self.deviceList !== null || self.DeviceList.length > 0)
                        // Get device uninit state from deviceID
                        var device = self.deviceList;
                        // Init device and progress state
                        // If is ready, set selectedVideoDevice to this device
                        // Check if selectedDevice matches deviceID
                        // Set device to in use
                        // return status
                        return selectedDevice;
                    }

                    /**
                     * @function selectAudioDevice
                     * @return {boolean} selectedDevice Status
                     */
                    self.selectAudioDevice = function (deviceID) {
                        var selectedDevice = false;
                        // Get device uninit state from deviceID
                        // Init device and progress state
                        // If is ready, set selectedAudioDevice to this device
                        // Check if selectedDevice matches deviceID
                        // Set device to in use
                        // return status
                        return selectedDevice;
                    }

                    

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.initDeviceSelectedDevice = function () {
                        // do something useful
                    }

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.initDeviceSelectedDevice = function () {
                        // do something useful
                    }

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.initDeviceSelectedDevice = function () {
                        // do something useful
                    }

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.resetDeviceSelectedDevice = function () {
                        // do something useful
                    }


                    // TODO: add more functions to device controller
                    return self;
                };


                return DeviceController;
            }]);
})();
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
            function (Device, log, $exceptionHandler, DeviceConstants) {
                
                var self = {
                    deviceList : []
                };
                
                /**
                 * @class       DeviceController
                 * @description Desc of Class
                 * @param {int} arg arg desc
                 */
                var DeviceController = function (arg) {
                    var self = this;

                    self = {
                        vDeviceList : [],
                        aDeviceList : [],
                        selectedVideoDevice : null,
                        selectedAudioDevice : null,
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
                            switch (otDeviceList[i].type){ // NOTE : change on opentok OTdevices will break this
                                case '':
                                break;
                            }
                        }
                        
                        
                        
                        // Check if devices recieved are empty
                        if (self.deviceList === null || self.deviceList.length <= 0) {
                            $log.error('ERROR Device Controller func loadDevices:: Devices failed to load'); 
                        }
                    }

                    /**
                     * @function selectVideoDevice
                     * @return {boolean} selectedDevice Status
                     */
                    self.selectVideoDevice = function (deviceID) {
                        var selectedDevice = false;
                        if (self.deviceList !== null || self.DeviceList.length > 0)
                        // Get device uninit state from deviceID
                        var device = self.deviceList
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
                    self.initDevice = function () {
                        // do something useful
                    }

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.pauseDevice = function () {
                        // do something useful
                    }

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.resumeDevice = function () {
                        // do something useful
                    }

                    // TODO: add more functions to device controller
                    return self;
                };


                return DeviceController;
            }]);
})();
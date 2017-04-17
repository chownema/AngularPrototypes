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
            function (Device, log) {
                
                var self = {
                    deviceList : []
                }

                /**
                 * @class       DeviceController
                 * @description Desc of Class
                 * @param {int} arg arg desc
                 */
                var DeviceController = function (arg) {
                    var self = this;

                    /**
                     * @function loadDevices
                     * @description Function Desc
                     * @return {boolean} Loaded devices status
                     */
                    self.loadDevices = function (otDeviceList) {
                        // do something useful
                        self.deviceList = otDeviceList;
                        
                        // Check if devices recieved are empty
                        if (self.deviceList === null || self.deviceList.length <= 0) {
                            $log.error('ERROR Device Controller func loadDevices:: Devices failed to load'); 
                        }

                        
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
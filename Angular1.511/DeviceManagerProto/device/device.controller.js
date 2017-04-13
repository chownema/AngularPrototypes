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
            function (Device) {

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
                     */
                    self.loadDevices = function () {
                        // do something useful
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
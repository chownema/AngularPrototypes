/**
 * device.constants.js
 * @description  Holds Constants to do with device
 * @author Miguel Saavedra
 */
(function () {
    angular.module('system.device')
        /** 
         * Device.Constants
         * @description Holds Constants to do with device
         */
        .factory('DeviceConstants', [
            'Dictionary', 
            function (Dictionary) {
            var DeviceConstants = {
                DEVICE_STATE : new Dictionary(
                    {
                        Blocked: -1,
                        Uninitialized: 0,
                        Initializing: 1,
                        Ready: 2,
                        Active: 3,
                        Paused: 4
                    }
                ),
                PROGRESS_COMMANDS :{
                    BLOCKED: -1,
                    PROGRESS: 0,
                    REGRESS: 1
                },

            }
            return DeviceConstants;
        }]);
})();
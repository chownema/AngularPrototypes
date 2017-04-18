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
                // Device States enum
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
                // Device State progress commands enum
                PROGRESS_COMMANDS :{
                    BLOCKED: -1,
                    PROGRESS: 0,
                    REGRESS: 1
                },
                // Device Types enum
                DEVICE_TYPE : {
                    Audio: 'audioInput',
                    Video: 'videoInput'
                }
            }
            return DeviceConstants;
        }]);
})();
(function () {
    /**
     * device.class.js
     * @description  Creates a singleton service instance of 
     *                  Device object.
     * @author Miguel Saavedra
     */
    angular.module('system.device')
        /** 
         * Device
         * @description Creates a singleton service instance of 
         *              Device object.
         */
        .factory('Device', function () {

            // Const Enum dictionary holding device types
            const DEVICE_TYPE = {
                Audio: 'audioInput',
                Video: 'videoInput'
            };

            // Const Enum dictionary holding the device state
            // Implement Stack state algorithm 
            const DEVICE_STATE = {
                Blocked: -1,
                Uninitialized: 0,
                Initializing: 1,
                Ready: 2,
                InAppUse: 3
            };

            // Const Enum dictionary holding the device blocked states
            // Device can have one or more of these states active in one istance
            const BLOCKED_STATES = {
                Firewall: false,
                InOtherAppUse: false,
                PermissionsNotGiven: false,
                PermissionDenied: false
            };

            /**
             * @class                     Device
             * @description               Class to hold a device object
             * @param {string} dID        device Unique ID
             * @param {string} dLabel     device label or name
             * @param {DEVICE_TYPE} dKind kind of device input
             */
            var Device = function (dID, dLabel, dKind) {
                var self = this;

                // Init properties of the device object
                var properties = {
                    deviceId: dID,
                    label: dLabel,
                    kind: dKind,
                    state: DEVICE_STATE.Uninitialized,
                    blockedStates: []
                };

                // Getter functions for the device object
                self.getDeviceKind = function () { return properties.kind; };
                self.getDeviceLabel = function () { return properties.label; };
                self.getDeviceID = function () { return properties.ID; };

                // Return itself
                return self;
            }

            // Return object
            return Device;


        });
})();
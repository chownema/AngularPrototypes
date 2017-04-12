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
                Active: 3,
                Paused: 4
            };

            // Const Enum dictionary holding the device progress commands
            // Used to implement commands for the stack
            const PROGRESS_COMMANDS = {
                Blocked : -1,
                Progress : 0,
                Regress : 1
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

                // Init const properties of the device object
                const cProperties = {
                    deviceId: dID,
                    label: dLabel,
                    kind: dKind
                };
                
                // Init nonConst properties of the device object
                var properties = {
                    state: DEVICE_STATE.Uninitialized,
                    blockedStates: []
                };

                /**
                 * @function    shiftDeviceState
                 * @description Implements a state sequence where all states can 
                 *              go to the blocked state but cannot regress (i.e. 
                 *              uninit !<- init) directly. The only states that can 
                 *              progress and regress directly between each other is 
                 *              the Active <-> Pause states.
                 * @param       {PROGRESS_COMMANDS} ProgressCmd indicates how to progress
                 *              the devices state
                 */
                self.shiftDeviceState = function(ProgressCmd) {
                    // Check what progress commmand is given
                    switch (ProgressCmd) {
                        case PROGRESS_COMMANDS.Progress:
                            // Check if can progress
                            if(properties.state > )
                            break;
                        
                        case PROGRESS_COMMANDS.Regress:
                            // Check if can regress
                            break;
                        
                        case PROGRESS_COMMANDS.Blocked:
                            // Check if can be blocked
                            break;
                        
                    }
                }

                // Getter functions for the device object
                self.getDeviceKind = function () { return cProperties.kind; };
                self.getDeviceLabel = function () { return cProperties.label; };
                self.getDeviceID = function () { return cProperties.ID; };
                self.getBlockedStates = function () { return properties.blockedStates; };
                self.getDeviceState = function () { return properties.state; };
                self.isDeviceBlocked = function () { return properties.blockedStates.length > 0 ? true : false; };

                // Return itself
                return self;
            }

            // Return object
            return Device;
        });
})();
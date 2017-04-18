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
        .factory('Device', ['Dictionary', function (Dictionary) {

            // Const Enum dictionary holding device types
            const DEVICE_TYPE = {
                Audio: 'audioInput',
                Video: 'videoInput'
            };

            const DEVICE_STATE = new Dictionary(
                {
                    Blocked: -1,
                    Uninitialized: 0,
                    Initializing: 1,
                    Ready: 2,
                    Active: 3,
                    Paused: 4
                }
            );

            // Const Enum dictionary holding the device progress commands
            // Used to implement commands for the stack
            const PROGRESS_COMMANDS = {
                BLOCKED: -1,
                PROGRESS: 0,
                REGRESS: 1
            };

            // Const Enum dictionary holding the device blocked states
            // Device can have one or more of these states active in one istance
            const BLOCKED_STATES = {
                Firewall: false, // case 1554
                InOtherAppUse: false,
                PermissionsNotGiven: false,
                PermissionDenied: false // case 1500
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
                    ID: dID,
                    label: dLabel,
                    kind: dKind
                };

                // Init nonConst properties of the device object
                var properties = {
                    state: DEVICE_STATE.getValue('Uninitialized'),
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
                function shiftDeviceState (ProgressCmd) {
                    // Check what progress commmand is given
                    switch (ProgressCmd) {
                        case PROGRESS_COMMANDS.PROGRESS:
                            // Check if can progress
                            if (properties.state < DEVICE_STATE.getValue('Paused'))
                                // Iterate to the next available state
                                properties.state = properties.state + 1;
                            break;

                        case PROGRESS_COMMANDS.REGRESS:
                            // Check if can regress
                            if (properties.state > DEVICE_STATE.getValue('Uninitialized'))
                                // Iterate to the next available state
                                properties.state = properties.state - 1;
                            break;

                        case PROGRESS_COMMANDS.BLOCKED:
                            // Check if can be blocked
                            if (properties.state !== DEVICE_STATE.getValue('Blocked'))
                                // Move to blocked state
                                properties.state = DEVICE_STATE.getValue('Blocked');
                            break;
                    }
                }

                // Getter functions for the device object
                self.getDeviceKind = function () { return cProperties.kind; };
                self.getDeviceLabel = function () { return cProperties.label; };
                self.getDeviceID = function () { return cProperties.ID; };
                self.getBlockedStates = function () { return properties.blockedStates; };
                self.getDeviceState = function () { return DEVICE_STATE.getKeyByValue(properties.state); };
                self.isDeviceBlocked = function () { return properties.blockedStates.length > 0 ? true : false; };
                // Setter functions for the device object
                self.progressDeviceState = function () { shiftDeviceState(PROGRESS_COMMANDS.PROGRESS); };
                self.regressDeviceState = function () { shiftDeviceState(PROGRESS_COMMANDS.REGRESS); };
                self.blockDeviceState = function () { shiftDeviceState(PROGRESS_COMMANDS.BLOCK); };
                

                // Return itself
                return self;
            };

            // Return object
            return Device;
        }]);
})();
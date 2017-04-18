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
        .factory('Device', [
            'Dictionary', 
            'DeviceConstants',
             function (Dictionary, DeviceConstants) {

            /**
             * @class                     Device
             * @description               Class to hold a device object
             * @param {string} dID        device Unique ID
             * @param {string} dLabel     device label or name
             * @param {DEVICE_TYPE} dKind kind of device input inside DeviceController
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
                    state: DeviceConstants.DEVICE_STATE.getValue('Uninitialized'),
                    blockedStates: new Dictionary(
                        { // Device can have one or more of these states active in one istance
                            Firewall: false, /*case 1554*/
                            InOtherAppUse: false,
                            PermissionsNotGiven: false,
                            PermissionDenied: false /*PermissionDenied*/
                        }
                    )
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
                        case DeviceConstants.PROGRESS_COMMANDS.PROGRESS:
                            // Check if can progress
                            if (properties.state < DeviceConstants.DEVICE_STATE.getValue('Paused'))
                                // Iterate to the next available state
                                properties.state = properties.state + 1;
                            break;

                        case DeviceConstants.PROGRESS_COMMANDS.REGRESS:
                            // Check if can regress
                            if (properties.state > DeviceConstants.DEVICE_STATE.getValue('Uninitialized'))
                                // Iterate to the next available state
                                properties.state = properties.state - 1;
                            break;

                        case DeviceConstants.PROGRESS_COMMANDS.BLOCKED:
                            // Check if can be blocked
                            if (properties.state !== DeviceConstants.DEVICE_STATE.getValue('Blocked'))
                                // Move to blocked state
                                properties.state = DeviceConstants.DEVICE_STATE.getValue('Blocked');
                            break;
                    }
                }

                // Getter functions for the device object
                self.getDeviceKind = function () { return cProperties.kind; };
                self.getDeviceLabel = function () { return cProperties.label; };
                self.getDeviceID = function () { return cProperties.ID; };
                self.getBlockedStates = function () { return properties.blockedStates.getDictMap(); };
                self.getDeviceState = function () { return DeviceConstants.DEVICE_STATE.getKeyByValue(properties.state); };
                self.isDeviceBlocked = function () { return  properties.state === DeviceConstants.DEVICE_STATE.getValue('Blocked'); };
                
                // Setter functions for the device object
                self.resetDeviceState = function() { properties.state = 0; };
                self.progressDeviceState = function () { shiftDeviceState(DeviceConstants.PROGRESS_COMMANDS.PROGRESS); };
                self.regressDeviceState = function () { shiftDeviceState(DeviceConstants.PROGRESS_COMMANDS.REGRESS); };
                
                // Blocking state functions
                self.blockDeviceState = function (blockedStatesIssued) {
                    // Set some blocked states to true
                    var bsKeys = properties.blockedStates.getKeys();
                    for (i = 0; i < bsKeys.length; i++) {
                        for (j = 0; j < blockedStatesIssued.length; j++) {
                            if (bsKeys[i] === blockedStatesIssued[j]) {
                                // Set value at device blocked states position
                                properties.blockedStates.setValue([bsKeys[i]], true);
                            }
                        }
                    }
                    shiftDeviceState(DeviceConstants.PROGRESS_COMMANDS.BLOCKED); 
                };

                // Unblocking device moves device state to uninit
                self.unblockDeviceState = function () { 
                    // Reset all blocked states to false
                    var bsKeys = properties.blockedStates.getKeys();
                    for (i = 0; i < bsKeys.length; i++) {
                        properties.blockedStates.setValue([bsKeys[i]], false);
                    }
                    shiftDeviceState(DeviceConstants.PROGRESS_COMMANDS.PROGRESS); 
                };
                

                // Return itself
                return self;
            };

            // Return object
            return Device;
        }]);
})();
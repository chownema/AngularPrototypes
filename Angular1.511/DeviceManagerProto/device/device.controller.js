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
                        // vDeviceDict : new Dictionary(),
                        // aDeviceDict : new Dictionary(),
                        // selectedVideoDevice : null,
                        // selectedAudioDevice : null,
                        blockedStates: new Dictionary(
                            { // DeviceController can have one or more of these states active in one istance
                                Firewall: false, /*case 1554*/
                                InOtherAppUse: false, /*case 1013 */
                                PermissionDenied: false /*PermissionDenied*/
                            }
                        ),
                        Permissions: {
                            audio: DetectRTC.isWebsiteHasMicrophonePermissions,
                            video: DetectRTC.isWebsiteHasWebcamPermissions
                        }


                    };

                    /**
                     * @function updatePermissions
                     * @description Updates the status of permissions and the blocked state
                     */
                    self.updatePermissions = function () {
                        try {
                            self.permissions = {
                                audio: DetectRTC.isWebsiteHasMicrophonePermissions,
                                video: DetectRTC.isWebsiteHasWebcamPermissions
                            };
                            var isDenied = !(self.permissions['video'] && self.permissions['audio']);
                            self.blockedStates.setValue('PermissionDenied', isDenied);
                        } catch (Err) {
                            $exceptionHandler('updatePermissions ::', Err);
                        }
                    };

                    /**
                     * @function hasPermissions
                     * @return {boolean} if DeviceController has permissions
                     */
                    self.hasPermissions = function () {
                        return !self.blockedStates.getValue('PermissionDenied');
                    }


                    /**
                     * @function loadDevices
                     * @param {blockedStates} blockState
                     * @param {Boolean} isblock
                     * @description Sets or Removes the blocked state of the device controller
                     * @return {boolean} success status
                     */
                    self.setBlockedState = function (blockState, isblock) {
                        // Ensure
                        if (isblock == null || blockState == null) {
                            $exceptionHandler('setBlockedState ::', 'Wrong Arguments Supplied');
                            return false;
                        }
                        if (isblock == '' || blockState == '') {
                            $exceptionHandler('setBlockedState ::', 'Wrong Arguments Supplied');
                            return false;
                        }

                        switch (blockState) {
                            case 'Firewall':
                                self.blockedStates.setValue('Firewall', isblock);
                                break;
                            case 'InOtherAppUse':
                                self.blockedStates.setValue('InOtherAppUse', isblock);
                                break;
                            case 'PermissionDenied':
                                self.blockedStates.setValue('PermissionDenied', isblock);
                                break;
                        }

                        return true;

                    };

                    /**
                     * @function getBlockedStates
                     * @description Gets a blocked state list for the current instance
                     *              of the userAgent.
                     * @return {List} blockedStateList
                     */
                    self.getBlockedStates = function () {
                        var blockedStateList = self.blockedStates.getKeyListByValue(true);
                        console.log(self.blockedStates.getData());
                        return blockedStateList;
                    };

                    /**
                     * @function loadDevices
                     * @description loads devices into two Device Obj type lists 
                     * @return {boolean} Loaded devices status
                     */
                    self.loadDevices = function (otDeviceList) {
                        $exceptionHandler('Not Implemented yet', 'loadDevices');
                        // // filterDevices into correct list
                        // for (i = 0; i < otDeviceList.length; i++) {
                        //     var id = otDeviceList[i]['deviceId'];
                        //     var kind = otDeviceList[i]['kind'];
                        //     var label = otDeviceList[i]['label'];
                        //     // Create Device objects with their given data
                        //     switch (otDeviceList[i]['kind']){ // NOTE : change on opentok OTdevices will break this
                        //         case DeviceConstants.DEVICE_TYPE.Video:
                        //             self.vDeviceDict.add(id, new Device(id, label, kind));
                        //             break;
                        //         case DeviceConstants.DEVICE_TYPE.Audio:
                        //             self.aDeviceDict.add(id, new Device(id, label, kind));
                        //             break;
                        //     }
                        // }


                        // // Check if devices recieved are empty
                        // if (self.vDeviceDict === null ||  self.aDeviceDict.getLength() <= 0) {
                        //     $exceptionHandler('ERROR DeviceController loadDevices', 
                        //         'Audio Devices failed to load');
                        // }
                        // else if(self.vDeviceDict === null || self.aDeviceDict.getLength() <= 0) {
                        //     $exceptionHandler('ERROR DeviceController loadDevices',
                        //          'Video Devices failed to load');
                        // }
                    }

                    /**
                     * @function setFirstDevices
                     * @return {boolean} setFirstDevices Status
                     */
                    self.setFirstSelectedDevices = function () {
                        $exceptionHandler('Not Implemented yet', 'setFirstSelectedDevices');
                        // // Booleans Video and Audio dictionaries are initialized
                        // var isVDListInit = self.vDeviceDict.getLength() > 0;
                        // var isADListInit = self.aDeviceDict.getLength() > 0;

                        // // Check if selected devices are are null, reset and remove it if found
                        // if (self.selectedVideoDevice && isVDListInit) {
                        //     // Search for device and reset it
                        //     for (i = 0; i < self.vDeviceDict.getLength(); i++) {
                        //         // Get the device that may already be loaded into the selected device
                        //         var device = self.vDeviceDict.getValue(self.selectedVideoDevice.getDeviceID);
                        //         if (device) {
                        //             // Reset device ensure clean state
                        //             device.resetDeviceState();
                        //         }
                        //     }
                        //     // unacloc selected device 
                        //     self.selectedVideoDevice = null;
                        // }

                        // // Check and set video input device 
                        // if (self.vDeviceDict.getLength() > 0 && isVDListInit) {
                        //     // Get the first device in the dictionary
                        //     self.selectedVideoDevice = self.vDeviceDict.getValueByPos(0);
                        // } else {
                        //       $exceptionHandler('DeviceController : setFirstSelectedDevices', 
                        //         'Failed to set init video input device');
                        // }

                        // // Check and set audio input device
                        // if (self.vDeviceDict.getLength() > 0 && isADListInit) {
                        //     // Get the first device in the dictionary
                        //     self.selectedAudioDevice = self.aDeviceDict.getValueByPos(0);
                        // } else {
                        //       $exceptionHandler('DeviceController : setFirstSelectedDevices', 
                        //         'Failed to set init audio input device');
                        // }
                    }

                    /**
                     * @function selectVideoDevice
                     * @return {boolean} selectedDevice Status
                     */
                    self.selectVideoDevice = function (DeviceID) {
                        $exceptionHandler('Not Implemented yet', 'selectVideoDevice');
                        // var selectedDevice = false;
                        // if (self.vDeviceDict !== null || self.vDeviceDict.length > 0)
                        // // Get device uninit state from deviceID
                        // var device = self.vDeviceDict;
                        // // Init device and progress state
                        // // If is ready, set selectedVideoDevice to this device
                        // // Check if selectedDevice matches deviceID
                        // // Set device to in use
                        // // return status
                        // return selectedDevice;
                    }

                    /**
                     * @function selectAudioDevice
                     * @return {boolean} selectedDevice Status
                     */
                    self.selectAudioDevice = function (deviceID) {
                        $exceptionHandler('Not Implemented yet', 'selectAudioDevice');
                        // var selectedDevice = false;
                        // // Get device uninit state from deviceID
                        // // Init device and progress state
                        // // If is ready, set selectedAudioDevice to this device
                        // // Check if selectedDevice matches deviceID
                        // // Set device to in use
                        // // return status
                        // return selectedDevice;
                    }



                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.initDeviceSelectedDevice = function () {
                        $exceptionHandler('Not Implemented yet', 'initDeviceSelectedDevice');
                        // do something useful
                    }

                    /**
                     * @function functionname
                     * @description Function Desc
                     */
                    self.resetDeviceSelectedDevice = function () {
                        $exceptionHandler('Not Implemented yet', 'resetDeviceSelectedDevice');
                        // do something useful
                    }

                    self.pauseDevice = function () {
                        $exceptionHandler('Not Implemented yet', 'pauseDevice');
                    }


                    // TODO: add more functions to device controller
                    return self;
                };


                return DeviceController;
            }]);
})();
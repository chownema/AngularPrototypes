/**
 * event-sequence.controller.js
 * @author Miguel Saavedra
 */
(function () {
    angular.module('system.events')
        /** 
         * EventController
         * @description Class that controls the logic around
         *              event based systems, blocking and waiting.
         */
        .factory('EventController', [
            '$exceptionHandler', 
            function ($exceptionHandler) {
            /**
             * @class       EventController
             * @description Class that controls the logic around
             *              event based systems, blocking and waiting.
             */
            var EventController = function () {
                // Controller properties
                self = {
                    eventQueue : []    
                }
                
                /**
                 * @constructor Event
                 * Event innerClass until migration is needed
                 */
                function Event(eId, eIsBlocking, eHasDellay, eCb, eRetries, eDellay) {
                    var event = {};
                    try {
                        // Checking validity of event

                        // Check dellay type has a dellay vice versa
                        if ((eDellay !== null && eHasDellay === null) || 
                            (eHasDellay !== null && eDellay === null)) {
                            throw 'hasDellay boolean and Dellay int needs to be both set';
                        }

                        // Check if is blocking to ensure no deadlock need cb vice versa
                        if ((eIsBlocking !== null && eCb === null) || 
                            (eCb !== null && eIsBlocking === null)) {
                            throw 'isBlocking boolean and Cb function() needs to be both set';
                        }

                        event.id = eId; // Checked before creating event
                        event.isBlocking = eIsBlocking;
                        event.hasDellay = eHasDellay;
                        event.cb = eCb;
                        // Set default amounts for null or less than 0 figures
                        event.retries = eRetries > 0 || eRetries !== null ? eRetries : 1;
                        event.dellay = eDellay > 0 ||  eDellay !== null ? eDellay : 0;

                    } catch (Err) {
                        $exceptionHandler('Failed to create Event Object', Err);
                        return false;
                    }
                    
                    return event;
                }

                self.init = function () {
                     $exceptionHandler('Not Implemented yet', 'init');
                    // init stuff here
                }
                
                /**
                 * @function addEvent
                 * @description Function Desc
                 */
                self.addEvent = function (id, cb, retries) {
                     $exceptionHandler('Not Implemented yet', 'addEvent');
                    // do something useful
                }

                /**
                 * @function addBlockingEvent
                 * @description Function Desc
                 */
                self.addBlockingEvent = function (id, cb, retries) {
                    // do something useful
                }

                /**
                 * @function addEvent
                 * @description Function Desc
                 */
                self.addDellayedEvent = function (id, cb, retries, dellay) {
                     $exceptionHandler('Not Implemented yet', 'addDellayedEvent');
                    // do something useful
                }

                /**
                 * @function addBlockingEvent
                 * @description Function Desc
                 */
                self.addDellayedBlockingEvent = function (id, cb, retries, dellay) {
                    // do something useful
                }

                /**
                 * @function functionname
                 * @description Function Desc
                 */
                self.removeEvent = function () {
                     $exceptionHandler('Not Implemented yet', 'removeEvent');
                    // do something useful
                }

                
                /**
                 * @function functionname
                 * @description Function Desc
                 */
                self.getEventList = function () {
                     $exceptionHandler('Not Implemented yet', 'getEventList');
                    // do something useful
                }
                

                function registerEvent(event) {
                    return true;
                }

                function processEvent() {
                    return true;
                }
            };


            return EventController;
        }]);
})();
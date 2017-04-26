/**
 * event-sequence.controller.js
 * @author Miguel Saavedra
 */
(function () {
    angular.module('system.events', ['system.classes'])
        /** 
         * EventController
         * @description Class that controls the logic around
         *              event based systems, blocking and waiting.
         */
        .factory('EventController', [
            '$exceptionHandler',
            'Dictionary',
            '$log',
            function ($exceptionHandler, Dictionary, $log) {
            /**
             * @class       EventController
             * @description Class that controls the logic around
             *              event based systems, blocking and waiting.
             */
            var EventController = function () {
                // Controller properties
                self = {
                    eventQueue : new Dictionary()  // implement into real Q in the future
                }
                
                /**
                 * @constructor Event
                 * Event innerClass until migration is needed
                 */
                function Event(eId, eIsBlocking, eHasDellay, eCb, eRetries, eDellay) {
                    var event = {};
                    try {
                        // Checking validity of event
                        if (eHasDellay && eDellay === null) {
                            throw 'hasDellay boolean and Dellay int needs to be both set';
                        }

                        // Check if is blocking to ensure no deadlock need cb vice versa
                        if (eIsBlocking && eCb === null) {
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

                /**
                 * @function init
                 * @desc initializes the event controller
                 * @returns success status of initialization
                 */
                self.init = function () {
                     $exceptionHandler('Not Implemented yet', 'init');
                };
                
                /**
                 * @function addEvent
                 * @description Function Desc
                 */
                self.addEvent = function (id, cb, retries) {
                     $exceptionHandler('Not Implemented yet', 'addEvent');
                };

                /**
                 * @function addBlockingEvent
                 * @description Function Desc
                 */
                self.addBlockingEvent = function (id, cb, retries) {
                    try {
                        // Try to register event
                        if(!registerEvent(id, true, false, cb, retries, null)) {
                            throw 'Failed to call registerEvent()';
                        }
                    } catch (Err) {
                        $exceptionHandler('Failed to init Blocking event', Err);
                        return false;
                    }
                    return true;
                };

                /**
                 * @function addDellayedEvent
                 * @description Function Desc
                 */
                self.addDellayedEvent = function (id, cb, retries, dellay) {
                     $exceptionHandler('Not Implemented yet', 'addDellayedEvent');
                };

                /**
                 * @function addDellayedBlockingEvent
                 * @description Function Desc
                 */
                self.addDellayedBlockingEvent = function (id, cb, retries, dellay) {
                     $exceptionHandler('Not Implemented yet', 'addDellayedBlockingEvent');
                };

                /**
                 * @function removeEvent
                 * @description Function Desc
                 */
                self.removeEvent = function () {
                     $exceptionHandler('Not Implemented yet', 'removeEvent');
                };

                
                /**
                 * @function getEventQueue
                 * @description Function Desc
                 */
                self.getEventQueue = function () {
                     return self.eventQueue.getKeys();
                };

                /**
                 * @function processEvent
                 * @param {*} eId 
                 */
                self.processEvent = function(eId) {
                    try {
                        var event = self.eventQueue.getValue(eId);
                        // var exeRetries = 0; Use when need to implement in future  

                        if (event === null) {
                            throw 'Failed to retrieve event';
                        }
                        
                        // try get data
                        var result = event.cb(); // run this function
                        var dellay = 500; // 1/2 second
                        var loopLimit = 5;
                        var loopIndex = 0;
                        
                        // Init and exe event waiter routine
                        if (event.isBlocking) {
                            // Run a waiting loop for the result
                            function waitingLoop() {
                                if ((result === null || result === undefined )
                                    &&loopLimit > loopIndex) {
                                    // Recall this method on a dellay to reduce amount
                                    // of cpu overhead
                                    sleep(dellay);
                                    loopIndex++;
                                    console.log(loopIndex);
                                    // Recursively call wait loop
                                    waitingLoop();
                                }
                                // Exit Clauses if result is already populated or ran out of retries
                                else if(loopLimit < loopIndex){
                                    throw 'Timed out :: could not get result after ('+retries+')';
                                }
                                else if (result === null) {
                                    throw 'could not get result after ('+retries+')';
                                }
                                else if (result !== null) {
                                    $log.log('Success got result from Event CB('+eId+')'); 
                                }
                                // Success
                                return true;
                            }
                            
                            // Run Wait Loop
                            waitingLoop();
                        }


                        if (event.hasDellay) {
                            throw 'Option Not implemented yet';
                        }

                    } catch (Err) {
                         $exceptionHandler('Failed to Process ' +
                            'Event with ID ::\"'+eId+'\"', Err);
                         return false;
                    }
                    return result;
                }
                
                /**
                 * @function registerEvent
                 * @desc registers an event into the event Queue
                 * @param {string} eId 
                 * @param {bool} eIsBlocking 
                 * @param {bool} eHasDellay 
                 * @param {func} eCb needs a return value
                 * @param {int} eRetries 
                 * @param {int} eDellay in miliseconds
                 * @return status success boolean
                 */
                function registerEvent(eId, eIsBlocking, eHasDellay, eCb, eRetries, eDellay) {
                    try {
                        // Check event id has not been created already
                        if (self.eventQueue.isKeyExists(eId)) {
                            throw 'Event key ID :: \"'+eId+'\" already exists in Queue';
                        }
                        // Create event object
                        var event = new Event (eId, eIsBlocking, eHasDellay, eCb, eRetries, eDellay);
                        // Check event is not false before continuing
                        if (event === false) {
                            throw 'Failed to create event object';
                        }
                        // add event to the Queue
                        self.eventQueue.add(eId, event); // Doesnt have check here.
                    } catch (Err) {
                         $exceptionHandler('Failed to register Event', Err);
                         return false;
                    }
                    return true;
                }

  

                /**
                 * @function sleep
                 * @param {*} milliseconds
                 */
                function sleep(milliseconds) {
                    var start = new Date().getTime();
                    for (var i = 0; i < 1e7; i++) {
                        if ((new Date().getTime() - start) > milliseconds){
                        break;
                        }
                    }
                }

                return self;
            };


            return EventController;
        }]);
})();
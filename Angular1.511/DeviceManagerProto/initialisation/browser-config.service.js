/**
 * Browser configurations considerations when init, running and handling functions
 * and exceptions 
 */
(function () {
    /**
     * BrowserConfigService.service.js
     * @description  Creates a singleton service instance of 
     *                  BrowserConfigService object.
     * @author Miguel Saavedra
     */
    angular.module('system.initialization')
        /** 
         * BrowserConfigService
         * @description Creates a singleton service instance of 
         *              BrowserConfigService object.
         */
        .service('BrowserConfigService', function () {

            /**
             * @class       BrowserConfigService
             * @description Service Controller class used to encapsulate browser dependent logic
             *              for applications
             * @param {int} browserType browser type.
             */
            var BrowserConfigService = function (browserType) {
                var self = this;
                // Hard typing local class variables in self
                self = {
                    CONFIG: {
                        ie: function () {
                            // Store commands
                        },
                        ff: function () {

                        },
                        chrome: function () {

                        }
                    }
                };



            }


        });
})();
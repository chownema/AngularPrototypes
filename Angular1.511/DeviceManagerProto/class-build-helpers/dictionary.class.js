/**
 * dictionary.class.js
 * @description A Dictionary collection class
 * @author Miguel Saavedra
 */
(function () {
    angular.module('system.build.classes')
        /** 
         * Dictionary
         * @description A Dictionary collection class
         */
        .factory('Dictionary', function () {

            /**
             * @class       Dictionary
             * @description Desc of Class
             * @param {int} arg arg desc
             */
            var Dictionary = function (oDictionary) {
                var dict = this;
                
                dict.data = oDictionary;

                /**
                 * @function getKeyByValue
                 * @description Function Desc
                 */
                dict.getKeyByValue = function () {
                    // do something useful
                };

                /**
                 * @function getKeys
                 * @description Function Desc
                 */
                dict.getKeys = function () {
                    // do something useful
                };

                /**
                 * @function getValues
                 * @description Function Desc
                 */
                dict.getValues = function () {
                    // do something useful
                };

                /**
                 * @function iterate
                 * @description Function Desc
                 */
                dict.iterate = function () {
                    // do something useful
                };

                /**
                 * @function reverse
                 * @description Function Desc
                 */
                dict.reverse = function () {
                    // do something useful
                };



                return dict;
            };


            return Dictionary;
        });
})();
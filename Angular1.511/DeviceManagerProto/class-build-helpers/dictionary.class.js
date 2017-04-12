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
                
                var properties = {
                    data : oDictionary,
                    hasNext : false,
                    hasPrev : false
                };

                /**
                 * @function _searchDictionary
                 * @param {function} cb callback function
                 * @param {Dict} args arguments
                 * @description internal function used to iterate through 
                 *              the dictionary, whilst implementing a
                 *              callback function which its result is returned
                 *              back to the calling function.
                 * @return      the callback functions result
                 */
                function _searchDictionary(cb, args) {
                    var result = null;

                    if (cb === null) {
                        throw 'Need to Specify Callback Function';    
                    }

                    if (properties.data != null) {
                        keys = Object.keys(properties.data);
                        // Iterate dictionary data till find key
                        for (i = 0; i < keys.length; i++) {
                            // Give current element, Elements List, index
                            result = cb(keys[i], keys, i);
                            // if result is found
                            if (result != null)
                                break;
                        }
                    }
                    return result;
                }

                // /**
                //  * @function getKeyByValue
                //  * @description Function Desc
                //  * @return key associated with the value in the dictionary
                //  *         collection, if not found then return null
                //  */
                // dict.getKeyByValue = function (value) {
                //     // get Keys
                //     var keys = [];
                //     var returnKey = null;
                //     if (properties.data != null) {
                //         keys = Object.keys(properties.data);
                //         // Iterate till find key
                //         for (i = 0; i > keys.length; i++) {
                //             // If found set returnKey and exit loop
                //             if(properties.data[keys[i]]) {
                //                 returnKey = properties.data[keys[i]];
                //                 break;
                //             } 
                //         }
                //     }
                //     return returnKey;
                // };

                /**
                 * @function getKeyByValue
                 * @description Function Desc
                 * @return key associated with the value in the dictionary
                 *         collection, if not found then return null
                 */
                dict.getKeyByValue = function (value) {
                    // get Keys
                    var keys = [];
                    // var returnKey = null;
                    // iterate through dict
                    var returnKey = _searchDictionary(
                        function (currentItem, Items, index) {
                            // If found set returnKey and exit loop
                            if(properties.data[currentItem]) {
                                // return it to the result
                                return properties.data[currentItem];
                            }
                        },
                        null
                    );
                    return returnKey;
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
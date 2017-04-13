/**
 * dictionary.class.js
 * @description A Dictionary collection class with helper functions 
 *              used to interact with the dictionary collection.
 * @author Miguel Saavedra
 */
(function () {
    angular.module('system.classes')
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
                    data: oDictionary,
                    hasNext: false,
                    hasPrev: false,
                    iterIndex : 0
                };

                // Internal command argument 
                const ARGS = {
                    concat : 0,
                    match_one : 1
                }

                /*********************
                 * Internal Functions
                 *********************/

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
                    var resultList = [];
                    var exit = false;

                    if (cb === null) {
                        throw 'Need to Specify Callback Function';
                    }

                    if (properties.data != null) {
                        keys = Object.keys(properties.data);
                        // Iterate dictionary data till find key
                        for (i = 0; i < keys.length; i++) {
                            // Give current element, Elements List, index to CB
                            switch (args) {
                                case ARGS.concat:
                                    resultList.push(cb(keys[i], keys, i));
                                    break;

                                case ARGS.match_one:
                                    result = cb(keys[i], keys, i);
                                    if (result != null)
                                        exit = true;
                            }

                            // Exit Boolean used when search is over
                            if (exit)
                                break;
                        }
                    }

                    // Choose what to return
                    if (args === ARGS.match_one)
                        return result;
                    else if (args === ARGS.concat)
                        return resultList;

                    return null;
                }
                
                

                /*********************
                 * External Functions
                 *********************/

                /**
                 * @function getKeyByValue
                 * @description gets a key by the value within the dictionary
                 *              
                 * @return key associated with the value in the dictionary
                 *         collection, if not found then return null
                 */
                dict.getKeyByValue = function (value) {
                    var keys = [];
                    var args = ARGS.match_one;
                    var cb = function (currentItem, Items, index) { 
                        // If found set returnKey and exit loop
                        if (properties.data[currentItem] == value) {
                            // return it to the result
                            return currentItem;
                        }
                    };
                    var returnKey = _searchDictionary(cb, args);
                    return returnKey;
                };

                /**
                 * @function getKeys
                 * @return {List} Keys
                 */
                dict.getKeys = function () {
                    return Object.keys(properties.data);
                };

                /**
                 * @function getValues
                 * @return {List} values 
                 */
                dict.getValues = function () {
                    var values = [];
                    var args = ARGS.concat;
                    var cb = function (currentItem) {
                        return properties.data[currentItem];
                    };
                    values = _searchDictionary(cb, args);
                    return values;
                };


                /**
                 * @function getValue
                 * @param {string} key
                 * @return {*} value 
                 */
                dict.getValue = function (key) {
                    return properties.data[key];
                };

                return dict;
            };


            return Dictionary;
        });
})();
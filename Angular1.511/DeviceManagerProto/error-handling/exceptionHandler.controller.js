// Overriding the exceptionHandler to use log warn
angular.
  module('exceptionOverwrite', [])
    .factory('$exceptionHandler', [
      '$log',
      function ($log) {
        return function myExceptionHandler(exception, cause) {
          // logErrorsToBackend(exception, cause);
          $log.warn(exception, cause);
        };
      }]);
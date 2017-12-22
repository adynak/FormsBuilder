formsBuilder.controller('SecurityController', ['$scope', '$http', '$location', 'Data', '$rootScope', 'toaster',
    function($scope, $http, $location, Data, $rootScope, toaster) {
        $scope.prompts    = txtSecurity;
        $scope.required   = true;

        $scope.saveSecurity = function() {
            $scope.security.stop = false;
            Data.setSecurityInfo($scope.security);
            $location.path('/login');
            toaster.pop('info', "", txtSecurity.saveSecurity, 3000, 'trustedHtml');
        };

    }
]);
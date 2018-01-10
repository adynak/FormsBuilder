formsBuilder.controller('SuccessController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster', 'ListServices',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster, ListServices) {

        $scope.prompts = txtSideMenu;
        $scope.files = [];

        $scope.applyThisClass = function(memberProfile) {
            return "";
            if (typeof(memberProfile) !== 'undefined'){
                if (memberProfile.member_type) {
                    return "";
                } else {
                    return "sr-only";
                }
            }
        }

        Data.getLocalStorage();

        $scope.menuShowChooseForm = function() {
            return ListServices.menuOptions('menuChooseForm');
        }

        $scope.menuShowBuildForm = function() {
            return ListServices.menuOptions('menuBuildForm');
        }

        $scope.menuShowDisplayForm = function(){
            return ListServices.menuOptions('menuDisplayForm');
        }

        $scope.menuShowUploadForm = function(){
            return ListServices.menuOptions('menuUploadForm');
        }

    }

]);
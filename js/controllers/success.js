formsBuilder.controller('SuccessController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster', 'ListServices',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster, ListServices) {

        $scope.prompts = txtSideMenu;
        $scope.member = Data.getCurrentMember();
        $scope.files = [];

        $scope.applyThisClass = function(memberProfile) {
            if (typeof(memberProfile) !== 'undefined'){
                if (memberProfile.member_type) {
                    return "";
                } else {
                    return "sr-only";
                }
            }
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


        $scope.updateMemberInfo = function() {
            Data.updateMemberInfo().then(function(status) {
                toaster.clear();
                if (status == 'success') {
                    $location.path('/success');
                    toaster.pop('info', "", 'successfully updated', 3000, 'trustedHtml');
                } else if (status == 'usernameexists') {
                    $scope.invalidmessage = 'Member name already exists';
                    toaster.pop('warning', "", 'username exists', 3000, 'trustedHtml');
                } else {
                    $scope.invalidmessage = 'Update failed';
                }
            }, function(err) {
                $scope.invalidmessage = err;
            });
        };

    }

]);
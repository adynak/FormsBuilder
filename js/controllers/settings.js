formsBuilder.controller('SettingsController', ['$scope', '$http', '$location', 'Data', '$rootScope', 'toaster', 'ListServices',
    function($scope, $http, $location, Data, $rootScope, toaster, ListServices) {
        $scope.prompts    = txtSettings;
        $scope.required   = true;

        $scope.listHorizontal = ListServices.buildFractionalMeasurements(208,385);
        $scope.listVertical   = ListServices.buildFractionalMeasurements(128,225);
        $scope.listScale      = ListServices.buildScaleMeasurements();
        $scope.listZoom       = ListServices.buildZoomSelect();

        var previousHorizontal = localStorage.getItem('FormsBuilderWidth');
        var previousVertical   = localStorage.getItem('FormsBuilderHeight');
        var previousScale      = localStorage.getItem('FormsBuilderScale');  
        var previousZoom       = localStorage.getItem('FormsBuilderZoom');  

        $scope.display = {
            horizontal:{},
            vertical:{},
            scale:{}
        };

        if (previousHorizontal != null) {
            $scope.display.horizontal = { 
                name: new Fraction(previousHorizontal),
                value: previousHorizontal
            }
        }

        if (previousVertical != null) {
            $scope.display.vertical = { 
                name: new Fraction(previousVertical),
                value: previousVertical
            }
        }

        if (previousScale != null) {
            $scope.display.scale = { 
                name: previousScale
            }
        }

        if (previousZoom != null) {
            $scope.display.zoom = { 
                name: previousZoom
            }
        }

        $scope.saveConfig = function(){

            localStorage.setItem('FormsBuilderWidth',  $scope.display.horizontal.value);
            localStorage.setItem('FormsBuilderHeight', $scope.display.vertical.value);
            localStorage.setItem('FormsBuilderScale',  $scope.display.scale.name);
            localStorage.setItem('FormsBuilderZoom',   $scope.display.zoom.name);

            var diagonal = Math.sqrt(Math.pow($scope.display.horizontal.value, 2) + 
                           Math.pow($scope.display.vertical.value, 2));

            var screenResolution = {
                horizontal: window.screen.width,
                vertical: window.screen.height,
                diagonal: diagonal
            }
        
            Data.setScreenFactor(screenResolution);
            Data.setZoom($scope.display.zoom.name);

            window.history.go(-1);
        }

    }
]);
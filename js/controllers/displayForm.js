formsBuilder.controller('DisplayFormController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster', 'ListServices',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster, ListServices) {

        $scope.prompts = txtReviewForm;

        var formDefinition = Data.getFormDefinition();
        var offsetHorizontal = formDefinition.formFields[0].horizontal;
        var offsetVertical = formDefinition.formFields[0].vertical;
        var scale = localStorage.getItem('FormsBuilderScale');
        var screenFactor = Data.getScreenFactor();


        $scope.deleteRow = function(row){
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index,1);
            ListServices.renumberFields($scope.gridOptions.data);
        };        

        $scope.btnDone = function(){
            window.history.go(-1);
        };

        $scope.positionFactor = function(direction,pixels){
            // using factor to carry FormsBuilderUnit conversion multiplier
            var offset, factor;
            var mmToInches, distance;
            if (direction == 'horizontal'){
                offset = offsetHorizontal;
                factor = 120;
            } else {
                offset = offsetVertical;
                factor = 48;
            }

            return Data.buildDisplayUnit(scale, pixels, offset, factor, screenFactor);

            // var screenFactor = Data.getScreenFactor();
            // var differential = pixels - offset;
            // var mm = differential * screenFactor ;

            // if (true){
            //     mmToInches = mm/25.4;
            //     distance = Math.round(mmToInches * 16) / 16;
            //     distance = new Fraction(distance);
            // } else {
            //     distance = mm.toFixed(0);
            // }
            // return pixels + '  (' + distance + ')';
        }

        var data = formDefinition.formFields;
        $scope.resultsCount = formDefinition.formFields.length;
        $scope.formName = formDefinition.formName;

        $scope.gridOptions = {
            enableFiltering: false,
            enableSorting: false,
            minRowsToShow: 15,
            data: data,
            columnDefs: [{
                    name: 'fieldNumber',
                    displayName: $scope.prompts.gridColumnFieldNumber,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false
                },
                {
                    name: 'name',
                    displayName: $scope.prompts.gridColumnName,
                    cellClass: 'grid-align-left',                    
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false                    
                },
                {
                    name: 'width',
                    displayName: $scope.prompts.gridColumnWidth,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false
                },
                { 
                    name: 'alignment',
                    displayName: $scope.prompts.gridColumnAlignment, 
                    cellClass: 'grid-align-right',                    
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,

                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    cellFilter: 'mapAlignment', 
                    editDropdownValueLabel: 'alignment', 
                    editDropdownOptionsArray: [
                        { id: 'Left', alignment: 'Left' },
                        { id: 'Right', alignment: 'Right' },
                        { id: 'Overlay', alignment: 'Overlay' }
                    ]
                },

                {
                    name: 'horizontal',
                    displayName: $scope.prompts.gridColumnHorizontal,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,
                    cellTemplate: 'views/templates/gridCalcHorizontal.html'
                },
                {
                    name: 'vertical',
                    displayName: $scope.prompts.gridColumnVertical,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,
                    cellTemplate: 'views/templates/gridCalcVertical.html'
                },
                {
                    name: 'action',
                    displayName: $scope.prompts.gridColumnAction,
                    // cellTooltip: function(row, col) { return 'catsndogs'; },
                    cellClass: 'grid-align-center',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false ,                                       
                    cellTemplate: 'views/templates/gridColumnDelete.html'
                }                
            ]
        };

    }
]);
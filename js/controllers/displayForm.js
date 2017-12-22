formsBuilder.controller('DisplayFormController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster', 'ListServices',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster, ListServices) {

        $scope.prompts = txtReviewForm;

        var debug = false;

        var memberInfo = {};
        memberInfo.id = Data.getCurrentMember().id;

        $scope.deleteRow = function(row){
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index,1);
            ListServices.renumberFields($scope.gridOptions.data);
        };

        $scope.btnDone = function(){
            window.history.go(-1);
        };

        var formDefinition = Data.getFormDefinition();

        if (debug){
            var formDefinition = {
                    "showFormName":false,
                    "formName":"Trade Disclosure",
                    "formFields":[
                        {
                            "name":"Customer Name",
                            "width":1,
                            "alignment":"Overlay",
                            "fieldNumber":1,
                            "horizontal":319,
                            "vertical":305
                        },
                        {
                            "name":"Customer Address",
                            "width":1,
                            "alignment":"Overlay",
                            "fieldNumber":2,
                            "horizontal":323,
                            "vertical":334
                        },
                        {
                            "name":"Customer Date",
                            "width":10,
                            "alignment":"Left",
                            "fieldNumber":3,
                            "horizontal":930,
                            "vertical":336
                        },
                        {
                            "name":"Dealer Name",
                            "width":1,
                            "alignment":"Overlay",
                            "fieldNumber":4,
                            "horizontal":323,
                            "vertical":368
                        },
                        {
                            "name":"Dealer Address",
                            "width":1,
                            "alignment":"Overlay",
                            "fieldNumber":5,
                            "horizontal":322,
                            "vertical":402
                        },
                        {
                            "name":"Dealer Date",
                            "width":10,
                            "alignment":"Left",
                            "fieldNumber":6,
                            "horizontal":934,
                            "vertical":399
                        }
                    ]
                };
            }

        var data = formDefinition.formFields;
        $scope.resultsCount = formDefinition.formFields.length;
        $scope.formName = formDefinition.formName;

        $scope.gridOptions = {
            enableFiltering: false,
            enableSorting: false,
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
                    enableColumnMenu: false                    
                },
                {
                    name: 'vertical',
                    displayName: $scope.prompts.gridColumnVertical,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false                    
                },
                {
                    name: 'action',
                    displayName: $scope.prompts.gridColumnAction,
                    cellTooltip: function(row, col) { return 'catsndogs'; },
                    cellClass: 'grid-align-center',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false ,                                       
                    cellTemplate: 'views/templates/gridColumnDelete.html'
                }                
            ]
        };

    }
]);
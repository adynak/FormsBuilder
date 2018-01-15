formsBuilder.controller('DisplayFormController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster', 'ListServices',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster, ListServices) {

        $scope.prompts = txtReviewForm;

        var formDefinition = Data.getFormDefinition();
        var offsetHorizontal = formDefinition.formFields[0].horizontal;
        var offsetVertical = formDefinition.formFields[0].vertical;
        var scale = localStorage.getItem('FormsBuilderScale');
        var screenFactor = Data.getScreenFactor();

        $scope.prompts.gridColumnUserHorizontal = txtReviewForm.gridColumnHorizontal + ' ' + scale;
        $scope.prompts.gridColumnUserVertical   = txtReviewForm.gridColumnVertical + ' ' + scale;
        $scope.showAction = true;

        $scope.deleteRow = function(row){
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index,1);
            ListServices.renumberFields($scope.gridOptions.data);
        };        

        $scope.btnDone = function(){
            window.history.go(-1);
        };

        $scope.positionFactor = function(direction,row){
            // using factor to carry FormsBuilderUnit conversion multiplier
            var offset, factor;
            var mmToInches, distance;
            if (direction == 'horizontal'){
                offset = offsetHorizontal;
                factor = 120;
                pixels = row.horizontal;
            } else {
                offset = offsetVertical;
                factor = 48;
                pixels = row.vertical;
            }

            var index = row.fieldNumber-1;

            var displayUnit = Data.buildDisplayUnit(scale, pixels, offset, factor, screenFactor, true);
            if (direction == 'horizontal'){
                formDefinition.formFields[index].userHorizontal = displayUnit;
            } else {
                formDefinition.formFields[index].userVertical   = displayUnit;
            }

            return Data.buildDisplayUnit(scale, pixels, offset, factor, screenFactor, true);

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
            enableGridMenu: true,
            exporterPdfHeader: { 
                text: formDefinition.formName, 
                style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
                return { text: currentPage.toString() + ' / ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function ( docDefinition ) {
                docDefinition.styles.headerStyle = { fontSize: 16, bold: true , margin: [40,10,0,0]};
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true , margin: [20,0,0,0] };                
                return docDefinition;
            },            
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
                    enableColumnMenu: false,
                    visible: false
                },
                { 
                    name: 'alignment',
                    displayName: $scope.prompts.gridColumnAlignment, 
                    cellClass: 'grid-align-right',                    
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,
                    visible: false,
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
                    // cellTemplate: 'views/templates/gridCalcHorizontal.html'
                },
                {
                    name: 'vertical',
                    displayName: $scope.prompts.gridColumnVertical,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,
                    // cellTemplate: 'views/templates/gridCalcVertical.html'
                },
                {
                    name: 'userHorizontal',
                    displayName: $scope.prompts.gridColumnUserHorizontal,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,
                    cellTemplate: 'views/templates/gridCalcHorizontal.html',
                    enableCellEdit: false
                },
                {
                    name: 'userVertical',
                    displayName: $scope.prompts.gridColumnUserVertical,
                    cellClass: 'grid-align-right',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false,
                    cellTemplate: 'views/templates/gridCalcVertical.html',
                    enableCellEdit: false                    
                },                
                {
                    name: 'action',
                    displayName: $scope.prompts.gridColumnAction,
                    // cellTooltip: function(row, col) { return 'catsndogs'; },
                    cellClass: 'grid-align-center',
                    headerCellClass: 'grid-header-align-right',
                    enableColumnMenu: false ,                                       
                    cellTemplate: 'views/templates/gridColumnDelete.html',
                    visible: $scope.showAction
                }                
            ]
        };

    }
]);
formsBuilder.controller('BuildFormController', ['$scope', 'ListServices', '$uibModal', 'Data', 'MarkerServices',
    function($scope, ListServices, $uibModal, Data, MarkerServices) {

        var fieldNumber = 1;
        $scope.prompts = txtCommon;

        $scope.fileAttributes = Data.getFileAttributes();
        // $scope.fileAttributes = {name:'payoff.pdf', blob:'payoff.pdf'};

        var formDefinition = {
            showFormName: true,
            formName: '',
            formFields: []
        };

        formDefinition = Data.getFormDefinition();

        // place any existing spots
        var numberOfSpots = MarkerServices.splashSpots(formDefinition);
        fieldNumber = numberOfSpots + 1 ;
        
        $scope.showPopup = function(event) {
            var rightClick = 3;
            var vector = {};

            if (event.which == rightClick) {
                event.preventDefault();

                $uibModal.open({
                    templateUrl: 'views/templates/saveForm.html',
                    controller: saveOrCancelController,
                    resolve: {
                        formDefinition: function() {
                            return formDefinition;
                        }
                    }
                    }).result.then(function(result) {
                        // OK - save the field definition - done in controller
                    }, function(result) {
                        // not OK - remove the field marker - done in controller
                });

                return false;
            }

            vector.horizontal = event.clientX;
            vector.vertical   = event.clientY;
            vector.spotID     = 'spot' + fieldNumber;

            MarkerServices.addSpot(vector);

            $uibModal.open({
                templateUrl: 'views/defineField.html',
                controller: defineFieldsController,
                resolve: {
                    formDefinition: function() {
                        return formDefinition;
                    },
                    fieldNumber: function () {
                        return fieldNumber;
                    },
                    vector: function(){
                        return vector;
                    }
                }
            }).result.then(function(result) {
                // OK - save the field definition
                fieldNumber ++
                formDefinition.formFields.push(result);
                formDefinition.showFormName = false;
                var sortedFormFields = _.sortBy(formDefinition.formFields, ["vertical", "horizontal"]);
                formDefinition.formFields = sortedFormFields;
                ListServices.renumberFields(formDefinition.formFields);
                Data.setFormDefinition(formDefinition);
            }, function(result) {
                // not OK - remove the field marker
                MarkerServices.removeSpot(vector);
            });
        };

    }
]);

var saveOrCancelController = function($scope, $uibModalInstance, $http, formDefinition, ListServices, Data, MarkerServices) {
    $scope.prompts         = txtPrompts;
    $scope.selectWidth     = ListServices.buildWidthSelect();
    $scope.formDefinition  = formDefinition;

    $scope.saveFormDefinition = function() {
        var sortedFormFields = _.sortBy(formDefinition.formFields, ["vertical", "horizontal"]);
        formDefinition.formFields = sortedFormFields;
        ListServices.renumberFields(formDefinition.formFields);
        Data.setFormDefinition(formDefinition);

        // remove the spots
        MarkerServices.wipeSpots(formDefinition);
        $uibModalInstance.close($scope.fieldDefinition);        
        window.history.go(-1);
    };

    $scope.discardChanges = function() {
        MarkerServices.wipeSpots(formDefinition);
        MarkerServices.wipeFields(formDefinition); 

        Data.getWipForm(Data.getFileAttributes()).then(function(sampleForm) {
            if (sampleForm){
                Data.setFormDefinition(sampleForm);
            } else {
                var newForm = {
                    showFormName: true,
                    formName: null,
                    formFields: []
                };                
                Data.setFormDefinition(newForm);
            }
        });     

        $uibModalInstance.dismiss('cancel');
        window.history.go(-1);
    };

    $scope.resetAllFields = function(){
        MarkerServices.wipeSpots(formDefinition);
        MarkerServices.wipeFields(formDefinition);        
        $uibModalInstance.dismiss('cancel');
        window.history.go(-1);
    };

    $scope.checkFormName = function(){
        if ($scope.formDefinition.formName == null){
            return true;
        } else {
            return false;
        }
    };

};

var defineFieldsController = function($scope, $uibModalInstance, $http, formDefinition, ListServices, fieldNumber, vector) {
    $scope.prompts         = txtPrompts;
    $scope.selectWidth     = ListServices.buildWidthSelect();
    $scope.formDefinition  = formDefinition;
    $scope.fieldNumber     = fieldNumber;
    $scope.fieldDefinition = { 
                                name:'',
                                width:'',
                                alignment:'',
                                fieldNumber: fieldNumber,
                                horizontal: vector.horizontal,
                                vertical: vector.vertical
                            };

    $scope.ok = function() {
        $uibModalInstance.close($scope.fieldDefinition);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.checkInputs = function(){
        if ($scope.fieldDefinition.name.length > 0 &&
            $scope.fieldDefinition.width >= 0 && 
            $scope.fieldDefinition.alignment.length > 0){
            return false;
        } else {
            return true;
        }
    };

};
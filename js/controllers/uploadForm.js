formsBuilder.controller('UploadFormController', ['$scope', '$http', '$location', 'Data', '$rootScope', '$routeParams', 'toaster',
    function($scope, $http, $location, Data, $rootScope, $routeParams, toaster) {

		var fieldHorizontal, fieldVertical;
		// var formDefinition = Data.getFormDefinition();
		var formDefinition = Data.purgeOldFormSettings(Data.getFormDefinition());
        var offsetHorizontal = formDefinition.formFields[0].horizontal;
        var offsetVertical = formDefinition.formFields[0].vertical;
        var scale = localStorage.getItem('FormsBuilderScale');

		var fileDefinition = Data.getFileAttributes();

		var jsonFields = ["formName", 
						  "formFields", 
						  "name", 
						  "width", 
						  "alignment", 
						  "fieldNumber",
						  "vertical", 
						  "horizontal", 
						  "verticalMM",
						  "horizontalMM",
						  "verticalInchces",
						  "horizontalInches",
						  "FBU"
						  ];

		$scope.prompts = txtUploadForm;

		for (var jX = 0 ; jX < formDefinition.formFields.length; jX ++){
			fieldHorizontal = Data.buildDisplayUnit(scale, 
								  formDefinition.formFields[jX].horizontal, 
								  offsetHorizontal, 
								  120, screenFactor, true);

			fieldVertical = Data.buildDisplayUnit(scale, 
								  formDefinition.formFields[jX].vertical, 
								  offsetVertical, 
								  48, screenFactor, true);
			if (scale == 'FBU'){
				formDefinition.formFields[jX]['FBU'] = fieldVertical + '\\' + 
													   fieldHorizontal + "\\" + 
													   formDefinition.formFields[jX].fieldNumber + "\\" +
													   formDefinition.formFields[jX].width + "\\";
			} else {
				formDefinition.formFields[jX]['horizontal'+scale] = fieldHorizontal;
				formDefinition.formFields[jX]['vertical'+scale]   = fieldVertical;
			}
		}

		// for screen display only, this is not valid json!
		var jsonFormData = JSON.stringify(formDefinition,jsonFields,4);
		$scope.prompts.jsonFormData = jsonFormData.replace(/\\\\/g, '\\');

		$scope.upLoadForm = function(){
			// below is valid json and will read/write successfully
			Data.setWipForm(fileDefinition, JSON.stringify(formDefinition,jsonFields,4));
			window.history.go(-1);
		};

    }
]);
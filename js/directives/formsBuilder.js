formsBuilder.directive('pwCheck', [function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            $(elem).add(firstPassword).on('keyup', function() {
                scope.$apply(function() {
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    }
}]);

formsBuilder.directive("filelistBind", function(Data) {
    return function(scope, elm, attrs) {
      var fileAttributes = {};
        elm.bind("change", function(evt) {
            scope.$apply(function(scope) {
                fileAttributes.name = evt.target.files[0].name;
                fileAttributes.blob = URL.createObjectURL(event.target.files[0]);
                Data.setFileAttributes(fileAttributes);
                var newForm = {
                    showFormName: true,
                    formName: null,
                    formFields: []
                };

                Data.getWipForm(fileAttributes).then(function(wipForm) {
                    if (wipForm){
                        Data.setFormDefinition(wipForm);
                    } else {
                        Data.setFormDefinition(newForm);
                    }
                });                    
            });
        });
    };
});

formsBuilder.directive('pdf', function(Data) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var zoomFactor = Data.getZoom();
            var zoom = '?#zoom=' + zoomFactor;
            var url = 'pdfForms/' + attrs.src + zoom;
            var blob = attrs.blob;
            element.replaceWith('<object id="pdfForm" type="application/pdf" data="' +
                url +
                '" style="width: 100%; height: 1200px"></object>');
        }
    };
});
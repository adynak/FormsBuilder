formsBuilder.factory("ListServices", ['$http', '$q', '$rootScope', 'Data',
    function($http, $q, $rootScope, Data) {

        var findIndexInData = function(data, property, value){
            var result = -1;
            var name = value.name
            data.some(function (item, i) {
                if (item[property] >= name) {
                    result = i;
                    return true;
                }
            });
            return result;
        }

        var buildWidthSelect = function() {
            var widths = [];

            for (var x = 0; x < 30; ++x) {
                widths.push({
                    name: x,
                    id: x
                });
            }

            return widths;
        }

        var renumberFields = function(formFields){
            for (var x = 0 ; x < formFields.length ; x++){
                formFields[x].fieldNumber = x+1;
            }
        }

        var menuOptions = function(menuItem) {
            if (menuItem == 'menuBuildForm'){
                if (Data.getFileAttributes().name === null){
                    return 'disabled';
                } else {
                    return '';
                }
            }

            if (menuItem == 'menuDisplayForm'){
                if (Data.getFormDefinition().formName === null){
                    return 'disabled';
                } else {
                    return '';
                }
            }

            if (menuItem == 'menuUploadForm'){
                if (Data.getCurrentMember().member_type == 0){
                    return 'disabled';
                } else {
                    if (Data.getFormDefinition().formName === null){
                        return 'disabled';
                    } else {
                        return '';
                    }
                }
            }

        }

        return {
            buildWidthSelect: buildWidthSelect,
            renumberFields:   renumberFields,
            menuOptions:      menuOptions
        };
    }
]);
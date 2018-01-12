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

        var buildZoomSelect = function() {
            var zoom = [];

            for (var x = 85; x < 200; ++x) {
                zoom.push({
                    name: x,
                    id: x
                });
            }

            return zoom;
        }


        var buildFractionalMeasurements = function(start,stop){
            var values = [];

            for (var x = start; x < stop; ++x) {
                values.push({
                    name: new Fraction(x/16).toString(0),
                    value: x / 16 
                });
            }

            return values;
        }

        var buildScaleMeasurements = function(){
            var scale = [
                {
                    name: 'MM'
                },
                {
                    name: 'CM'
                },
                {
                    name: 'inches'
                },
                {
                    name: 'FBU'
                },
                {
                    name: 'pixels'
                }
            ];
            return scale;
        }

        var renumberFields = function(formFields){
            for (var x = 0 ; x < formFields.length ; x++){
                formFields[x].fieldNumber = x+1;
            }
        }

        var menuOptions = function(menuItem) {

            if (menuItem == 'menuChooseForm'){
                if (typeof(Data.getScreenFactor()) === 'undefined'){
                    return 'disabled';
                } else {
                    return '';
                }
            }

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
                if (Data.getFormDefinition().formName === null){
                    return 'disabled';
                } else {
                    return '';
                }
            }

        }

        return {
            buildWidthSelect: buildWidthSelect,
            renumberFields:   renumberFields,
            menuOptions:      menuOptions,
            buildFractionalMeasurements:  buildFractionalMeasurements,
            buildScaleMeasurements: buildScaleMeasurements,
            buildZoomSelect: buildZoomSelect
        };
    }
]);
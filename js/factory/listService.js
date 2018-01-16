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
            var items = [];

            for (var x = 0; x < 30; ++x) {
                items.push({
                    name: x,
                    id: x
                });
            }

            return items;
        }


        var buildAlignmentSelect = function() {
            var items = [];
            var alignmentCount = txtPrompts.alignments.length;

            for (var x = 0; x < alignmentCount; ++x) {
                items.push({
                    name: txtPrompts.alignments[x].name,
                    id: txtPrompts.alignments[x].id
                });
            }
            return items;
        }            

        var buildZoomSelect = function() {
            var items = [];

            for (var x = 85; x < 200; ++x) {
                items.push({
                    name: x,
                    id: x
                });
            }

            return items;
        }


        var buildFractionalMeasurements = function(start,stop){
            var items = [];

            for (var x = start; x < stop; ++x) {
                items.push({
                    name: new Fraction(x/16).toString(0),
                    value: x / 16 
                });
            }

            return items;
        }

        var buildScaleMeasurements = function(){
            var items = [
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
            return items;
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
            buildZoomSelect: buildZoomSelect,
            buildAlignmentSelect: buildAlignmentSelect
        };
    }
]);
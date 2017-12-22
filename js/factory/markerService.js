formsBuilder.factory("MarkerServices", ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {

        var spotConfig = markerConfig;

        var addSpot = function(vector){

            $("body").append(
                $('<div class=' + vector.spotID + '></div>')
                .css('position', 'absolute')
                .css('top', vector.vertical + 'px')
                .css('left', vector.horizontal + 'px')
                .css('width', spotConfig.size)
                .css('height', spotConfig.size)
                .css('background-color', spotConfig.color)
            );

        }

        var removeSpot = function(vector){
            var spotElementID = '.' + vector.spotID;
            $(spotElementID).remove();
        }

        var splashSpots = function(formDefinition){
            var vector = {};
            var numberOfSpots = formDefinition.formFields.length;
            for (var s = 0 ; s < numberOfSpots ; s ++){
                vector.vertical   = formDefinition.formFields[s].vertical;
                vector.horizontal = formDefinition.formFields[s].horizontal;
                vector.spotID     = 'spot' + formDefinition.formFields[s].fieldNumber;
                addSpot(vector);
            }
            return numberOfSpots;
        }

        var wipeSpots = function(formDefinition){
            var vector = {};
            var numberOfSpots = formDefinition.formFields.length;
            for (var s = 1 ; s <= numberOfSpots ; s ++){
                vector.spotID = 'spot' + s;
                removeSpot(vector);
            }
        }

        var wipeFields = function(formDefinition){
            formDefinition.formFields = [];
        }

        return {
            addSpot: addSpot,
            removeSpot: removeSpot,
            splashSpots: splashSpots,
            wipeSpots: wipeSpots,
            wipeFields: wipeFields
        };
    }
]);
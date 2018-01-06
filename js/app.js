var formsBuilder = angular.module('formsBuilder', ['ngRoute', 'ngAnimate', 'toaster', 'ngTouch', 
                                     'ui.grid', 'ui.grid.edit', 'ngMessages', 'ui.grid.grouping', 'ui.bootstrap']);

formsBuilder.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.hashPrefix(''); 

    document.title = txtNavigation.brandName;

    $routeProvider.
    when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController'
    }).
    when('/displayForm', {
        templateUrl: 'views/displayForm.html',
        controller: 'DisplayFormController',
    }).
    when('/buildForm', {
        templateUrl: 'views/buildForm.html',
        controller: 'BuildFormController',
    }).
    when('/uploadForm',{
        templateUrl: 'views/uploadForm.html',
        controller: 'UploadFormController',
    }).
    when('/settings',{
        templateUrl: 'views/settings.html',
        controller: 'SettingsController',
    }).    
    otherwise({
        redirectTo: '/success'
    });


}]).run(function($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // thre is nothing special that we need to do here for this application
    });
});


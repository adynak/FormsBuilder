var formsBuilder = angular.module('formsBuilder', ['ngRoute', 'ngAnimate', 'toaster', 'ngTouch', 
                                     'ui.grid', 'ui.grid.edit', 'ngMessages', 'ui.grid.grouping', 'ui.bootstrap']);

formsBuilder.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.hashPrefix(''); 

    document.title = txtNavigation.brandName;

    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController',
        task: 'getsessiondata'
    }).
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController',
        task: 'getsessiondata'
    }).
    when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController',
        task: 'getsessiondata'
    }).
    when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
        task: 'getsessiondata'
    }).
    when('/displayForm', {
        templateUrl: 'views/displayForm.html',
        controller: 'DisplayFormController',
        task: 'getsessiondata'
    }).
    when('/buildForm', {
        templateUrl: 'views/buildForm.html',
        controller: 'BuildFormController',
        task: 'getsessiondata'
    }).
    when('/uploadForm',{
        templateUrl: 'views/uploadForm.html',
        controller: 'UploadFormController',
        task: 'getsessiondata'
    }).
    when('/getSecurity',{
        templateUrl: 'views/security.html',
        controller: 'SecurityController',
        task: 'getsessiondata'
    }).    
    otherwise({
        redirectTo: '/login'
    });


}]).run(function($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {

        var securityInfo = Data.getSecurityInfo();
        if (securityInfo.stop){
            $location.path("/getSecurity");
            next.templateUrl = 'views/security.html';
        }

        Data.setIsNotLoggedIn(true);
        Data.setAuthenticated(false);

        $rootScope.isnotloggedin = true;
        $rootScope.authenticated = false;

        var nextUrl = next.templateUrl;
        Data.getSession(next.task).then(function(results) {
            if (results[0].id) {

                $rootScope.isnotloggedin = false;
                $rootScope.authenticated = true;

                Data.setIsNotLoggedIn(false);
                Data.setAuthenticated(true);

                if (next.task === 'getsessiondata') {
                    Data.setCurrentMember(results[0]);
                }

                if (nextUrl == 'views/register.html' || nextUrl == 'views/login.html') {
                    $location.path("/success");
                }
            } else {

                if (nextUrl == 'views/register.html' || 
                    nextUrl == 'views/login.html' || 
                    nextUrl == 'views/security.html') {
                } else {
                    $location.path("/login");
                }
            }
        });
    });
});


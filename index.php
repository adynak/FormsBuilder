<!doctype html>
<html lang="en" ng-app="formsBuilder" ng-cloak>
  <head>
    <meta charset="UTF-8">

    <title></title>
    <meta name="viewport" content="width=device-width, user-scalable=no">

<!--     <link rel="shortcut icon" href="resources/images/recipe.ico" mime="image/x-icon">
    <link rel="icon" href="resources/images/recipe.ico" type="image/x-icon">
 -->
        <link rel="shortcut icon" href="#" mime="image/x-icon">


    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="node_modules/angularjs-toaster/toaster.css">

    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-route/angular-route.min.js"></script>
    <script src="node_modules/angular-animate/angular-animate.min.js"></script>
    <script src="node_modules/angularjs-toaster/toaster.js"></script>
    <script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"></script>

    <script src="js/app.js"></script>
    <script src="js/controllers/displayForm.js"></script>
    <script src="js/controllers/buildForm.js"></script>
    <script src="js/controllers/uploadForm.js"></script>
    <script src="js/controllers/registration.js"></script>    
    <script src="js/controllers/profile.js"></script>
    <script src="js/controllers/success.js"></script>
    <script src="js/controllers/security.js"></script>
    <script src="js/controllers/nav.js"></script>    
    <script src="js/factory/dataService.js"></script>
    <script src="js/factory/listService.js"></script>
    <script src="js/factory/markerService.js"></script>
    <script src="js/directives/formsBuilder.js"></script>
    <script src="js/filters/mapAlignment.js"></script>

  </head>
  <body oncontextmenu="return false;">

        <toaster-container 
            toaster-options="
                {
                    'type': 'success',
                    'time-out': 3000, 
                    'position-class': 'toast-bottom-right',
                    'close-button':true
                }
            ">
        </toaster-container>

    <div ng-controller="NavigationController">
        <nav class="cf" ng-include="'views/nav.html'"></nav>
        <div style="padding:0 0 0 30px;">
            <div class="row" ng-view>
            </div>
        </div>
    </div>

    <script src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="node_modules/angular-touch/angular-touch.js"></script> 
    <script src="node_modules/angular-ui-grid/ui-grid.min.js"></script> 
    
    <link rel="stylesheet" href="node_modules/angular-ui-grid/ui-grid.min.css"</link>

    <script src="node_modules/angular-messages/angular-messages.min.js"></script>
<!--     
    <script src="node_modules/moment/min/moment.min.js"></script>
    <script src="node_modules/bootstrap-daterangepicker/daterangepicker.js"></script>
    <script src="node_modules/angular-daterangepicker/js/angular-daterangepicker.min.js"></script>
    <link rel="stylesheet" href="node_modules/bootstrap-daterangepicker/daterangepicker.css" />
 -->
    <script src="node_modules/lodash/lodash.min.js"></script>

    <script src="i18n/en_US.js"></script>


  </body>
</html>

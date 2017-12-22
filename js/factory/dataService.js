formsBuilder.factory("Data", ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {

        var factoryVariables = {
            securityInfo : {
                schema: null,
                dbPass: null,
                stop: true
            },
            fileAttributes: {
                name: null,
                blob: null
            }
        };

        var setFileAttributes = function(attrs){
            // {name: name, blob: blob ; }
            factoryVariables.fileAttributes = attrs;
        }

        var getFileAttributes = function(){
            return factoryVariables.fileAttributes;
        }

        var setFormDefinition = function(formDefinition){
            factoryVariables.FormDefinition = formDefinition;
        }

        var getFormDefinition = function(){
            return factoryVariables.FormDefinition;
        }

        var setIsNotLoggedIn = function(flag){
            factoryVariables.isNotLoggedIn = flag;
        }

        var getIsNotLoggedIn = function(){
            return factoryVariables.isNotLoggedIn;
        }

        var setAuthenticated = function(flag){
            factoryVariables.authenticated = flag;
        }

        var getAuthenticated = function(){
            return factoryVariables.authenticated;
        }

        var setCurrentMember = function(currentMember){
            factoryVariables.currentMember = currentMember;
        }

        var getCurrentMember = function(){
            return factoryVariables.currentMember;
        }

        var setActiveMember = function(activeMember){
            factoryVariables.activeMember = activeMember;
        }

        var getActiveMember = function(){
            return factoryVariables.activeMember;
        }

        var setSecurityInfo = function(securityInfo){
            localStorage.setItem('catsndogs', securityInfo.schema);
            localStorage.setItem('teainchina', securityInfo.dbPass);
            factoryVariables.securityInfo = securityInfo;
        }

        var getSecurityInfo = function(){
            if (factoryVariables.securityInfo.schema == null || factoryVariables.securityInfo.dbPass == null){
                factoryVariables.securityInfo.schema = localStorage.getItem('catsndogs');
                factoryVariables.securityInfo.dbPass = localStorage.getItem('teainchina');
                if (factoryVariables.securityInfo.schema !== null || factoryVariables.securityInfo.dbPass !== null){
                    factoryVariables.securityInfo.stop = false;
                }
            }
            return factoryVariables.securityInfo;
        }

        var validateCredentials = function(member){
            var qObject = $q.defer();
            var params = {
                email: member.email,
                password: member.password,
                task: 'validate',
                securityInfo: getSecurityInfo()
            };
            $http({
                method: 'POST',
                url: 'resources/dataServices/formsBuilder.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;            
        }

        var registerMember = function(member) {
            // https://script.google.com/macros/d/MNYmhNDROwSuCBulBjpCOBQxbFS9WIK2d/edit?uiv=2&mid=ACjPJvEKyT7zYT3fN-Bh1kBFyqiw_j-NG0SCSo6rc8dz7_7-9NTrsj5jSdurrMX2vu4lYc7bcXFNQFhfPeq_OqzPSlpd9Gs2g6YQLT_tIItlrJTTIi-nhs6yiSsIL-QsJeoPX6K2BBxTuGc
            var qObject = $q.defer();
            delete member.confirmpassword;
            member.onlineid = member.email.substring(0, member.email.lastIndexOf("@"));
            member.webApp = txtNavigation.brandName;
            member.replyTo = txtNavigation.replyTo;
            member.appDomain = txtNavigation.appDomain;
            var params = "&" + $.param(member);
            var webApp = 'https://script.google.com/macros/s/AKfycbwL0BWFFP7Pz-qsjqpuLUCEtjlN2qSvxehkmLXzued3xhron0lS/exec';
            $http({
                method: 'POST',
                url: webApp,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;            
        }

        var updateMemberInfo = function(member){
            var qObject = $q.defer();
            var params = {
                userInfo: member,
                task: 'updateuser',
                securityInfo: getSecurityInfo()
            };
            $http({
                method: 'POST',
                url: 'resources/dataServices/formsBuilder.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);

            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var logout = function(member){
            var qObject = $q.defer();
            var params = {
                task: 'logout',
                securityInfo: getSecurityInfo()
            };
            $http({
                method: 'POST',
                url: 'resources/dataServices/formsBuilder.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getSession = function(task){
            var qObject = $q.defer();
            var params = {
                task: task,
                securityInfo: getSecurityInfo()
            };
            $http({
                method: 'POST',
                url: 'resources/dataServices/formsBuilder.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        }

        var getWipForm = function(pdfName){
            var qObject = $q.defer();
            var params = {
                formName: pdfName.name,
                securityInfo: getSecurityInfo(),
                action: 'read'
            };
            $http({
                method: 'POST',
                url: 'resources/dataServices/wipForms.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }                
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        };

        var setWipForm = function(pdfName,jsonForm){
            var qObject = $q.defer();
            var params = {
                formName: pdfName.name,
                securityInfo: getSecurityInfo(),
                jsonForm: jsonForm,
                action: 'write'
            };
            $http({
                method: 'POST',
                url: 'resources/dataServices/wipForms.php',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }                
            }).then(function(success) {
                qObject.resolve(success.data);
            }, function(err) {
                console.log(err);
            });
            return qObject.promise;
        };


        return {
            validateCredentials: validateCredentials,
            registerMember: registerMember,
            updateMemberInfo: updateMemberInfo,
            logout: logout,
            getSession: getSession,
            setCurrentMember: setCurrentMember,
            getCurrentMember: getCurrentMember,
            setIsNotLoggedIn: setIsNotLoggedIn,
            getIsNotLoggedIn: getIsNotLoggedIn,
            setAuthenticated: setAuthenticated,
            getAuthenticated: getAuthenticated,
            getActiveMember: getActiveMember,
            setActiveMember: setActiveMember,
            setFileAttributes: setFileAttributes,
            getFileAttributes: getFileAttributes,
            getFormDefinition: getFormDefinition,
            setFormDefinition: setFormDefinition,
            setSecurityInfo: setSecurityInfo,
            getSecurityInfo: getSecurityInfo,
            getWipForm: getWipForm,
            setWipForm: setWipForm
        };
    }
]);
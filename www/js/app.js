// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform, $rootScope, $window) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
            });
        }, false);
    })
    .controller('MainController', function ($scope, $http, $ionicLoading) {
        $scope.results = false;
        $scope.noresult = false;
        $scope.copyright = '2016';

        $scope.clearResults = function () {
            $scope.results = false;
        };

        $scope.search = function (req) {
            $scope.noresult = false;
            $ionicLoading.show();
            $http.get('https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + req.q, {
                headers: {
                    'X-Mashape-Key': 'AZTYge6gYdmshDCHeQAOZH1dcWmtp1HNP2YjsnmUeQgivkWV3V',
                    'Accept': 'text/plain'
                }
            }).success(function (res) {
                $scope.results = true;
                $scope.letterLimit = 120;
                $ionicLoading.hide();

                /**
                 * return the resuls
                 */
                $scope.lists = res.list;
                $scope.count = res.list.length;
                if (res.list.length === 0) {
                    $scope.noresult = true;
                }
            })
        }
    })

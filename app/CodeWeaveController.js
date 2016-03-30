(function () {
    angular.module('CodeWeaveApp').controller('CodeWeaveController', ['$scope', '$localStorage'
    , function ($scope, $localStorage) {
            var self = this;
            
            $scope.Take = "some value goes here\n";
            $scope.WeaveSubstitution = "value";
            $scope.WeaveValues = "1\n2\n3";
            $scope.Result = "";
            self.Initialised = false;
            
            self.ClearStorage = function(){
                $localStorage.Take = null;
                $localStorage.WeaveSubstitution = null;
                $localStorage.WeaveValues = null;
            }
            
            self.SaveToStorage = function(){
                $localStorage.Take = $scope.Take;
                $localStorage.WeaveSubstitution = $scope.WeaveSubstitution;
                $localStorage.WeaveValues = $scope.WeaveValues;
            }
            
            self.Initialise = function(){
                // self.ClearStorage();
                
                $scope.Take = $localStorage.Take ? $localStorage.Take : 'Ring around the rosey';
                $scope.WeaveSubstitution = $localStorage.WeaveSubstitution ? $localStorage.WeaveSubstitution : 'rosey';
                $scope.WeaveValues = $localStorage.WeaveValues ? $localStorage.WeaveValues : 'posey\r\nhosey\r\nTrump';
                
                $scope.$watch('Take', function (newValue, oldValue) {
                    $scope.Weave();
                });
                
                $scope.$watch('WeaveSubstitution', function (newValue, oldValue) {
                    $scope.Weave();
                });
                
                $scope.$watch('WeaveValues', function (newValue, oldValue) {                
                    $scope.Weave();
                });
                
                self.Initialised = true;
                
                $scope.Weave();                
            }
            
            $scope.Weave = function(){
                if(!self.Initialised) return;
                
                self.SaveToStorage();
                var values = $scope.WeaveValues.split("\n");
                var result = "";
                                
                for (var i = 0; i < values.length; i++) {
                    result += $scope.ReplaceAll($scope.Take, $scope.WeaveSubstitution, values[i]) + "\n";
                    //Swap {{index} for the counter i
                    result = $scope.ReplaceAll(result, '{{index}}', i);
                }
                
                $scope.Result = result;
            };
            
            $scope.ReplaceAll = function (str, find, replace) {
                if (typeof str === 'undefined' || !str)
                    return '';

                return str.replace(new RegExp(find, 'g'), replace);
            }
            
            self.Initialise();
        }]);
}());
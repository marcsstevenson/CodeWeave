(function () {
    angular.module('CodeWeaveApp').controller('CodeWeaveController', ['$scope'
    , function ($scope) {

            $scope.Take = "some value goes here\n";
            $scope.WeaveSubstitution = "value";
            $scope.WeaveValues = "1\n2\n3";
            $scope.Result = "";

            $scope.$watch('Take', function (newValue, oldValue) {
                $scope.Weave();
            });
            
            $scope.$watch('WeaveValues', function (newValue, oldValue) {                
                $scope.Weave();
            });
            
            $scope.Weave = function(){
                var values = $scope.WeaveValues.split("\n");
                var result = "";
                
                for (var i = 0; i < values.length; i++) {
                    result += $scope.ReplaceAll($scope.Take, $scope.WeaveSubstitution, values[i]) + "\n";
                    // result += $scope.Take.replace($scope.WeaveSubstitution, values[i]) + "\n";
                }
                
                $scope.Result = result;
            };
            
            $scope.ReplaceAll = function (str, find, replace) {
                if (typeof str === 'undefined' || !str)
                    return '';

                return str.replace(new RegExp(find, 'g'), replace);
            }
            
            $scope.Weave();
        }]);
}());
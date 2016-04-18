(function () {
    angular.module('CodeWeaveApp').controller('CodeWeaveController', ['$scope', '$localStorage'
    , function ($scope, $localStorage) {
            var self = this;
            
            $scope.Take = "some value goes here\n";
            $scope.WeaveSubstitution = "value";
            $scope.WeaveValues = "1\n2\n3";
            $scope.Result = "";
            self.Initialised = false;
            
            self.SaveToStorage = function(){
                $localStorage.Take = $scope.Take;
                $localStorage.WeaveSubstitution = $scope.WeaveSubstitution;
                $localStorage.WeaveValues = $scope.WeaveValues;
                $localStorage.FilterIn = $scope.FilterIn;
            }
            
            self.Initialise = function(){
                $scope.Take = $localStorage.Take ? $localStorage.Take : '';
                $scope.WeaveSubstitution = $localStorage.WeaveSubstitution ? $localStorage.WeaveSubstitution : '';
                $scope.WeaveValues = $localStorage.WeaveValues ? $localStorage.WeaveValues : '';                
                $scope.FilterIn = $localStorage.FilterIn ? $localStorage.FilterIn : '';
                
                var delayInMs = 2000;

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
                $scope.Filter();
            }
            
            $scope.Weave = function(){
                if(!self.Initialised) return;
                
                self.SaveToStorage();
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
            
            $scope.Filter = function(){
                if(!self.Initialised) return;
                if($scope.FilterIn.length === 0) return;
                
                self.SaveToStorage();
                
                var filterIn = $scope.FilterIn;
                var filterOut = $scope.FilterIn;
                
                //Remove '.fa-'
                filterOut = $scope.ReplaceAll(filterOut, '.fa-', '');
                                
                //Remove ':before {'
                filterOut = $scope.ReplaceAll(filterOut, ':before {', '');
                
                //Remove every 2nd and 3rd line
                var lines = filterOut.split("\n");
                      
                filterOut = '';
                var inLineCounter = 0
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var textToAdd = null;
                    
                    // console.log(inLineCounter + ": " + line);

                    if(line.length > 0){
                        //Does the line end in a ,                    
                        if(line.slice(-1) === ','){
                            //Eg dedent,                            
                            textToAdd = $scope.ReplaceAll(line, ':before,', '');
                            
                            //No inLineCounter++;        
                        }                                                        
                        else if(inLineCounter % 3 === 0){
                            textToAdd = line;
                            
                            inLineCounter++;
                        } else
                            inLineCounter++;   
                            
                        if(textToAdd)
                            filterOut += 'fontAwesomeOptions.push(\'' + textToAdd + '\');'+ '\n';
                    }            
                }
                
                $scope.FilterOut = filterOut;
            };
            
            self.Initialise();
        }]);
}());
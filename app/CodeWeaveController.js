(function () {
    angular.module('CodeWeaveApp').controller('CodeWeaveController', ['$scope', '$localStorage', 'CodeWeaveService'
    , function ($scope, $localStorage, CodeWeaveService) {
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
                $localStorage.FilterIn = $scope.FilterIn;
            }
            
            self.Initialise = function(){
                // self.ClearStorage();
                
                $scope.Take = $localStorage.Take ? $localStorage.Take : 'Ring around the rosey';
                $scope.WeaveSubstitution = $localStorage.WeaveSubstitution ? $localStorage.WeaveSubstitution : 'rosey';
                $scope.WeaveValues = $localStorage.WeaveValues ? $localStorage.WeaveValues : 'posey\r\nhosey\r\nTrump';             
                $scope.FilterIn = $localStorage.FilterIn ? $localStorage.FilterIn : '';
                
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
                // var result = "";
                                
                // for (var i = 0; i < values.length; i++) {
                //     result += $scope.ReplaceAll($scope.Take, $scope.WeaveSubstitution, values[i]) + "\n";
                //     //Swap {{index} for the counter i
                //     result = $scope.ReplaceAll(result, '{{index}}', i);
                // }
                
                $scope.Result = CodeWeaveService.Weave(values, $scope.Take, $scope.WeaveSubstitution);
            };
            
            $scope.ReplaceAll = function (str, find, replace) {
                if (typeof str === 'undefined' || !str)
                    return '';

                return str.replace(new RegExp(find, 'g'), replace);
            }
                        
            $scope.SwapOrder = function () {
                var values = $scope.WeaveValues.split("\n");
                
                var newValues = CodeWeaveService.SwapOrder(values);
                
                var newWeaveValues = "";
                
                for(var i = 0; i < newValues.length; i++){
                    newWeaveValues += newValues[i] + "\n";
                }
                
                $scope.WeaveValues = newWeaveValues;
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
(function () {
    angular.module('CodeWeaveApp').service('CodeWeaveService', ['$localStorage', function ($localStorage) {
        var me = this;
        
        me.Weave = function(WeaveValues, Take, WeaveSubstitution){     
            var result = "";
                                       
            for (var i = 0; i < WeaveValues.length; i++) {
                result += me.ReplaceAll(Take, WeaveSubstitution, WeaveValues[i]) + "\n";
                
                //Swap {{index} for the counter i
                result = me.ReplaceAll(result, '{{index}}', i);
            }
            
            return result;
        };
        
        me.ReplaceAll = function (str, find, replace) {
            if (typeof str === 'undefined' || !str)
                return '';

            return str.replace(new RegExp(find, 'g'), replace);
        }            
        
        me.SwapOrder = function (WeaveValues) {
            var returnArray = []
            
            for (var i = WeaveValues.length - 1; i >= 0; i--) {
                returnArray.push(WeaveValues[i]);
            }
            
            return returnArray;
        }      
            
        return me;
    }]);
}());
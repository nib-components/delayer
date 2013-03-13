# Delayer

Mix this into objects and they can manage their own timeouts and intervals.

    var delayer = require('delayer');
    var extend = require('extend');
    var myObj = extend({}, delayer);

    myObj.setTimeout('name', 1000, function(){
      console.log('foo!');
    });
    
    myObj.clearTimeout('name');
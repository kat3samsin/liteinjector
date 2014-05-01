//A lightweight IoC container based on Martin Fowler's Inversion of Control Containers and the Dependency Injection pattern.
var injector = {
   dependencies: {},
   addClass: function(qualifier, obj, isSingleton) {
      this.dependencies[qualifier] = {
         obj: obj,
         isSingleton: isSingleton,
         instance: null
      };
   },
   addObject: function(qualifier, obj) {
      this.dependencies[qualifier] = {
         obj: obj,
         isSingleton: false
      };
   },
   hasDependency: function(qualifier) {
      return this.dependencies[qualifier] ? true : false;
   },
   getObject: function (obj) {
      for (var prop in obj) {
         if (this.dependencies[prop]) {
            obj[prop] = this.dependencies[prop].obj;
         }
      }
      return obj;
   },
   getInstance: function(func){
      var obj = new func;
      var dependencies = this.resolveDependencies(func);
      func.apply(obj, dependencies);
      return obj;
   },
   resolveDependencies: function(func) {
      var args = this.getArguments(func);
      var dependencies = [];
      for (var idep = 0; idep < args.length; idep++) {
         //Undefined dependency
         if (!this.dependencies[args[idep]]) {
            dependencies.push(null);
            continue;
         }

         //Set object
         if (this.dependencies[args[idep]].instance === undefined) {
            dependencies.push(this.dependencies[args[idep]].obj);
            continue;
         }

         //Instantiate class
         var instance = this.dependencies[args[idep]].instance;
         var isSingleton = this.dependencies[args[idep]].isSingleton;
         if (isSingleton && instance) {
            dependencies.push(instance);
         } else if (isSingleton && !instance) {
            instance = new this.dependencies[args[idep]].obj();
         } else {
            dependencies.push(new this.dependencies[args[idep]].obj());
         }
      }
      return dependencies;
   },
   getArguments: function(func) {
      //This regex is from require.js
      var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
      var args = func.toString().match(FN_ARGS)[1].split(',');
      return args;
   }
};
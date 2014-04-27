var liteinjector = {
   dependencies: {},

   addDepedency: function(qualifier, obj, isSingleton) {
      if (!isSingleton || !this.dependencies[qualifier]) {
         this.dependencies[qualifier] = new obj();
      }
   },

   hasDependency: function(qualifier) {
      return this.dependencies[qualifier] ? true : false;
   },

   get: function(func) {
      var obj = new func;
      var dependencies = this.resolveDependencies(func);
      func.apply(obj, dependencies);
      return obj;
   },

   resolveDependencies: function(func) {
      var args = this.getArguments(func);
      var dependencies = [];
      for ( var i = 0; i < args.length; i++) {
         dependencies.push(this.dependencies[args[i]]);
      }
      return dependencies;
   },
   
   getArguments: function(func) {
      //This regex is from require.js
      var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
      var args = func.toString().match(FN_ARGS)[1].split(',');
      return args;
   },

   dispose: function() {
      this.dependencies = {};
   }
};
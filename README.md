liteinjector
============

A lightweight IoC container based on Martin Fowler's Inversion of Control Containers and the Dependency Injection pattern.
http://martinfowler.com/articles/injection.html

This library was inspired by Dependency Injection software design pattern that implements inversion of control and allows a program design to follow the dependency inversion principle.

###Get it here
https://raw.githubusercontent.com/kat3samsin/liteinjector/master/liteinjector.js

#Getting Started

###Setup

Create an abstract class.
```js
function AbstractDataSource() {
}

AbstractDataSource.prototype.getData = function() {
};
```

Create different concrete implementations.
```js
function SqlDataSource() {}
SqlDataSource.prototype = Object.create(AbstractDataSource.prototype);
SqlDataSource.prototype.getData = function() { 
    return 'SqlDataSource'; 
}

function AnotherDataSource() {}
AnotherDataSource.prototype = Object.create(AbstractDataSource.prototype);
AnotherDataSource.prototype.getData = function() { 
    return 'AnotherDataSource'; 
}
```

Create a controller.
```js
function DataSourceController(ds) {
    this.ds = ds;
}

DataSourceController.prototype.getData = function() {
    return this.ds.getData();
};
```

###Putting it all together

Add a dependency. 
Use controller argument as the first parameter. (key)
```js
liteinjector.addDependency('ds', new SqlDataSource());
```

Get object with the injected dependency.
```js
var ds = liteinjector.get(DataSourceController);
ds.getData(); //SqlDataSource
```

Add a new dependency. 
```js
liteinjector.addDependency('ds', new AnotherDataSource());
var ds = liteinjector.get(DataSourceController);
ds.getData(); //AnotherDataSource
```

Get full sample source here:
https://raw.githubusercontent.com/kat3samsin/liteinjector/master/sample.js

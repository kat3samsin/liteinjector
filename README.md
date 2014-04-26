liteinjector
============

A super lightweignt Dependency Injection container in JS.

This library was inspired by Dependency Injection software design pattern that implements inversion of control and allows a program design to follow the dependency inversion principle.

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

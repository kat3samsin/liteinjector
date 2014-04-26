liteinjector
============

A super lightweignt Dependency Injection container in JS.

This library was inspired by Dependency Injection software design pattern that implements inversion of control and allows a program design to follow the dependency inversion principle.

#Getting Started

###Setup

Create abstract class
```js
function AbstractDataSource() {
}

AbstractDataSource.prototype.getData = function() {
};
```

Create concrete implementation
```js
function SqlDataSource() {}
SqlDataSource.prototype = Object.create(AbstractDataSource);
SqlDataSource.prototype.getData = function() { 
    return 'SqlDataSource'; 
}

function AnotherDataSource() {}
AnotherDataSource.prototype = Object.create(AbstractDataSource.base.prototype);
AnotherDataSource.prototype.getData = function() { 
    return 'AnotherDataSource'; 
}
```

Create controller
```js
function DataSourceController(ds) {
    this.ds = ds;
}

DataSourceController.prototype.getData() {
    return this.ds.getData();
};
```

###Usage

Add dependency, use Controller argument name for this.
```js
liteinjector.addDependency('ds', new SqlDataSource());
```

Get object with the injected dependency
```js
var ds = liteinjector.get(DataSourceController);
ds.getData(); //SqlDataSource
```
function AbstractDataSource() {
}

AbstractDataSource.prototype.getData = function() {
};

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

function DataSourceController(ds) {
    this.ds = ds;
}

DataSourceController.prototype.getData() {
    return this.ds.getData();
};

liteinjector.addDependency('ds', new SqlDataSource());
var ds = liteinjector.get(DataSourceController);
ds.getData(); //SqlDataSource

liteinjector.addDependency('ds', new AnotherDataSource());
var ds = liteinjector.get(DataSourceController);
ds.getData(); //AnotherDataSource
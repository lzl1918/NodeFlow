'use strict';

var flow = function () {
    this.components = [];
    this.build_temp = null;
};
var flow_add = function (component) {
    if (!(component instanceof Function))
        throw new Error("instance of type " + component + " cannot be added to flow");
    this.components.unshift(component);
    this.build_temp = null;
};
var flow_build = function (callback) {
    if (this.build_temp)
        return this.build_temp;

    var app = (input, next) => { };
    var component;
    var func = (flow_next, input_func) => {
        return (input) => {
            input_func(input, () => flow_next(input));
        };
    };
    for (var i = 0; i < this.components.length; i++) {
        component = this.components[i];
        app = func(app, component);
    }
    if (callback)
        app = func(app, (input, next) => {
            next();
            callback(input);
        });
    return (this.build_temp = app);
};
flow.prototype = {
    constructor: flow,
    add: flow_add,
    build: flow_build
};
module.exports = {
    create: () => new flow(),
};
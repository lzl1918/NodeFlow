# NodeFlow
workflow model for node.js

processing data through middlewares

## Functions
- add: add component to flow
- build: build the flow

## Component
a component is a function with arguments of input data and the next middleware.
```JavaScript
function component(input, next) { };
```
if the component decides not to call the remaining components in the flow, it should not invoke `next`, otherwise, `next()` should be included in its body.

## Build
```JavaScript
var data = { };
var callback = function(data) {
    console.log("process succeeded");
};
var build = flow.build(callback);

// directly call the build result to start the flow
build(data);
```
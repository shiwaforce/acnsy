# rAsync - async revisited

This module is an extension to the popular async module, providing an easy way to combine serial and parallel task execution. With this you can define a workflow of function calls using nested arrays.

## Usage

```
var rAsync = require('r-async');
rAsync(object:[initial data], array:tasks, function:finally);
```

The `r-async` module gives you a single function, which requires three parameters:

- **initial data** : *object* (optional) - you can pass initial data to your tasks, this will be passed to the first codes to be executed as parameter
- **tasks** : *array* - pass the function calls, that you would like to execute. The given calls will execute in series, while nesting further arrays of function calls will alternate between parallel and series execution, as you go more deep in nesting
- **finally** : *function* - pass a function here, which gets executed after the tasks, whether there was any errors or everything run fine

## The tasks

Each task must be defined in the following form, recieving two parameters

```
function(object:params, function:callback){ ... }
```

- **params** : *object* - parameters recieved from previously executed tasks
- **callback** : *function* - execute this, to mark, that the task is finished

The callback must be called with two parameters:

```
callback(Error:error, object:params)
```

- **error** : *Error object or null* - if there was any errors during the execution of the task, then this should recieve the Error object describing the error, else it should be null
- **params** : *object* - the recieved, and optionally altered params object should be sent back to rAsync through this

### Defining serial and parallel execution

Let's look at the task definitions through an example. Supposingly we have five functions, as seen below:

```
function A(params, callback){
	console.log('A');
	callback(null, params);
}
function B(params, callback){
	console.log('B');
	callback(null, params);
}
function C(params, callback){
	console.log('C');
	callback(null, params);
}
function D(params, callback){
	console.log('D');
	callback(null, params);
}
function E(params, callback){
	console.log('E');
	callback(null, params);
}
```

By default, if we just dump these into an array, then rAsync will execute these in series:

```
var tasks = [A, B, C, D, E]; // A -> B -> C -> D -> E
rAsync({}, tasks, function(){});
```

If we introduce an array in the array of tasks, then it's contents will execute in parallel:

```
var tasks = [A, [B, C], D, E]; // A --> B ---> D -> E
                                    \-> C -/
```

Another level of nesting will provide us with changing back to serial execution and further nesting will keep shifting from the two modes.

It is not possible to change the initial mode of execution, but we can always wrap the tasks in multiple arrays and there is no limit for how deep the nesting can go.

```
var tasks = [[A, B, C, D, E]]; // all executed in parallel
```
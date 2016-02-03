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



```
/*
    A
   / \
  B1 B2
   \ /
    C
    |
    D
    |
    E
   / \
  F1 F2a
   |   |
   |  F2b
   \ /
    G
    |
    H
*/
var rAsync = require('r-async');
rAsync([
    A,
    [B1, B2],
    C,
    D,
    E,
    [F1, [F2a, F2b]],
    G],
    H);
```

Each task signature must be
```function(params, callback){...}```
where you must call callback with 2 param:
```callback(error, params)```
where the error contains the error, or null. The params object contains your data which you access from all task and you can modify them.

## A "real" example
If you want to read three files (which contains a number) and save it's sum to database, and after that call a webservice, your code can be like this:
```
//...require your modules
var rAsync = require('r-async');
rAsync({filenames:['one.txt', 'two.txt', 'three.txt']},
    [[readFile, readFile, readFile],
    summarize,
    saveToDatabase,
    callWebservice],function(err,params){
        console.log(err,params)
    });

```
It is much more readable than any other solution.

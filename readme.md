# r-async

This module is an extension to the popular async module, providing an extra layer of code execution above it. With this you can define a workflow of function calls using nested arrays, providing both parallel and synchronous execution.



An easy way to combine serial and parallel tasks, and keep your code readability.

rAsync needs 3 parameter:

- initial object (optional) - you can pass initial data to your tasks
- task definition - an array, which contains tasks, or another array. The odd arrays executing by waterfall, the even arrays executing by parallel - see examples below to understand this.
- the end task, which called always (if error occured, or normal process)

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

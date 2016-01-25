# r-async

An easy way to combine serial and parallel tasks.

rAsync needs 3 paramter:

- initial object - you can pass data to your tasks
- task definition - an array, which contains tasks, or another array. the odd arrays executing by waterfall, the even arrays executing by parallel

```
    A
   / \
  B1 B2
   \ /
    C
    |
    D

var rAsync=require('r-async');
rAsync({},[
    A,
    [B1,B2],
    C],
    D);
```

Each task signature must be
```function(params, callback){...}```
where you must call callback with 2 param:
```callback(error, params)```
where the error contains the error, or null. The params object contains your data which you access from all task and you can modify them.

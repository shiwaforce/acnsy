# Example
## Sum of files
In this example, we have some file in `data` folder, and we will summarize them. Of course, the example is a task (it has task-signature: `function(params, callback)`)

We are set the folder path into initial parameter and initialize result with 0. After that, the first task reads that folder, gets the files, and put the list of filenames into `files` property of params. The most important thing now coming: we are iterate each filename with `.each`. That calls our task with each filenam, which injected into `this` property of our task. The name of the injected property is `item`. We are read the content of the actual file, parse it and store the numeric value into `params.contents` array. After that our last task will summarize the contents array and store the result into `params.result`. At the end we write the result to the console and call the callback (remember, this example is a task too)

The main part of this exapmle is here:

```
acnsy(
	{//initial parameters
		folder: './data',
		result: 0
	},
	[//array of tasks
		getListOfFiles,
		acnsy.each('files', getContentOfAFile),
		summarize
	],
	function (err, params) {//the end callback function
		console.log('the result is', params.result, '- error is', err);
		//the end of process
	}
);
```

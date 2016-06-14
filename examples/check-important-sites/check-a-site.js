/**
 * check a site
 * @author sarkiroka on 2016.05.03.
 */
var http=require('http');
module.exports = function (params, callback) {
	var siteDescriptor = this.item;
	var httpOptions={
		hostname: item.host,
		port: 80,
		path: '/',
		method: 'GET'
	};
	var req=http.request(httpOptions);
	console.log(siteDescriptor);
	req.on('error',function(){
		callback(null, params);

	});
	req.on('end',function(){
		callback(null, params);

	})
	req.end();
};

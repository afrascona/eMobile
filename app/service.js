demoApp.factory('SearchService', function($q,$rootScope,$resource) {
    var _search = {};

    _search.articles = function(opts){
        return $resource(
        	'http://support.expedia.com/cc/kfController/:kfMethod/:prod/:cat/',
        	{prod: opts.prod, cat: opts.cat, kfMethod: opts.kfMethod},
        	{getArticles: { method:'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray:true, responseType:'json' } }
        );
    }

    //isArray is crucial. The article list return above is an array, a single answer is not
    _search.answer = function(opts){
        return $resource(
        	'http://support.expedia.com/cc/kfController/:kfMethod/:ans/',
        	{ans: opts.ans, kfMethod: opts.kfMethod},
        	{getAnswer: { method:'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray:false, responseType:'json' } }
        );
    }

    return _search;
});
/*
demoApp.factory('SearchService', ['$http','$q', function($http, $q) {
    var items = [];
    var last_request_failed = true;
    var promise = undefined;
    return {
        getItems: function() {
            if(!promise || last_request_failed) {
                promise = $resource('http://support.expedia.com/cc/kfController/getAngular/4/35',{}).then(
                function(response) {
                    last_request_failed = false;
                    items = response.data;
                    return items;
                },function(response) {  // error
                    last_request_failed = true;
                    return $q.reject(response);
                });
            }
            return promise;
        },
    };
}])
*/
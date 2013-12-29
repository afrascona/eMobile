demoApp.factory('SearchService', function($resource) {
    var _search = {};

    _search.articles = function(opts){
        return $resource(
        	'http://support.expedia.com/cc/kfController/:kfMethod/:prod/:cat/',
        	{prod: opts.prod, cat: opts.cat, kfMethod: opts.kfMethod},
        	{getArticles: { method:'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray:true, cache: false, responseType:'json' } }
        );
    }

    //isArray is crucial. The article list return above is an array, a single answer is not
    _search.answer = function(opts){
        return $resource(
        	'http://support.expedia.com/cc/kfController/:kfMethod/:ans/',
        	{ans: opts.ans, kfMethod: opts.kfMethod},
        	{getAnswer: { method:'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray:false, cache: false, responseType:'json' } }
        );
    }

    return _search;
});
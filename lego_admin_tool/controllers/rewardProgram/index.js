'use strict'

module.exports = function(router){
	router.get('/create',function(req,res){
		res.render('create_punchcard');
	});
};
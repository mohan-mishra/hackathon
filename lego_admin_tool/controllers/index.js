'use strict';
var stage_info = require('../models/stage_details');

var request = require('request');


module.exports = function (router) {

    router.get('/punchcard', function(req, res){
        res.render('punchcard');
    });

    router.get('/hack', function(req, res){
        res.render('hack');
    });

router.get('/test', function(req, res){
        res.render('test');
    });

router.post('/receive_event', function(req, res){
        console.log(req.body.blueprint_code);
        var stages = stage_info();
        var and = '&';
        var blueprint_code = 'blueprint-code=' + req.body.blueprint_code;
        var myurl = stages.lego + '/v1/workflow/events/ACTIVITY_STOREEVENT?verbose=1' + and + blueprint_code;
        console.log(req.body.event_data);
        var options = {
            url: myurl,
            method: "POST",
            json: JSON.parse(req.body.event_data),
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"],"auth_state":"LOGGEDIN"}}]}'
            },
            agentOptions: {
                rejectUnauthorized:false,
                secureProtocol: 'TLSv1_method'
            }
        };
        var datum;
    function callback(error, response, body) {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
        console.log("error" + error);  
        }
        else{
            console.log("body:" + JSON.stringify(body));
            res.send(body);
        }
    }
    request(options, callback);
    });





router.post('/hack_create_blueprint', function(req, res){
        //console.log(JSON.parse(req.body.blueprint));
        var stages = stage_info();
        var myurl = stages.lego + '/v1/workflow/blueprints';
        var options = {
            url: myurl,
            method: "POST",
            json: req.body.blueprint,
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"],"auth_state":"LOGGEDIN"}}]}',
                'Accept':'application/json'
            },
            agentOptions: {
                rejectUnauthorized:false,
                secureProtocol: 'TLSv1_method'
            }
        };
        var datum;
    function callback(error, response, body) {
        console.log(response.statusCode);
        if (response.statusCode != 200) {
        console.log("error  " + error);  
        }
        else{
            console.log("body:" + JSON.stringify(body));
            res.send(body);
        }
    }
    request(options, callback);
    });



router.get('/hack_show_blueprints',function(req,res){
    console.log("RECEIVED!");
    var myurl = "https://10.24.132.67:8443/v1/workflow/blueprints";
    var options = {
            url: myurl,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"],"auth_state":"LOGGEDIN"}}]}'
            },
            agentOptions: {
                rejectUnauthorized:false,
                secureProtocol: 'TLSv1_method'
            }
        };
    var datum;
    function callback(error, response, body) {
        if (response.statusCode != 200) {
        console.log(error);  
        }
        else{
            res.render('hack_show_blueprints', {result:body});
        }
    }
    request(options, callback);
});




router.get('/create_blueprint',function(req,res){
    res.render('create_blueprint');
});

router.get('/create_blueprint_2',function(req,res){
    res.render('create_blueprint_2');
});

/*
router.get('/execute_blueprint',function(req,res){
    var stages = stage_info();
    var myurl = stages.lego + '/v1/workflow/blueprints/paypal-debitcard-2-percent-cashb';
    console.log(myurl);
    var options = {
            url: myurl,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"],"auth_state":"LOGGEDIN"}}]}'
            },
            agentOptions: {
                rejectUnauthorized:false,
                secureProtocol: 'TLSv1_method'
            }
        };
    function callback(error, response, body) {
        if (response.statusCode != 200) {
        console.log(error);  
        }
        else{
            console.log("body:" + JSON.stringify(body));
        }
    }
    request(options, callback);
    res.render('blueprint_execution');
});
*/

router.get('/select_blueprint', function(req, res){
    res.render('select_blueprint');
});

router.post('/paint_blueprint', function(req, res){
    var blueprint_code = req.body.blueprint_code;
    console.log("BC:"+blueprint_code);
    var stages = stage_info();
    var myurl = stages.lego + '/v1/workflow/blueprints/' + blueprint_code;
    var options = {
            url: myurl,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"1904240305531682537","auth_claims":["CLIENT_ID","CLIENT_SECRET"],"auth_state":"LOGGEDIN"}}]}'
            },
            agentOptions: {
                rejectUnauthorized:false,
                secureProtocol: 'TLSv1_method'
            }
        };
    var datum;
    function callback(error, response, body) {
        if (response.statusCode != 200) {
        console.log(error);  
        }
        else{
            res.render('blueprint_execution', {result: {datum: body}});
        }
    }
    request(options, callback);
});

router.post('/call_update_reward',function(req,res){
    var myurl = 'http://stage2p2569.qa.paypal.com:13903/v1/loyalty/reward-programs/';
        myurl = myurl + req.body.program_code;
        
        var patch_operations_json = {};

        var patch_operations_array = [
    {
        "path": "locales",
        "value":[
        {
            "locale_name": req.body.locale_name,
            "program_name": req.body.program_name,
            "terms_and_conditions_url": "https://t&c",
            "program_description": req.body.program_description,
            "merchant_display_name": "MerchantName"
        }
        ]
    },
    {
        "path": "program_start_time",
        "value": req.body.program_start_time
    },
    {
        "path": "program_end_time",
        "value": req.body.program_end_time
    },
    {
      "path": "lifecycle_status",
      "value": req.body.lifecycle_status
    }];



    if(req.body.flag_max_reward_count == "1")
    {
        patch_operations_array.push({
            "path": "reward_model/max_reward_count",
            "value": parseInt(req.body.max_reward_count)
        });
        console.log("pushed max_reward_count");
    }

    if(req.body.flag_value_issued_currency == "1" || req.body.flag_value_issued_value == "1")
    {
        patch_operations_array.push({
            "path": "reward_model/reward_offer_spec/value_issued",
            "value": {
                "currency": req.body.value_issued_currency,
                "value": req.body.value_issued_value
            }
        });
        console.log("pushed value issued");
    }


    patch_operations_json = {"patch_operations" : patch_operations_array};

        
    var options = {
            url: myurl,
            method: "PATCH",
            json: true,
            body: patch_operations_json,
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-CONTEXT':'{    "actor":{       "account_number":"1295150850254643549",       "id":"85390",       "auth_claims":[          "USERNAME",          "PASSWORD"       ]    },    "scopes":[       "https://uri.paypal.com/services/loyalty/reward-programs/view",       "https://uri.paypal.com/services/loyalty/reward-programs/update",     "https://uri.paypal.com/services/loyalty/reward-enrollment/view",     "https://uri.paypal.com/services/loyalty/reward-enrollment/update"      ],    "subjects":[       {          "subject":{             "account_number":"1295150850254643549",             "id":"85390","auth_claims":[                "USERNAME",                "PASSWORD"             ],             "auth_state":"LOGGEDIN"          }       }    ] }'
            }
        };

        function callback(error, response, body) {
        
        if (response.statusCode != 200) {
        var send_data = { code: response.statusCode, data: body };
        res.end(JSON.stringify(send_data));
        console.log("Error: " + error);  
        }

        else{
            console.log(JSON.stringify(body));
            res.send(JSON.stringify(body));
        }
        
        }
    request(options, callback); 
    console.log('Garvit Jain');
});

router.post('/',function(req,res){
	//res.render('temp_index');
var un = req.body.username;
var pw = req.body.password;
console.log("Username: " + un);
console.log("Password: " + pw);

//res.render('temp_index');

var config = {
    scheme: 'http',
    host: 'stage2std095.qa.paypal.com',
    port: '12254',
    path: '/webapps/servicebridge/services/invoke',
    rejectUnauthorized: false
};

var AdminAuthServ = require("../models/login/node-adminauthserv/index.js");
var adminauthservClient = new AdminAuthServ(config);
//var assert = require('assert');
//"allcspt"
//"111111$$"
		var payload = {
			username: un,
      		password: pw
		};
		
		adminauthservClient.login(payload, function (error, result) {
			//assert(!error && result && result.body);
			//assert(result.statusCode === 200);
			//assert(result.body.operationResult === 0);
			console.log("authenticatedToken: " + result.body.authenticatedToken);
			console.log("Error: " + error);
		});

});        

    router.get('/',function(req,res){
    	console.log("Hello");
	res.render('login');
});



    router.get('/create_reward',function(req,res){
    	res.render('create_reward_punchcard');
    });


    router.get('/get_reward_details',function(req,res){
        var myurl = "http://stage2p2569.qa.paypal.com:13903/v1/loyalty/reward-programs/";
        myurl = myurl + req.query.program_code;
        console.log("myurl : " + myurl);
        var options = {
    url: myurl,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    'X-PAYPAL-SECURITY-CONTEXT':'{    "actor":{       "account_number":"1295150850254643549",       "id":"85390",       "auth_claims":[          "USERNAME",          "PASSWORD"       ]    },    "scopes":[       "https://uri.paypal.com/services/loyalty/reward-programs/view",       "https://uri.paypal.com/services/loyalty/reward-programs/update",     "https://uri.paypal.com/services/loyalty/reward-enrollment/view",     "https://uri.paypal.com/services/loyalty/reward-enrollment/update"      ],    "subjects":[       {          "subject":{             "account_number":"1295150850254643549",             "id":"85390","auth_claims":[                "USERNAME",                "PASSWORD"             ],             "auth_state":"LOGGEDIN"          }       }    ] }'
    }
    };

    function callback(error, response, body) {
        console.log(error);
        var data = JSON.parse(body);
        //res.json(data);
        res.render('edit_reward_here',{dup_data:data});
    }
    request(options, callback);
    });



router.get('/edit_reward',function(req,res){
        console.log("Hello");
        var options = {
    url:'http://stage2p2569.qa.paypal.com:13903/v1/loyalty/reward-programs',
    method: 'GET',
    qs: {
        "count": 1000,
        "start_index": 0
    },
    headers: {
        'Content-Type': 'application/json',
    'X-PAYPAL-SECURITY-CONTEXT':'{    "actor":{       "account_number":"1295150850254643549",       "id":"85390",       "auth_claims":[          "USERNAME",          "PASSWORD"       ]    },    "scopes":[       "https://uri.paypal.com/services/loyalty/reward-programs/view",       "https://uri.paypal.com/services/loyalty/reward-programs/update",     "https://uri.paypal.com/services/loyalty/reward-enrollment/view",     "https://uri.paypal.com/services/loyalty/reward-enrollment/update"      ],    "subjects":[       {          "subject":{             "account_number":"1295150850254643549",             "id":"85390","auth_claims":[                "USERNAME",                "PASSWORD"             ],             "auth_state":"LOGGEDIN"          }       }    ] }'
    }
    };

    function callback(error, response, body) {
       
        console.log(error);
        var data = JSON.parse(body);
        res.render('edit_reward_program', {mydata: data});
    }
    request(options, callback);
    //res.render('edit_reward_program');
});


router.post('/create_reward',function(req,res){

		if(req.body.end_meridian == 'PM'){
    		req.body.payout_end_hour += 12;
    	}

    	if(req.body.payout_end_hour < 10){
    		req.body.payout_end_hour = '0' + req.body.payout_end_hour;
    	}

        if(req.body.start_meridian == 'PM'){
            req.body.payout_start_hour += 12;
        }

        if(req.body.payout_start_hour < 10){
            req.body.payout_start_hour = '0' + req.body.payout_start_hour;
        }

        var user_countries = [];
        user_countries.push(req.body.reward_country);

        var issuers = [];
        issuers.push(req.body.payout_funding_account_number);

    	var payout_end_date = req.body.payout_end_date + ' ' + req.body.payout_end_hour + ':00:00';
        var payout_start_date = req.body.payout_start_date + ' ' + req.body.payout_start_hour + ':00:00';
    	console.log("payout_end_date:" + payout_end_date);
		var psb_json = {
			"offer_program_code": "COFFEE_CCD_1ON10",
            "offer_type": "PSB",  
            "currency_code": req.body.payout_discount_currency,  
            
            "budget_amount": parseInt(req.body.payout_budget,10),  
            "issuers": issuers,
            "funder_account_number": req.body.payout_funding_account_number,  
            "funding_type": req.body.payout_funding_type,  
            "is_transferable": false,  
            "is_targeted": false,  

            "redemption_start_time": payout_start_date,
            "redemption_end_time": payout_end_date,  
            "lifecycle_status": "ENABLED",  
            "localized_attributes": [
                {
                    "locale_code": req.body.reward_locale_code,
                    "title": req.body.reward_campaign_name,
                    "sub_title": "CS_test",  //not required
                    "description": req.body.reward_campaign_details
                }
            ],
            "stackable_code": "ALL",  //default
            "is_refundable": true,  //default
            
            "applicable_level": "CART",  //default
            "discount_level": "ITEM_TOTAL",  //default
            "applicability_rule": {        //default
                "cart_rule": {
                    "redemption_channels": "ALL",
                    "min_cart_amount": parseInt(req.body.payout_min_purchase_amount,10)
                },
                "user_rule": {    
                    "user_countries": user_countries
                }
            },
            "computation_rules": [
                {
                    "offer_value": {
                        "type": "FIXED",    //default
                        "value": parseInt(req.body.payout_discount_value,10),    //discount value
                        "max_discount": 1000    //default
                    },
                    "cart_rule": {
                        "min_cart_amount": parseInt(req.body.payout_min_purchase_amount,10),    //user input - minimum purchase amount
                        "min_cart_total": parseInt(req.body.payout_min_purchase_amount,10)
                    }
                }
            ],
            "tethering_type_code": "TETHERED"    //default
		};
		



		var options = {
    url:'http://stage2dev177.qa.paypal.com:13229/v1/offers/programs/',
	method: 'POST', 
    json: psb_json,
    headers: {
    	'Content-Type': 'application/json',
    	'Accept': 'application/json',
	'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"0","id":"0","auth_claims":["USERNAME","PASSWORD"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"0","auth_claims":["USERNAME","PASSWORD"],"auth_state":"LOGGEDIN"}}]}]}'
	}
	};

    var offer_program_id_from_psb;

    var final_results = [];

	function callback(error, response, body) {
		/*
		if (!error && response.statusCode == 200) {
		var responseJson={ code: response.statusCode, data: body};
		res.end(JSON.stringify(responseJson));	
		}
		else{
		var responseJson={ code: response.statusCode, data: body};
		res.end(JSON.stringify(responseJson));
		}
		*/
        final_results.push(JSON.stringify(body));
		console.log(error);
        offer_program_id_from_psb = body.offer_program_id;
        create_reward_program(offer_program_id_from_psb);
        console.log(JSON.stringify(body));
	}

	request(options, callback); 

    function callback_rewards(error, response, body){
        console.log(error);
        console.log(JSON.stringify(body));
        final_results.push(JSON.stringify(body));
        res.end(JSON.stringify({"result": final_results}));
    }

    function create_reward_program(offer_program_id){

        var reward_json = {
            "program_code": "COFFEE_CCD_1ON10",  //auto-generated
            "program_type": "DG_NUMBER_BASED_PUNCHCARD",  //default
            "lifecycle_status": "ENABLED",  //default
            "program_start_time": req.body.reward_start_date+"T00:00:00Z",        
            "program_end_time": req.body.reward_end_date+"T00:00:00Z",
            "enrollment_lockdown_time": req.body.reward_end_date+"T00:00:00Z",  //same as program_end_time
  
            "auto_enroll_flag": true,
            "merchants": [
                "EU8KBHZF3ZXPY"
            ],
            "locales": [
                {
                    "locale_name": req.body.reward_locale_code,
                    "program_name": req.body.reward_campaign_name,
                    "terms_and_conditions_url": "http://paypal.com/rewards/program/toc",
                    "program_description": req.body.reward_campaign_details
                }
            ],
            "reward_eligibility_criteria": {
            "grace_period": 0,
            "goals": [
                {
                    "name": req.body.reward_type,   //reward type
                    "description": req.body.reward_campaign_description,
                    "value": parseInt(req.body.reward_fb_min_visit_count)  //values
                }
            ]
            },
            "reward_model": {
                "max_reward_count": parseInt(req.body.max_reward_count),
                "reward_claim": "automatic",
                "reward_type": "OFFER",
                "reward_offer_spec": {
                    "offer_program_id": offer_program_id,  //offer_program_id
                    "value_issued": {
                        "currency": req.body.payout_discount_currency,
                        "value":100
                    },
                    "redemption_period_in_days": 20
                }
            },
            "event_qualification_criteria": {   
                "payment_event" : {
                    "minimum_transaction_amount":{
                        "currency": req.body.payout_discount_currency,
                        "value": parseInt(req.body.reward_fb_min_spent)
                    }
                }
            }
        };   //json ends here


        var options_rewards = {
    url:'http://stage2p2569.qa.paypal.com:13903/v1/loyalty/reward-programs/',
    method: 'POST', 
    json: reward_json,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    'X-PAYPAL-SECURITY-CONTEXT':'{    "actor":{       "account_number":"1295150850254643549",       "id":"85390",       "auth_claims":[          "USERNAME",          "PASSWORD"       ]    },    "scopes":[       "https://uri.paypal.com/services/loyalty/reward-programs/view",       "https://uri.paypal.com/services/loyalty/reward-programs/update",     "https://uri.paypal.com/services/loyalty/reward-enrollment/view",     "https://uri.paypal.com/services/loyalty/reward-enrollment/update"      ],    "subjects":[       {          "subject":{             "account_number":"1295150850254643549",             "id":"85390","auth_claims":[                "USERNAME",                "PASSWORD"             ],             "auth_state":"LOGGEDIN"          }       }    ] }'
    }
    };
    request(options_rewards, callback_rewards);
    }
	});   //end of POST request create_reward


};

'use strict';
var request = require('request');

module.exports = function(router){

   router.get('/edit',function(req,res){
        var myurl = "http://stage2dev177.qa.paypal.com:13229/v1/offers/programs/";
        myurl = myurl + "ETGW4GU33H476";//req.query.offer_program_id;
        console.log("myurl : " + myurl);
        
        var options = {
    url: myurl,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"0","id":"0","auth_claims":["USERNAME","PASSWORD"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"0","auth_claims":["USERNAME","PASSWORD"],"auth_state":"LOGGEDIN"}}]}]}'
    }
    };

    function callback(error, response, body) {
        console.log(error);
        var data = JSON.parse(body);
        //res.json(data);
        res.render('edit_psb_here',{dup_data:data});
    }
    request(options, callback);
    });

   router.post('/edit_psb_here', function(req,res){

    var myurl = "http://stage2dev177.qa.paypal.com:13229/v1/offers/programs/" + req.body.offer_program_id;
    console.log("patchURL: " + myurl);

    var patch_psb_array = [];

    if(req.body.flag_lifecycle_status == "1")
    {
        patch_psb_array.push({
            "path": "lifecycle_status",
            "value": req.body.lifecycle_status
        });
    }


    if(req.body.flag_offer_type == "1")
    {
        patch_psb_array.push({
            "path": "offer_type",
            "value": req.body.offer_type
        });
    }

    if(req.body.flag_currency_code == "1")
    {
        patch_psb_array.push({
            "path":"currency_code",
            "value":req.body.currency_code
        })
    }

    if(req.body.flag_discount_value == "1" || req.body.flag_min_cart_amount == "1")
    {
        patch_psb_array.push({
            "path":"computation_rule",
            "value": [
                {
                    "offer_value": {
                        "type": "FIXED",
                        "value": parseInt(req.body.discount_value,10),
                        "max_discount": parseInt(req.body.discount_value,10)
                    },
                    "cart_rule": {
                        "min_cart_amount": parseInt(req.body.min_cart_amount)
                    }
                }
            ]
        })
    }

    patch_psb_array.push({
        "path":"localized_attributes",
        "value": [
        {
            "locale_code": req.body.locale_code,
            "title": req.body.title,
            "sub_title": "PSBsubtitle",
            "description": req.body.description
        }]
    });

    if(req.body.flag_redemption_start_time == "1")
    {
        patch_psb_array.push({
            "path":"redemption_start_time",
            "value":req.body.redemption_start_time 
        });
    }

    if(req.body.flag_redemption_end_time == "1")
    {
        patch_psb_array.push({
            "path":"redemption_end_time",
            "value":req.body.redemption_end_time 
        });
    }

    if(req.body.flag_funding_type == "1")
    {
        patch_psb_array.push({
            "path":"funding_type",
            "value":req.body.funding_type 
        });
    }

    if(req.body.flag_funder_account_number == "1")
    {
        patch_psb_array.push({
            "path":"funder_account_number",
            "value":req.body.funder_account_number 
        });
    }

    if(req.body.flag_budget_amount == "1")
    {
        patch_psb_array.push({
            "path":"maximum_issuable_amount",
            "value":req.body.budget_amount
        });
    }

    var patch_psb_json = {
        "patch_operations": patch_psb_array
    };

    console.log("patch_psb_array: " + JSON.stringify(patch_psb_json));
   
    var options = {
    url: myurl,
    method: 'PATCH',
    json: patch_psb_json,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    'X-PAYPAL-SECURITY-CONTEXT':'{"actor":{"account_number":"0","id":"0","auth_claims":["USERNAME","PASSWORD"]},"scopes":["*"],"subjects":[{"subject":{"account_number":"0","auth_claims":["USERNAME","PASSWORD"],"auth_state":"LOGGEDIN"}}]}]}'
    }
    };

    function callback(error, response, body) {
        console.log(error);
        //var data = JSON.parse(body);
        //res.json(data);
        //res.render('edit_psb_here',{dup_data:data});
        res.end(JSON.stringify(body));
    }
    request(options, callback);
    });




	
	router.get('/create',function(req,res){
    	console.log("In Dummy!");
	res.render('create_psb',{reward_data : req.query});
	});

	router.post('/create',function(req,res){

		if(req.body.end_meridian == 'PM'){
    		req.body.psb_end_hour += 12;
    	}

    	if(req.body.psb_end_hour < 10){
    		req.body.psb_end_hour = '0' + req.body.psb_end_hour;
    	}

    	var psb_end_date = req.body.psb_end_date + ' ' + req.body.psb_end_hour + ':00:00';
    	console.log("psb_end_date:" + psb_end_date);
		var psb_json = {
			"offer_program_code": "psb_auto"/*to be generated automatically*/,
            "offer_type": "PSB",  //default
            "currency_code": "USD",//req.body.psb_discount_currency,  //user input
            
            "maximum_issuable_amount": parseInt(req.body.psb_budget,10),  //user input
            
            "funder_account_number": req.body.psb_funding_account_number,  //user input
            "funding_type": req.body.psb_funding_type,  //user input
            "is_transferable": false,  //default
            "is_targeted": false,  //default

            "redemption_end_time": psb_end_date,  //user input
            "lifecycle_status": "ENABLED",  //default
            "localized_attributes": [
                {
                    "locale_code": req.body.psb_locale_code,
                    "title": req.body.psb_campaign_name,
                    "sub_title": "CS_test",  //not required
                    "description": req.body.psb_campaign_details
                }
            ],
            "stackable_code": "ALL",  //default
            "is_refundable": true,  //default
            
            "applicable_level": "CART",  //default
            "discount_level": "ITEM_TOTAL",  //default
            "applicability_rule": {        //default
                "cart_rule": {
                    "redemption_channels": "ALL"
                },
                "user_rule": {    
                    "user_countries": [    //user input
                        "US"    
                    ]
                }
            },
            "computation_rules": [
                {
                    "offer_value": {
                        "type": "FIXED",    //default
                        "value": parseInt(req.body.psb_discount_value,10),    //discount value
                        "max_discount": 1000    //default
                    },
                    "cart_rule": {
                        "min_cart_amount": parseInt(req.body.psb_min_purchase_amount,10)    //user input - minimum purchase amount
                    }
                }
            ],
            "custom_data": [    //don't care
                {
                    "name": "IS_REWARD",
                    "value": "false"
                },
                {
                    "name": "MEMO",
                    "value": "admin pie tool - create psb campaign"
                },
                {
                    "name": "REDEEMABLE_SITE",
                    "value": "PAYPAL"
                },
                {
                    "name": "SHARING",
                    "value": "false"
                }
            ],
           
            "tethering_type_code": "TETHERED"    //default
		};
		
		console.log("psb_json: " + psb_json.offer_program_code);

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
		console.log(error);
		console.log(JSON.stringify(body));
		res.end(JSON.stringify(body));
	}
	request(options, callback); 
	});

};


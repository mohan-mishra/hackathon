$(function(){
	$('#reward_type').change(function(){
		if($('#reward_type').val() === "frequency_based"){
			$('#_amount_based').hide();
			$('#_frequency_based').show(500);
		}
		else{
			$('#_frequency_based').hide();
			$('#_amount_based').show(500);
		}

	});

	var jsondata;

	$.getJSON('../countries_currency.json', function(data){
        jsondata = data;
        var html = '';
        var html3 = '';
        var len = data.countries.length;
        var html1 = '';
        for (var i = 0; i< len; i++) {
            html1 += '<option value="' + data.countries[i].country_code + '">' + data.countries[i].country_name + '</option>';
        }
        $('#reward_country').append(html1);

        var html_default_language = '';
        var temp_len = data.countries[0].language.length;
        for(var i=0; i<temp_len; i++)
        {
            html_default_language += '<option value="' + jsondata.countries[0].language[i] + '">' + jsondata.countries[0].language[i] + '</option>';
        }
        $('#reward_locale_code').append(html_default_language);

        for(var i = 0; i< len; i++){
        	html3 += '<option value="' + jsondata.countries[i].currency_code + '">' + jsondata.countries[i].currency_code + '</option>';
        }
        $('#payout_discount_currency').append(html3);
    });    //getJSON ends here

    $('#reward_country').change(function(){
        $('#reward_locale_code').empty();
        var html2 = '';
        var len = jsondata.countries.length;
        var index;
        console.log($("#reward_country option:selected").text());
        for(var i = 0; i< len; i++)
        {
            if(jsondata.countries[i].country_name == $("#reward_country option:selected").text())
            {
                index = i;
                break;
            }
        }
        var len1 = jsondata.countries[index].language.length;
        for (var i = 0; i< len1; i++) {
            html2 += '<option value="' + jsondata.countries[index].language[i] + '">' + jsondata.countries[index].language[i] + '</option>';
        }
        $('#reward_locale_code').append(html2);
    });

    if($('#payout_type').val() == "psb"){
    	$('#hidden').show(1000);
    }
    else{
    	$('#hidden').hide();
    }

    $('#payout_type').change(function(){
    	if($('#payout_type').val() == "psb")
    	{
    		$('#hidden').show(1000);
    	}
    	else{
    		$('#hidden').hide();
    	}

    });


    //$('.reward_form')


});
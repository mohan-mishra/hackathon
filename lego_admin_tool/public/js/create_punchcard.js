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
        var len = data.countries.length;
        var html1 = '';
        for (var i = 0; i< len; i++) {
            html1 += '<option value="' + data.countries[i].country_code + '">' + data.countries[i].country_name + '</option>';
        }
        $('#reward_country').append(html1);

    });

});
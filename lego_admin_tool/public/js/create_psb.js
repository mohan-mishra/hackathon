
$(function(){
    console.log("Logging data garvit!");
    var jsondata;
    $.getJSON('../countries_currency.json', function(data){
        jsondata = data;
        var locale_codes='';
        var html = '';
        var len = data.countries.length;
        for (var i = 0; i< len; i++) {
            html += '<option value="' + data.countries[i].currency_code + '">' + data.countries[i].currency_code + '</option>';
        }

        $('#psb_discount_currency').append(html);


/*
        for(var i = 0; i < len; i++){
            console.log(jsondata.countries[i].country_code);
            if($('#psb_country_value').val() == jsondata.countries[i].country_code)
            {
                for(var j=0; j<jsondata.countries[i].language.length; j++){
                    locale_codes += '<option value="' + jsondata.countries[i].language[j] + '">' + jsondata.countries[i].language[j] + '</option>';
                }
                break;
            }
        }
        $('#psb_locale_code').append(locale_codes);
*/

        var html1 = '';
        for (var i = 0; i< len; i++) {
            html1 += '<option value="' + data.countries[i].country_code + '">' + data.countries[i].country_name + '</option>';
        }
        $('#psb_country_value').append(html1);


        var html_default_language = '';
        var temp_len = data.countries[0].language.length;
        for(var i=0; i<temp_len; i++)
        {
            html_default_language += '<option value="' + jsondata.countries[0].language[i] + '">' + jsondata.countries[0].language[i] + '</option>';
        }
        $('#psb_locale_code').append(html_default_language);
        });



    $('#psb_country_value').change(function(){
        $('#psb_locale_code').empty();
        var html2 = '';
        var len = jsondata.countries.length;
        var index;
        console.log($("#psb_country_value option:selected").text());
        for(var i = 0; i< len; i++)
        {
            if(jsondata.countries[i].country_name == $("#psb_country_value option:selected").text())
            {
                index = i;
                break;
            }
        }
        var len1 = jsondata.countries[index].language.length;
        for (var i = 0; i< len1; i++) {
            html2 += '<option value="' + jsondata.countries[index].language[i] + '">' + jsondata.countries[index].language[i] + '</option>';
        }
        $('#psb_locale_code').append(html2);
    });


    $('#psb_discount_value').change(function(){
        var str = $('#psb_discount_value').val();
        var patt = new RegExp(/^\d+$/);
        if(patt.test(str)){
            $('#psb_discount_value_error').text('');
        }
        else{
            $('#psb_discount_value_error').text('*only numbers allowed');
        }

    });

    $('#psb_min_purchase_amount').change(function(){
        var str = $('#psb_min_purchase_amount').val();
        var patt = new RegExp(/^\d+$/);
        if(patt.test(str)){
            console.log('true');
            $('#psb_min_purchase_amount_error').text('');
        }
        else{
            $('#psb_min_purchase_amount_error').text('*only numbers allowed');
        }

    });

    $('#psb_budget').change(function(){
        var str = $('#psb_budget').val();
        var patt = new RegExp(/^\d+$/);
        if(patt.test(str)){
            console.log('true');
            $('#psb_budget_error').text('');
        }
        else{
            $('#psb_budget_error').text('*only numbers allowed');
        }

    });
});



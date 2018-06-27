$(function(){
    $('.blogPrevText').each(function(event){ 
        var max_length = 300; 

        if($(this).html().length > max_length){ 
            var short_content   = $(this).html().substr(0,max_length); 
            var long_content    = $(this).html().substr(max_length);

            $(this).html(short_content+
                '...'+
                '<span class="more_text" style="display:none;">'+long_content+'</span>');
        }
    });
});

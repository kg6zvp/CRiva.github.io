$(document).ready(function() {
    $("#palleteChanger").click(function(){
        $.ajax({
            url: 'http://colormind.io/api/',
            type: 'GET',
            data: {model: 'default'}
        })
        .done(function(e) {
            console.log("success");
            console.log(e);

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
        
    })
});
$(document).ready(function() {
    $("#palleteChanger").click(function(){
        $.ajax({
            url: 'https://coolors.co/browser/latest/1',
            type: 'GET',
            dataType: 'html'
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
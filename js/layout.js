$(document).ready(function() {
    $(".projects").css("width","99%")
    window.setTimeout(back_to_normal,1000);
});

function back_to_normal() {
    $(".projects").css("width","100%")
}
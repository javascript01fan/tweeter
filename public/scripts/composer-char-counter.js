$(document).ready(function(){
    let decrement =5
$('#txt').on('keypress',function(e){
    $('#counter').text(decrement--)
    if(decrement < 0 ){
        $('#counter').css({"color":"red"})
    }

 
})

 
});
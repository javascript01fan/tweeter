$(document).ready(function(){
    let maxCounter = 140
$('#txt').on('keydown',function(e){
    let textInput = $(this).val().length 
    $('#counter').text(maxCounter  - textInput )
   if($(this).val().length  >= maxCounter ){
    $('#counter').css({"color":"red"})
   }else{
    $('#counter').css({"color":"black"})
   }


}) 

 
});
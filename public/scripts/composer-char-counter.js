$(document).ready(function(){
    let maxCounter = 14
$('#txt').on('keydown',function(e){
    let textInput = $(this).val().length + 1
    $('#counter').text(maxCounter  - textInput )
   if($(this).val().length  >= maxCounter ){
    $('#counter').css({"color":"red"})
   }else{
    $('#counter').css({"color":"black"})
   }


}) 

 
});
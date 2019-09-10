$(document).ready(function(){
    let increment =1
$('#txt').on('keypress',function(e){

 $('#counter').text($('#txt').val().length +1)
 console.log(('#counter').text())
})
/* function textLength(value){
    const maxLength = 20
    if(value.length > maxLength){
        return true
    }
}
 */

 /*   $('#counter').text(increment++)
    if(increment === 5 ){
        increment =  increment * -1
    } */




 /*    let counter = 0
   
    $('#txt').keyup(function(e){
        if(e.which === 8){
            $('#counter').text(counter--)
            console.log(e.which)
        }
      $('#counter').text(counter++)
    })
   */
 
});
$(document).ready(function() {
  //RENDERS THE DATA ON THE TWEET APPLICATION 
  renderTweets(data)

//create an AJAX POST request 
const form = $('#tweet-form')
form.on('submit',(evt)=>{
  console.log('About to submit form!!!')
  evt.preventDefault()
  let tweet_content = $(".tweetMessage").val()
  console.log(tweet_content)
  $.ajax({
    url:'/tweets/',
    type:'POST',
    data:{
      text:tweet_content,
    }
  }).done(data=>{
    console.log(data)
    console.log('success!!!')
  }).fail((err)=>{
    console.log('error',err)
  }).always(()=>{
    console.log('completed!!!')
  })
  evt.preventDefault()
})
loadTweets('GET',' http://localhost:8080/tweets',renderTweets)

});
//*_*_*_*_*_*_*_*__*__*_*_*_*__**_*_*_*__
//Function to check form validation 
const formValidation = function(char,inputValue){
  if(char > 140 ){
    alert('You are over 140 characters!!!!')
  }if(inputValue === ''){
    alert
  }
}

//_+_+_+_+_+_+_+_+_+_+_++_+_+_+_+_+_+_
//Function load tweets
const loadTweets = function(method,url,cb){
$.ajax({
  method,
  url
}).done(response =>{
cb(response)
  console.log(response)
})
}










const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
//function Redner Tweets
const renderTweets = function(tweets) {
    // loops through tweets
  return  tweets.forEach(obj => {
        $("#tweetsDisplay").append(createTweetElement(obj))    
    });
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

const createTweetElement = function(data) {
  let element = $(` <article class="tweets">
 <header>
   <div class="headerWrapper">
     <img class="profileImg" src=${data.user.avatars}>
     <span> ${data.user.name} </span>
   </div>
   <span class="userEmail"> ${data.user.handle} </span>
 </header>
 <section>
   <span> ${data.content.text} </span>
   <hr>
 </section>
 <footer>
   <span> ${data.created_at} </span>
   <div class="iconsWrapper">
       <i class="fas fa-flag"></i>
       <i class="fas fa-retweet"></i>
       <i class="fas fa-heart"></i>
   </div>
 </footer>
</article>`);
return element
};




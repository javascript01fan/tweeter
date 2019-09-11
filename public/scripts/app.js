$(document).ready(function() {
  renderTweets(data)
});

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




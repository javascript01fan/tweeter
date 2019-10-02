$(document).ready(function() {
 
  $("#errMessage").hide();
  $(".new-tweet").slideUp();
  scrollDown(".fas");
  const form = $("#tweet-form");

  //Submit form
  form.on("submit", evt => {
    evt.preventDefault();
    let tweet_content = escapedChar($(".tweetMessage").val());
    formValidation(tweet_content);
    $("body").on("click", () => {
      $("#errMessage").slideUp();
    });
  });
  //Load tweets
  loadTweets("GET", " http://localhost:8080/tweets", renderTweets);
});

//Function to prevent XSS
function escapedChar(str) {
  if (typeof jQuery !== "undefined") {
    return jQuery("<div/>")
      .text(str)
      .html();
  }
}

//Reset Form afer submission
const resetForm = function() {
  const maxCounterReset = 140;
  $("#txt").val("");
  $("#counter").text(maxCounterReset);
};

//animation
const animation = function(div) {
  $(div)
    .animate({ left: "100px", opacity: "0" }, "slow")
    .animate({ left: "0px", opacity: "1" }, "slow");
};

//Function to check form validation
const formValidation = function(str) {
  if (str.length > 140) {
    $("#errMessage")
      .slideDown()
      .text("You are over 140 characters!!!!")
      .css({ color: "red" });
    return;
  }
  if (str === "") {
    $("#errMessage")
      .slideDown()
      .text("Type something!!");
    return;
  }
  $.ajax({
    url: "/tweets/",
    type: "POST",
    data: {
      text: str
    }
  })
    .done(() => {
      loadNewTweets("GET", "/tweets", renderTweets);
      resetForm();
      animation("#logo");
    })
    .fail(err => {
    })
    .always(() => {
     
    });
  
};

//load tweets
const loadTweets = function(method, url, cb) {
  $.ajax({
    method,
    url
  }).done(response => {
    cb(response);
    console.log(response);
  });
};

//Load new tweets
const loadNewTweets = function(method, url, cb) {
  $.ajax({
    method,
    url
  }).done(response => {
    cb(response[response.length - 1]);
  });
};

//function Render Tweets
const renderTweets = function(tweets) {
  // loops through tweets
  console.log(tweets);
  if (Array.isArray(tweets)) {
    return tweets.forEach(obj => {
      $("#tweetsDisplay").prepend(createTweetElement(obj));
    });
  } else {
    $("#tweetsDisplay").prepend(createTweetElement(tweets));
  }
};

//Create tweet element
const createTweetElement = function(data) {
  let date = new Date(data.created_at);
  $("#userName").text("Edgar");
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
   <span> ${date.toLocaleString()} </span>
   <div class="iconsWrapper">
       <i class="fas fa-flag"></i>
       <i class="fas fa-retweet"></i>
       <i class="fas fa-heart"></i>
   </div>
 </footer>
</article>`);
  return element;
};

//function to scroll
const scrollDown = function(tag) {
  $(tag).click(function() {
    $(".new-tweet").slideToggle("slow");
    $("#txt").focus();
  });
};

//scroll top
$(document).scroll(function() {
  var scrollPercent = Math.round(
    (100 * $(window).scrollTop()) / ($(document).height() - $(window).height())
  );
  var y = $(this).scrollTop();
  if (scrollPercent >= 95) {
    $(".scrollUpBar").fadeIn();
  } else {
    $(".scrollUpBar").fadeOut();
  }
});
$(document).ready(function() {
  $(".scrollUpBar").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});

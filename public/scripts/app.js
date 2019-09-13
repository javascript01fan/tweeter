$(document).ready(function() {
  //Hide the error message
  $("#errMessage").hide();
  $(".new-tweet").slideUp();
  //scroll to bottom of page
  scrollDown(".fas");

  //create a const for the form
  const form = $("#tweet-form");
  //create an AJAX POST request
  form.on("submit", evt => {
    //prevent default
    evt.preventDefault();
    //Check for any XSS
    let tweet_content = escapedChar($(".tweetMessage").val());
    formValidation(tweet_content);
    //Send a request
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: {
        text: tweet_content
      }
    })
      .done(() => {
        loadNewTweets("GET", "/tweets", renderTweets);
        resetForm();
        animation("#logo");
        // console.log("success!!!");// if form submitted
      })
      .fail(err => {
        // console.log("error", err);//if error
      })
      .always(() => {
        // console.log("completed!!!");//completed
      });
  });
  //Load tweets and reder them
  loadTweets("GET", " http://localhost:8080/tweets", renderTweets);
});

//Function to prevent XSS
function escapedChar(str) {
  if (typeof jQuery !== "undefined") {
    // Create an empty div to use as a container,
    // then put the raw text in and get the HTML
    // equivalent out.
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
    /*   .text("You are over 140 characters!!!!")
      .css({ color: "red" }); */
  }
  if (str === "") {
    $("#errMessage")
      .slideDown()
      .text("Type something!!");
    /* .text("Type something!!")
      .css({ color: "blue" }); */
  }
  $("body").on("click", () => {
    $("#errMessage").slideUp();
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
  $("#avatar").attr("src", data.user.avatars);
  $("#userName").text(data.user.name);
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

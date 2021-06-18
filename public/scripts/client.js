/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escape function for XSS prevention
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function for creating a tweet
const createTweetElement = (tweet) => {
  const { name, avatars, handle } = tweet.user;
  const { text } = tweet.content;
  const { created_at } = tweet;
  const time = timeago.format(created_at);

  const $tweetContainer = $("<article>", { class: "tweet" });

  const contentHtml = `
    <header>
      <div class="tweetUser">
        <img src=${avatars}>
        <span class="tweetUser-name">${name}</span>
      </div>
      <div class="tweetHandle">
        <span>${handle}</span>
      </div>
    </header>
    <main>
      <div class="tweetText">
        ${escape(text)}
      </div>
    </main>
    <div class="line"></div>
    <footer>
      <div class="tweetTime">${time}</div>
      <div class="tweetIcons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  `;

  return $tweetContainer.append(contentHtml);
};

// Function to render all of the tweet data
const renderTweets = (tweets) => {
  const list = $("#tweetList");
  list.empty();
  tweets.reverse().forEach((tweet) => {
    list.append(createTweetElement(tweet));
  });
};

// AJAX get request to grab data and render tweets
const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then((tweets) => {
    renderTweets(tweets);
  });
};

// AJAX post request and error handling
const submitTweet = () => {
  $("form").submit(function (event) {
    event.preventDefault();
    const input = $("#new-text").val();
    const errorLong = $(".error-long");
    const errorEmpty = $(".error-empty");
    if (!input) {
      if (errorLong[0].style.display === "block") errorLong.slideUp("fast");
      errorEmpty.slideDown("slow");
    } else if (input.length > 140) {
      if (errorEmpty[0].style.display === "block") errorEmpty.slideUp("fast");
      errorLong.slideDown("slow");
    } else {
      if (errorLong[0].style.display === "block") errorLong.slideUp("fast");
      if (errorEmpty[0].style.display === "block") errorEmpty.slideUp("fast");

      $.ajax("/tweets", { method: "POST", data: $(this).serialize() })
      .then(() => {
        $("#new-text").val("");
        $(".counter").val(140);
        $(".new-tweet").slideUp("slow");
        loadTweets();
      });
    }
  });
};

// Function to show Form when right top button clicked
const newTweetClickHandler = () => {
  $(".newTweet").on("click", () => {
    const target = $(".new-tweet");
    const errorLong = $(".error-long");
    const errorEmpty = $(".error-empty");
    if (target[0].style.display !== "block") {
      $(".new-tweet").slideDown("slow");
    } else {
      if (errorLong[0].style.display === "block") errorLong.slideUp("fast");
      if (errorEmpty[0].style.display === "block") errorEmpty.slideUp("fast");
      $(".new-tweet").slideUp("slow");
    }
  });
};

$(document).ready(() => {
  newTweetClickHandler();
  loadTweets();
  submitTweet();
});

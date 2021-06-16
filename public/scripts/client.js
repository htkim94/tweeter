/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
        ${text}
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

const renderTweets = (tweets) => {
  const mainContainer = $('.container');
  tweets.forEach(tweet => {
    mainContainer.append(createTweetElement(tweet));
  });
}

$(document).ready(() => {
  const loadTweets = () => {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    })
  }

  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault();
    console.log(event);
    console.log($(this).serialize());
  })
});

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
  const list = $('#tweetList');
  list.empty();
  tweets.reverse().forEach(tweet => {
    list.append(createTweetElement(tweet));
  });
}

$(document).ready(() => {
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    })
  }

  loadTweets();

  $('form').submit(function (event) {
    event.preventDefault();
    const input = $(this).serialize();
    const [key, value] = input.split('=');
    if (!value) {
      alert("You cannot post empty tweet!");
    } else if (value.length > 140) {
      alert("Tweet length is over 140!");
    } else {
      $.ajax('/tweets', { method: 'POST', data: input })
      .then(() => {
        $('#new-text').val('');
        $('.counter').val(140);
        loadTweets();
      })
    }
  })
});

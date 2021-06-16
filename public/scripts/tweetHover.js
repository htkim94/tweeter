$(document).ready(function () {
  console.log("document is ready");
  const tweet = $(".tweet");
  const tweetHandle = $(".tweetHandle");
  const flagIcon = $(".fa-flag");
  const retweetIcon = $(".fa-retweet");
  const heartIcon = $(".fa-heart");

  tweet.hover(
    function () {
      tweet.css("box-shadow", "4px 4px #aec2ea");
      tweetHandle.css("color", "#aec2ea");
      flagIcon.hover(
        function() {
          flagIcon.css("color", "#ffb84d");
        },
        function() {
          flagIcon.css("color", "#4056A1");
        }
      );
      retweetIcon.hover(
        function() {
          retweetIcon.css("color", "#ffb84d");
        },
        function() {
          retweetIcon.css("color", "#4056A1");
        }
      );
      heartIcon.hover(
        function() {
          heartIcon.css("color", "#ffb84d");
        },
        function() {
          heartIcon.css("color", "#4056A1");
        }
      )
    },
    function () {
      tweet.css("box-shadow", "");
      tweetHandle.css("color", "#b3b3cc");
    },
  );
});
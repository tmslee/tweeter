/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const getTimeDiff = function (time) {
  const denoms = [31536000, 2628288, 604800, 86400, 3600, 60];
  const timeSpan = ['year(s)', 'month(s)', 'week(s)', 'day(s)', 'hour(s)', 'minute(s)'];
  let diff = Date.now() - time;
  diff = Math.floor(diff/1000);

  let i = 5;
  let numerator = 0;
  do {
    numerator = Math.floor(diff/denoms[i]);
    if(numerator === 0) break;
    i--;
  } while(i >= 0)

  if (i === 5) return 'just a moment';
  return `${Math.floor(diff/denoms[i+1])} ${timeSpan[i+1]}`;
}

const escape = function(str){
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
  const {user, content, created_at} = tweet;
  const {name, avatars, handle} = user;
  const text = content.text;
  const timeDiff = getTimeDiff(created_at);
  const $tweet = $(
    `<article class="tweet">
      <header class="tweet-header">
        <div class="tweet-user">
          <img class="tweet-user-image" src=${avatars}>
          <div class="tweet-user-name">${name}</div>
        </div>
        <div class="tweet-user-handle">${handle}</div>
      </header>

      <div class="tweet-text-container">
        <div class="tweet-text">${escape(text)}</div>
      </div>
      
      <footer class="tweet-footer">
        <hr class="tweet-footer-line">
        <div class="tweet-footer-content">
          <div class="tweet-time-stamp">${timeDiff} ago</div>
          <div class="tweet-options">
            <img class="tweet-option" src="images/flag.png">
            <img class="tweet-option" src="images/retweet.png">
            <img class= "tweet-option" src="images/like.png">
          </div>
        </div>
      </footer>
    </article>`
  );
  $tweet
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  }
};

const loadtweets = function () {
  const url = '/tweets'
  $.ajax({
    url,
    method:'GET',
  })
  .done(res => renderTweets(res))
  .fail(err => console.log(err))
}


$(document).ready(function(){
  loadtweets();

  $('.new-tweet-form').on('submit', function() {
    event.preventDefault();
    const formData = $(this).serialize();
    const $errMsg = $(document).find('.err-msg');

    const remCount = Number($(this).find('.counter').val());
    if (remCount < 140 && remCount >= 0) {
      $errMsg.css('display', 'none');

      const url = '/tweets';
      $.ajax({
        url,
        method: 'POST',
        data: formData
      })
      .done(res => {})
      .fail(err => console.log(err))

      loadtweets();
      $(this).find('#tweet-text').val('');
      $(this).find('.counter').val(140);
    } else if (remCount === 140) {
      $errMsg.find('.err-text').text(`you can't tweet nothing, try typing something before tweeting`);
      $errMsg.css('display', 'flex');
    } else {
      $errMsg.find('.err-text').text(`too long! please stay under the character limit`);
      $errMsg.css('display', 'flex');
    }
  });


});

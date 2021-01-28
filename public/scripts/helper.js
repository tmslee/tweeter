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


const autoExpand = function (field) {

  // Reset field height
  field.style.height = 'inherit';

  // Get the computed styles for the element
  var computed = window.getComputedStyle(field);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
               + parseInt(computed.getPropertyValue('padding-top'), 10)
               + field.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height + 'px';
};
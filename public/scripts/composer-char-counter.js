jQuery(function() { 
  const newTweetForm = $('.new-tweet-form');
  const newTweetTextArea = newTweetForm.find('textarea');
  const charCount = newTweetForm.find('.counter');

  newTweetTextArea.on('keyup keypress keydown', function(){
    let remaining = 140 - this.value.length;
    if(remaining < 0) {
      charCount.css('color', '#fc0303');
    } else {
      charCount.css('color', '#545149');
    }
    charCount.val(remaining);
  });

  
});
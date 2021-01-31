/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  loadtweets();

  /// submitting new tweet ////////////////////////////////////////////////////////////
  $('.new-tweet-form').on('submit', function() {
    event.preventDefault();
    const formData = $(this).serialize();
    const errMsg = $(document).find('.err-msg');
    const tweetContainer = $(document).find('#tweet-container');

    const remCount = Number($(this).find('.counter').val());
    if (remCount < 140 && remCount >= 0) {
      errMsg.css('display', 'none');

      const url = '/tweets';
      $.ajax({
        url,
        method: 'POST',
        data: formData
      })
      .done(res => {
        //tweetContainer.empty();
        loadtweets();
        $(this).find('#tweet-text').val('');
        $(this).find('.counter').val(140);
      })
      .fail(err => console.log(err));
    } else if (remCount === 140) {
      errMsg.find('.err-text').text(`you can't tweet nothing, try typing something before tweeting`);
      errMsg.css('display', 'flex');
    } else {
      errMsg.find('.err-text').text(`too long! please stay under the character limit`);
      errMsg.css('display', 'flex');
    }
  });

  $(".navText").on('click', function() {
    const newTweet = $('.new-tweet');
    if (newTweet.css('display') === 'flex') {
      newTweet.css('display', 'none');
    } else {
      newTweet.css('display', 'flex');
    }
  });

  ///// tweet option buttons (like, flag, retweet) /////////////////////////////////////////
  $(document).on('click', '.tweet-option', function() {
    let origSrc = $(this).attr('src');
    let imageSrc = origSrc.substring(6, origSrc.length - 4);
    let newSrc;
    if (imageSrc.includes('Hover')) {
      newSrc = imageSrc.substring(0, imageSrc.length - 5) + '.png';
    } else {
      newSrc = imageSrc + 'Hover.png';
    }

    this.setAttribute('src', 'images/' + newSrc);
  });

  ////// scroll up button////////////////////////////////////////////////////////////////////
  $(document).on('click', '.scrollUp', function() {
    const scrollUp = $('.scrollUp');
    $(window).scrollTop(0);
  });

  $(document).on('scroll', function(){
    const scrollUp = $('.scrollUp');
    if ($(window).scrollTop() === 0) {
      scrollUp.css('display', 'none');  
    } else {
      scrollUp.css('display', 'flex');  
    }
  });

});

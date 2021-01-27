$(document).ready(function() { 
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


  /////////////auto resizing textbox /////////////////////////////////////////////

  document.addEventListener('input', function (event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') return;
    autoExpand(event.target);
  }, false);

  var autoExpand = function (field) {

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
});
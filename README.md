# Tweeter Project

Tweeter is a simple, single-page Twitter clone.
The web application posts and displays tweets from user input under a randomly generated user profile. The display shows a history of previously posted tweets and showcases several html and css features to present them aesthetically.

!["Display for mobile devices"]()

-----------------------------------------------------------------------------

!["Display for desktop"]()

<br>

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

<br>

## Dependencies

- Express
- Node 5.10.x or above 
- chance
- body-parser
- md5

<br>

# Features

## Responsive Display
-  The app features a responsive display and showcases a different page layout depending on the viewpoint width of the browser;
  
  - while a width less than will display a 'mobile' layout:
    - only the navigation bar is fixed in this display

    - !["Display for mobile devices"]()

  - width greater than 960 pixels will display as follows:
    - the navigation bar as well as the side 'profile bar' are fixed in this display

    - !["Display for desktop"]()

## Post a Tweet
- clicking the top right prompt of the navigation bar will enable the user to post a tweet under a randomly generated user profile. The prompt will 'light up' in a brigher colour while being hovered on.
- the textbox prompt will increase in size as the text contet overflows the original text area size
- as the user types into the text area (or deletes from it) the remaining character counter will decrease and increase accordingly
  - the counter will display a negative value in red if the character count goes beyond the limit

!["post a new tweet in mobile"]()
!["post a new tweet in desktop"]()

- any attempt to submit a tweet with 0 characters or beyond the 140 character limit will not post the tweet and display the following error messages as appropriate:

!["empty tweet error"]()
!["over character limit error"]()

## Tweets
- each tweet will display the poster's profile image and name above the text that was tweeted
- hovering over a tweet will highlight the tweet in a slightly brighter color than the rest, display a shadow around the hovered tweet's border, and the poster's handle on the top right corner.

!["tweet without hover"]()
!["hovered tweet"]()

- in the footer of every tweet displays how long ago the tweet was submitted, as well as a set of (non functional) options
- each of these options (flag, retweet and like) can be clicked for a purely cosmetic affect indicating that the user has selected these options. (refreshing the page does not maintain the status of these options)

!["tweet options unselected"]()
!["tweet options selected"]()

## Scroll to top
- when a user scrolls away from the top of the page, a blue circular button will appear on the bottom right side of the page.
- clicking this button will allow the user to travel back to the top of the page.
- upon reaching the top of the page, the button will disappear. (it will reappear again once the user scrolls down)

!["Scroll to top button - mobile"]()
!["Scroll to top button - desktop"]()
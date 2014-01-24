macroplay
=========

AUTHOR: SAMUEL W. CRAYMER
DATE: APRIL 6, 2013

DESCRIPTION: My term project for one of my undergraduate courses at Carleton University, BUSI 3401 - Application Development for Online Environments.

URL 1: https://sam.craymer.com/macroplay/
URL 2: https://googledrive.com/host/0B_XofsFIj7LuNFNwVFdzS1dFa2c/
=========

CHANGE LOG:

 -  (NEW) added an animation to the banner when a new user comes to the site. if you 
    click the banner, it will reanimate. (NO BUTTON WAS ADDED FOR THE REANIMATION AS 
    IT WOULD DISRUPT THE LAYOUT OF THE PAGE. SIMPLY CLICK THE BANNER.)

 -  (NEW) added a view for devices and browsers with display widths below the fixed 
    site width of 1000px. content is displayed vertically and the header is removed.

 -  (NEW) added a find store button on the aside bar that calculates distance in km to
    the MacroPlay store from the user's position.
 
 -  (NEW) created message and confirm boxes that overlaps the entire site when activated. 
    all javascript alerts and javascript confirm message dialog boxes have been converted 
    to use the new message boxes.
 
 -  (FIX) fixed a problem where sometime the video player background would end up infront 
    of the player.
    
 -  (FIX) cursor now displays as a pointer for both the video player progress bar and 
    the volume bar.


PREVIOUS CHANGE LOG:

 -  (NEW) user theme selection new is stored under the local storage and is reapplied on 
    page reload.
    
 -  (NEW) created a webpage titled, 'Profile', that is used to create and modify local 
    users stored inside the indexedDB 'profile' object from the 'macroplay' database.
    
 -  (NEW) created a webpage title, 'Admin', that is used to view and delete users that 
    are stored inside the indexedDB 'profile' object from the 'macroplay' database.
    (Restricted to the 'admin' user only)
    
 -  (NEW) added a login section on everypage located in the aside bar.
 
 -  (NEW) the default theme, 'macroplay', now displays a banner. 
 
 -  (NEW) the theme, 'Grand Theft Auto V', has a new banner.
 
 -  (FIX) changed video locations to 'sam@craymer.com' public dropbox location since 
    previous locations turned out to be unreliable. The new location will be slower but 
    reliable.
    
 -  (FIX) fixed the video player progress bar's width to fit nicely in place.
 
 -  (FIX) fixed the video player play button where in some occasions it wouldn't play

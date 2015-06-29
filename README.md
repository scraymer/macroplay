#MacroPlay

**Author:** _Samuel W. Craymer_  
**Date:** _April 6, 2013_


##Description

A term project for one of my undergraduate courses at Carleton 
University, _BUSI 3401 Application Development for Online Environments_.  

The purpose of the term project was to design and develop a website for a fictitious 
company called _MacroPlay_ that would utilize all the new HTML5 features using the 
best practices that were learned throughout the course.


##Where to View

__URL 1:__ *https://scraymer.github.io/macroplay/*  
__URL 2:__ *https://sam.craymer.com/macroplay/*  
__URL 3:__ *https://googledrive.com/host/0B_XofsFIj7LuNFNwVFdzS1dFa2c/*

**Note:** To cover the course material in the limited amount of time, this website is designed for use with Google Chrome only. It will still work with other modern browsers since it was designed with HTML5 best practices in mind. However, since the course was designed around Google Chrome's advanced features like 2D and 3D modeling as well as local data storage, some feature will not work in other browsers like Apple's Safari or Mozilla Firefox. 


##Change Log

### Version 3.0:

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


### Version 2.0:

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

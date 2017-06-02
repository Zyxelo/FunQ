# FunQ - The digital queue
Screencast of the application can be found here:  
https://www.youtube.com/watch?v=mMXcfz-zTVs&t=406s

## The App (Functional Specification)
FunQ (FunQueue) is a digital queueing web application where visitors can queue for events and releases of different sorts.

Two main functions will be developed

1. Visitor (queuer)
2. Event organizer

The visitor can browse different events or queueing campaigns, both from "featured events", search bar, or direct link.

The visitor enters the queue and a timer until the queue stops is visible.

Every x min the visitor has to enter a captcha code to keep the queueing spot.

If the visitor doesn't do this, it will lose y spots until next captcha appears.

When queueing timer reaches zero, the visitor redirects to final page.

Final page is where you confirm your purchase in some way. This may vary from swish, paypal or redirect to another page.


The event organizer can create events and choose settings depending on the event/campaign.

Example of settings can be: number of queue spots, date and time of queue, how often visitor has to enter captcha, etc.

Event organizer chooses final page of the queue, where the visitor can for example obtain temporary coupon code, or pay for ticket.

### Pages
    1. Landing page:
        Not logged in:
            Featured events
            About the service
            Sign up
        Logged in:
            More events

    2. Sign up page:
        Register with name etc
        (Credit card not required, but might be needed later)
        Choose account type
            Visitor
            Event organizer

    3.Queueing page:
        Big timer to end of queue
        Captcha
        Queue place
        Extensions for games and ads
        Support for multiple queues

    4. Create event page:
        Choose settings for event
            Name, date, settings etc
        Choose final page function
            Swish number
            Payment solution (paypal, visa mastercard etc)
            Coupon code
            Redirect to other site

    5. Event page:
        From queueing page or landing page this page is reachable
        Displays event information
        Ads, campaigns, competitions for better spot in queue
        FAQ
        Videos

    6. My account page:
        Personal settings

## Technical details
### Frontend (Client) Framework
React.js

### Backend (Server) Framework
Express.js (Node.js)

### API's needed:
    1. reCAPTCHA
    2. LiuID api?
    3. Facebook account login
    4. Might need more APIs

### Grunt/Gulp for compiling LESS CSS files

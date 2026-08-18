## time

Now I have implemented the first app completely, wich is good, but now I want to make it modular.

I'd like to have a js script for any app I want to add in the future, and for that to work i need the script.js to load and process such scripts.

For that I have to implement

--html content: navbar icon and actual window
--script: turn on event listeners (close/open button + dragging)

Ok that's done :D
Had to make some compromises, firstly the dragging functions have to be either imported either hardcoded in the actual app script, for now they are hardcoded but I think I'll change that.
Other than that, everything is great, I even implemented the window closing on mousedown, so it dissapears if the user touches the corner button, like actual windows tabs.

Ok nevermind that coredrag js file took 10 minutes to implement.

Making a notes app proves pretty difficult, since the tab should be resizeable, I will make some easier apps for now and probably create that feature in the second part of the project.


Welcome back everyone, today we start a new journey. Today I begin making this a competitive project, to be rated by actual people who have already created wonderful projects.

Here is a grocery list for features I want to add:
-adjustable window size in coretools
-daily background image with info
-overlay order
-notes app
-custom app making window (for user apps)
-db for said custom apps

I've finished the adjustable window image, with a corner slider that moves the bottom right corner with it, and the overlay order, the last interacted with window shows up in front.

Now, the notes app is done as well. All actual features are done (I think), now I only have to keep on adding some new apps.

Now I'm going to try implementing the apod feature from the website challenge. The only problem is that with no build manager, like vite, I can't use private keys and keep them secret. I'll just leave it out there and hope nobody takes advantage of it (it's not that important anyways).

Yayyy the background thingie is done as well, had to use await and async functions but it works well for now.

The only thing I want to implement from now on is a default script for custom apps and a database for storing them, so users could maybe have an appstore inside the browser.
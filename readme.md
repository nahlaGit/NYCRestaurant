# NYC Restaurant Browser #

This application allows browsing and searching for restaurants within the following boroughs: Brooklyn, Bronx, Manhattan. And Queens.

### Steps to run: ###
1. `cd` to the cloned directory.
2. `npm install`.
3. `bower install`: Here, it will ask about the angular and jQuery versions (with various choices). Please go ahead and select 1.2.11 for everything Angular and jQuery 2.1.0. (I tried checking in bower components but not my lucky day with version controlling them - I have done this in the past.)
4. `grunt serve` should start the server with the hosted express/angular app.
5. To run jshint: `grunt jshint` and `grunt jshint:test`.
6. To run tests: `karma start` and `karma run` in another terminal preferrably.
7. Not much e2e testing done for this, but if I were to improve upon this, I would start there.
8. That's it. The project was a lot of fun, so appreciate the opportunity.


### A Word about UI Filters: ###
1. Both category and borough filters allow multiple choices.
2. The name search bar is greedy, and operates only after typing more than 2 characters.

### Data: ###
1. All data for the boroughs from foursquare. It was generated with:
```zsh
curl https://api.foursquare.com/v2/venues/explore\?near\=Bronx%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
curl https://api.foursquare.com/v2/venues/explore\?near\=Brooklyn%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
curl https://api.foursquare.com/v2/venues/explore\?near\=Manhattan%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
curl https://api.foursquare.com/v2/venues/explore\?near\=Queens%20New%20York\&client_id\=$CLIENT_ID\&client_secret\=$CLIENT_SECRET\&v\=20140224\&section\=food\&limit\=10\&venuePhotos\=1
```
2. The data had to be minimally massaged for Manhattan and Queens for which the results returned cities such as Flushing, etc.
3. The express server takes the 4 JSONs and combine them for uniform access by Angular app. 

### Routing: ###
1. `api/venues`: GET returns all results
2. `api/venues/<FOURSQUARE_VENUE_ID>`: GET returns one result. This is used when the detailed page is not accessed from within the master controller and the resource is needed to display the detail view.

'use strict';

var brooklyn = require('./brooklyn.json');
var bronx = require('./bronx.json');
var queens = require('./queens.json');
var manhattan = require('./manhattan.json');

var venues = [];

function transformToVenueArray(venuesMap, venues) {
  if (venues.length !== 0) {
    return venues;
  }

  for (var key in venuesMap) {
    var venuesForKey = venuesMap[key].response.groups[0].items;
    for (var i = 0; i < venuesForKey.length; i++) {
      var photoMeta = venuesForKey[i].venue.photos.groups[0].items[0];
      venuesForKey[i].venue.primaryPhoto = photoMeta.prefix + photoMeta.width + 'x' + photoMeta.height + photoMeta.suffix;
      venues.push(venuesForKey[i].venue);
    }
  }

  return venues;
}

var venuesMap = {
  "bronx": bronx,
  "brooklyn": brooklyn,
  "manhattan": manhattan,
  "queens": queens
};

exports.transformToVenueArray = transformToVenueArray;

exports.venues = function(req, res) {
  transformToVenueArray(venuesMap, venues);

  if (req.params.id){
    var found = venues.some(function(venue) {
      if (venue.id === req.params.id) {
        return res.send(venue);
      }
    });

    if (!found) {
      return res.send(404, "Venue ID is invalid: " + req.params.id);
    }
  } else {
    return res.send(venues);
  } 
};
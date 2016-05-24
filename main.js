var enableCtrl = require('./lib/ctrl')
var Map = require('./lib/objects/Map')
window.onload = function() {
var mapView = new Map('map')
enableCtrl(mapView)
}

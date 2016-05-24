var enableCtrl = require('./lib/ctrl')
var Map = require('./lib/objects/Map')
var Plans = require('./lib/objects/Plans')
var Store = require('./lib/objects/Store')

window.onload = function() {
	var mapView = new Map('map')
	var store = new Store()
	var plans = new Plans('plan-list', store, mapView)
	enableCtrl(mapView, plans)

	plans.init()

}

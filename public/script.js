(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(map) {
	var plans = document.getElementById('plans')
	var saveDraw = document.getElementById('save-drawing')
	var hideListBtn = document.getElementById('hide-side')
	var showListBtn = document.getElementById('show-side')
	var drawBtn = document.getElementById('draw')
	var drawCancelBtn = document.getElementById('draw-cancel')
	var drawSaveBtn = document.getElementById('draw-save')
	var planNameInput = document.getElementById('plan-name-input')
	var planNameBtn = document.getElementById('plan-name-btn')
	var planNameCancelBtn = document.getElementById('plan-name-cancel')

	hideListBtn.onclick = function() {
		plans.style.display = 'none'
		showListBtn.style.display = ''
	}

	showListBtn.onclick = function() {
		plans.style.display = ''
		showListBtn.style.display = 'none'
	}

	drawBtn.onclick = function() {
		map.startDraw()
		plans.style.display = 'none'
		drawCancelBtn.style.display = ''
		drawSaveBtn.style.display = ''
		drawCancelBtn.onclick = function() {
			map.endDraw()
			plans.style.display = ''
			drawCancelBtn.style.display = 'none'
			drawSaveBtn.style.display = 'none'	
		}
		drawSaveBtn.onclick = function() {
			saveDraw.style.display = ''
			drawCancelBtn.style.display = 'none'
			drawSaveBtn.style.display = 'none'
			planNameCancelBtn.onclick = function() {
				saveDraw.style.display = 'none'		
				plans.style.display = ''	
			}
			planNameBtn.onclick = function() {
				if(planNameInput.value) {
					console.log('saving', JSON.stringify({name: planNameInput.value, points: map.points}))
					planNameInput.value = ''
					saveDraw.style.display = 'none'
					plans.style.display = ''
				}
			}
		}
	}
}

},{}],2:[function(require,module,exports){
module.exports = function(mapId) {
	var self = this
	
	var map = L.map(mapId).setView([46.517, 6.563], 17)
	self.map = map

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map)

	self.planLayer = new L.FeatureGroup().addTo(map)

	self.drawing = false
	self.points = []

	self.map.on('click', function(e) {
		if(self.drawing) {
			self.points.push(e.latlng)
			self.planLayer.clearLayers()
			if(self.points.length === 1) {
				var pt = L.marker(self.points[0])
				self.planLayer.addLayer(pt)
			} else {
				var li = L.polyline(self.points)
				self.planLayer.addLayer(li)
			}
		}
	})

	self.startDraw = function() {
		self.planLayer.clearLayers()
		self.drawing = true
	}
	self.endDraw = function() {
		self.drawing = false
		self.planLayer.clearLayers()
		self.points = []
	}
}

},{}],3:[function(require,module,exports){
var enableCtrl = require('./lib/ctrl')
var Map = require('./lib/objects/Map')
window.onload = function() {
var mapView = new Map('map')
enableCtrl(mapView)
}

},{"./lib/ctrl":1,"./lib/objects/Map":2}]},{},[3]);

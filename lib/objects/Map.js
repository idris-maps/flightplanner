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

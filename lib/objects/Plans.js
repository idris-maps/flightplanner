var Plan = require('./Plan')

module.exports = function(listId, store, map) {
 var self = this
	self.listId = listId
	self.data = []
	self.init = function() {
		store.init(function(err, array) {
			array.forEach(function(plan) {
				var p = new Plan(plan.name, plan.points, self)
				self.data.push(p)
			})
			self.renderList()
		})
	}
	self.renderList = function() {
		var list = document.getElementById(self.listId)
		list.innerHTML = ''
		self.data.forEach(function(plan, index) {
			var listItem = plan.html(index)
			list.appendChild(listItem)
		})
	}
	self.add = function(name, points, callback) {
		var p = new Plan(name, points, self)
		self.data.push(p)
		self.renderList()
		self.updateStore()
		callback()
	} 
	self.remove = function(index) {
		self.data.splice(index, 1)	
		self.renderList()
		self.updateStore()
		map.endDraw()
	}
	self.show = function(index) {
		map.show(self.data[index].points)
	}
	self.updateStore = function() {
		var array = []
		self.data.forEach(function(p) {
			array.push({name: p.name, points: p.points})
		})
		store.update(array, function(err, val) {
			if(!err) { console.log('Store updated', val) }
		})
	} 
}

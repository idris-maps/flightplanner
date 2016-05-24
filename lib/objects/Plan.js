module.exports = function(name, points, plans) {
	var self = this
	self.points = points
	self.name = name
	self.html = function(index) {
		var div = document.createElement('div')
		div.setAttribute('class', 'plan')
		var n = document.createElement('h4')
		n.innerHTML = self.name
		var v = document.createElement('button')
		v.innerHTML = 'View'
		v.onclick = function() {
			plans.show(index)
		}
		var d = document.createElement('button')
		d.innerHTML = 'Delete'
		d.onclick = function() {
			plans.remove(index)
		}
		var hr = document.createElement('hr')

		div.appendChild(n)
		div.appendChild(v)
		div.appendChild(d)
		div.appendChild(hr)

		return div
	}
}

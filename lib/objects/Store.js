var lf = require('localforage')
var initData = require('../../init-data.json')

module.exports = function() {
	var self = this
	self.init = function(callback) {
		lf.getItem('plans', function(err, item) {
			if(err) { 
				console.log('Error retrieving from store', err)
				callback(err) 
			} else {
				if(item === null) {
					lf.setItem('plans', initData, function(err) {
						if(err) { console.log('Error saving to store', err) }
						callback(null, initData)
					})
				} else {
					callback(null, item)
				}
			}
		})
	}
	self.update = function(plans, callback) {
		lf.setItem('plans', plans, function(err) {
			if(err) {
				console.log('Error saving to store', err)
				callback(err)
			} else {
				callback(null, plans)
			}
		})
	}
	self.reset = function(callback) {
		lf.removeItem('plans', function(err) {
			if(err) { 
				console.log('Error resetting store', err)
			} else {
				console.log('Store has been reset')
			}
		})
	}
}

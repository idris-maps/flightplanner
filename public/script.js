(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
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
		plans.style.display = 'none'
		drawCancelBtn.style.display = ''
		drawSaveBtn.style.display = ''
		drawCancelBtn.onclick = function() {
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
					console.log('saving ' + planNameInput.value)
					planNameInput.value = ''
					saveDraw.style.display = 'none'
					plans.style.display = ''
				}
			}
		}
	}
}

},{}],2:[function(require,module,exports){
var enableCtrl = require('./lib/ctrl')

enableCtrl()

},{"./lib/ctrl":1}]},{},[2]);

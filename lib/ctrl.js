module.exports = function(map,flightPlans) {
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
	var warn = document.getElementById('save-drawing-warning')

	hideListBtn.onclick = function() {
		plans.style.display = 'none'
		showListBtn.style.display = ''
	}

	showListBtn.onclick = function() {
		plans.style.display = ''
		showListBtn.style.display = 'none'
	}

	drawBtn.onclick = function() {
		drawing()
	}

	function drawing() {
		map.startDraw()

		plans.style.display = 'none'
		drawCancelBtn.style.display = ''
		drawSaveBtn.style.display = ''

		drawCancelBtn.onclick = function() { cancelDrawing() }
		drawSaveBtn.onclick = function() { saveDrawing() }
	}

	function cancelDrawing() {
		map.endDraw()

		plans.style.display = ''
		drawCancelBtn.style.display = 'none'
		drawSaveBtn.style.display = 'none'	
		saveDraw.style.display = 'none'
	}
	
	function saveDrawing() {
		var ok = checkIfLine()

		saveDraw.style.display = ''
		drawCancelBtn.style.display = 'none'
		drawSaveBtn.style.display = 'none'

		planNameCancelBtn.onclick = function() { cancelDrawing() }
		planNameBtn.onclick = function() { save(ok) }
	}

	function save(ok) {
		if(ok && planNameInput.value) {
			flightPlans.add(planNameInput.value, map.points, function() {
				planNameInput.value = ''
				saveDraw.style.display = 'none'
				plans.style.display = ''
			})
		}
	}

	function checkIfLine() {
		var ok = true
		if(map.points.length < 2) {
			ok = false
			warn.style.display = ''
		} else {
			warn.style.display = 'none'
		}
		return ok
	}

}

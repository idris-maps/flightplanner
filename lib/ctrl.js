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

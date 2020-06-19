const LETTERS = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var circles = [], sets = [], number_of_circles = 2;

function getCircleNames(number) {
	var a = []
	for (var i = 1; i <= number; i++) {
		a.push(LETTERS.charAt(i))
	}
	return a;
}
// var circles = Array.from(Array(number_of_circles).keys());

circles = getCircleNames(number_of_circles);

function addCircle() {
	if (number_of_circles + 1 > 5) return;
	circles = getCircleNames(number_of_circles + 1);
	var new_areas = getAllCombinations(circles);
	var diff = []
	for (var i = 0; i < new_areas.length; i++) {
		var isDupe = current_areas.find(el =>  isEqualArray(new_areas[i], el));
		if (!isDupe) diff.push(new_areas[i]);
	}
	console.log(current_areas.concat(diff));
	buildSets(diff);
	// current_areas.concat(diff)
	// sets = buildSets(current_areas.concat(diff));
	console.log(sets);
	d3.select("#venn").datum(sets).call(chart);
	number_of_circles++;
	buildControls();
}

function removeCircle() {
	var circleToRemove = LETTERS.charAt(number_of_circles);
	console.log(circleToRemove);
	// sets.forEach()
}

function getAllCombinations(arr) {
	if (arr.length === 1) return [arr];
	else {
		subarr = getAllCombinations(arr.slice(1));
		return subarr.concat(subarr.map(e => e.concat(arr[0])), [[arr[0]]]);
	}
}
var current_areas = getAllCombinations(circles)

``
function buildSets(areas) {
	for (var i = 0; i < areas.length; i++) {
		sets.push({
			sets: areas[i].sort(),
			label: areas[i].sort().join(''),
			size: areas[i].length === 1 ? 9 : 0
		});
	}	
}
buildSets(current_areas);

var chart = venn.VennDiagram();
d3.select("#venn").datum(sets).call(chart);

var control_panel = document.querySelector('.controls')
function buildControls() {
	control_panel.innerHTML = "";
	sets.sort().forEach(i => {
		console.log(i);
		var div = Object.assign(document.createElement('div'), {
			className: 'control-group'
		});
		var input = Object.assign(document.createElement('input'), {
			type: 'number',
			min: 0,
			max: 14,
			id: `area-${i.sets.join('')}`,
			value: i.size
		});
		input.onchange = () => {
			updateValue(input.value, input.id.substr(input.id.indexOf('-')+1).split(''));
		}
		var label = Object.assign(document.createElement('label'), {
			for: `area-${i.sets.join('')}`,
			innerHTML: i.sets.join('&nbsp;&#8745;&nbsp;')
		});
		div.append(label);
		div.append(input);
		control_panel.append(div);
	});
}
buildControls();

function isEqualArray(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;
	a.sort();
	b.sort();
	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function updateValue(value, area) {
	if (typeof area === 'string' && area.length > 1) area = area.toUpperCase().split('').sort();
	if (typeof area === 'string' && area.length == 1) area = [area.toUpperCase()];
	for (var i = 0; i < sets.length; i++) {
		if (isEqualArray(sets[i].sets, area)) {
			if (sets[i].sets.length > 1) 
			sets[i].size = parseInt(value);
		}
	}
	d3.select("#venn").datum(sets).call(chart);
}

function updateLabel(label, area) {
	if (typeof area === 'string' && area.length > 1) area = area.toUpperCase().split('').sort();
	if (typeof area === 'string' && area.length == 1) area = [area.toUpperCase()];
	for (var i = 0; i < sets.length; i++) {
		if (isEqualArray(sets[i].sets, area)) {
			sets[i].label = label;
			updated = true;
			// console.log(sets[i].set.join(''));
		}
	}
	// console.log('updated', sets);
	d3.select("#venn").datum(sets).call(chart);
}

document.addEventListener('dingo_alert', (e, s)=> {
	console.log('hi', e.detail.area.join(''));
	updateValue(0, e.detail.area.sort());
	document.querySelector(`#area-${e.detail.area.sort().join('')}`).value = 0;
})
// document.querySelector('#circle1').addEventListener('input', (e) => {
// 	console.log('circle1 changed');
// 	circle1.size =  e.target.value;
// 	updateData();
// 	d3.select("#venn").datum(sets).call(chart);
// });
// document.querySelector('#circle2').addEventListener('input', (e) => {
// 	console.log('circle2 changed');
// 	circle2.size =  e.target.value;
// 	updateData();
// 	d3.select("#venn").datum(sets).call(chart);
// });


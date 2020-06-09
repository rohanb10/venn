const LETTERS = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var circles = [], sets = [], number_of_circles = 8;

function getCircleNames(number) {
	var a = []
	for (var i = 1; i <= number; i++) {
		a.push(LETTERS.charAt(i))
	}
	return a;
}

circles = getCircleNames(number_of_circles)

function getAllCombinations(arr) {
	if (arr.length === 1) return [arr];
	else {
		subarr = getAllCombinations(arr.slice(1));
		return subarr.concat(subarr.map(e => e.concat(arr[0])), [[arr[0]]]);
	}
}
var areas = getAllCombinations(circles)
for (var i = 0; i < areas.length; i++) {
	sets.push({
		sets: areas[i].sort(),
		// label: areas[i].sort().join(''),
		size: areas[i].length === 1 ? 9 : areas[i].length
	});
}

var chart = venn.VennDiagram();
d3.select("#venn").datum(sets).call(chart);

var control_panel = document.querySelector('.controls')

areas.sort().forEach(i => {
	var div = Object.assign(document.createElement('div'), {
		className: 'control-group'
	});
	var input = Object.assign(document.createElement('input'), {
		type: 'number',
		min: 0,
		max: 14,
		id: `area-${i.join('')}`,
		value: i.length === 1 ? 9 : i.length
	});
	input.onchange = () => {
		updateValue(input.value, input.id.substr(input.id.indexOf('-')+1).split(''));
	}
	var label = Object.assign(document.createElement('label'), {
		for: `area-${i.join('')}`,
		innerHTML: i.join('&nbsp;&#8745;&nbsp;')
	});
	div.append(label);
	div.append(input);
	control_panel.append(div);
});

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


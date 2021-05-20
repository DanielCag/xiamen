function fir() {
	document.getElementById('main').style.display = 'none';
	document.getElementById('map').style.display = 'block';
	document.getElementById('chart3').style.display = 'none';
	document.getElementById('chart4').style.display = 'block';
	document.getElementById('chart5').style.display = 'block';
	document.getElementById('chart1').style.display = 'none';
	document.getElementById('chart2').style.display = 'none';
	document.getElementById('jam').style.display = 'none';
	document.getElementById('select').style.display = 'none';
	hotSpot();

}


function sec() {
	document.getElementById('main').style.display = 'none';
	document.getElementById('chart3').style.display = 'none';
	document.getElementById('chart1').style.display = 'block';
	document.getElementById('chart2').style.display = 'block';
	document.getElementById('chart4').style.display = 'none';
	document.getElementById('chart5').style.display = 'none';
	document.getElementById('text').style.display = 'none';
	document.getElementById('jam').style.display = 'block';
	document.getElementById('select').style.display = 'block';
	document.getElementById('bar').style.display = 'none';
	document.getElementById('map').style.display = 'none';
	congest();
	mapNet();
	friend();
}

function thi() {
	document.getElementById('main').style.display = 'block';
	document.getElementById('chart4').style.display = 'none';
	document.getElementById('chart5').style.display = 'none';
	document.getElementById('jam').style.display = 'none';
	document.getElementById('select').style.display = 'none';
	topology();
}

function mapNet() {
	let map = initMap({
		tilt: 0,
		heading: 0,
		center: [118.13394, 24.50605],
		zoom: 13,
		style: whiteStyle
	});

	let view = new mapvgl.View({
		// effects: [new mapvgl.BloomEffect()],
		map: map
	});

	d3.csv('data/hight21.csv').then(data1 => {
		let lineData = []
		// let point = []
		for (var i = 0; i < data1.length; i++) {
			lineData.push({
				geometry: {
					type: 'LineString',
					coordinates: [
						convertWGS84ToBD09(data1[i].START_LONGITUDE, data1[i].START_LATITUDE),
						convertWGS84ToBD09(data1[i].END_LONGITUDE, data1[i].END_LATITUDE)
					]
				},
			});
		}
		
		let layer = new mapvgl.SimpleLineLayer({
			blend: 'lighter',
			width: 10,
			dashArray: [20, 30],
			dashOffset: 20,
			color: 'rgb(238,12,70)'
		});
		layer.setData(lineData);
		view.addLayer(layer);
	});

}

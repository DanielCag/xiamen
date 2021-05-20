function road() {
	let map = initmap({
		tilt: 0,
		heading: 0,
		center: [118.13394, 24.50605],
		zoom: 13,
		style: whiteStyle
	});


	let view = new mapvgl.View({
		map: map
	});
	d3.csv('data/one_road.csv').then(data1 => {
		let lineData = [],
			data = [];
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
			data.push({
				geometry: {
					type: 'Point',
					coordinates: [
						convertWGS84ToBD09(data1[i].START_LONGITUDE, data1[i].START_LATITUDE)
					]
				},
				properties:{
					text: '该路段道路完整，基础设施齐备，周边公园较多，交通工具分布密集'
				}
			});
		}
console.log(lineData)
		let layer = new mapvgl.SimpleLineLayer({
			blend: 'lighter',
			width: 10,
			dashArray: [20, 30],
			dashOffset: 20,
			color: 'rgb(20, 189, 60)',
		});
		layer.setData(lineData);
		view.addLayer(layer);

		let textLayer = new mapvgl.TextLayer({
			enablePicked: true,
			autoSelect: true,
			selectedColor: '#f00', // 选中项颜色
			color: '#ff0'
		})
		view.addLayer(textLayer);
		textLayer.setData(data);
	});
}

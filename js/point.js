function point(path){
	var map = inmap({
		tilt: 30,
		heading: 0,
		center: [118.152, 24.50],
		zoom: 13,
		style: whiteStyle
	});
	var view = new mapvgl.View({
		map: map
	});
	let color = 'rgba(134, 13, 39, 1.0)';
	fetch(path).then(rs => {
		return rs.json();
	}).then(rs => {
		view.addLayer(new mapvgl.PointLayer({
			blend: 'lighter',
			shape: 'circle',
			color: color,
			data: rs,
			size: 1
		}));
	});
	map.on('click',function(){
		sec();
	})
}
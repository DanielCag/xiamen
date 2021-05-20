function congest() {
	let tt = document.getElementById('time');
	let op = "<option value=''>请选择时段</option>";
	for (let i = 6; i < 10; i++) {
		op += `<option value="">${i+'-'+(i+1)}</option>>`;
	}
	tt.innerHTML = op
	let path = ' ';
	$("#time").change(re => {
		let drawType = $("#draw_type").find("option:selected").text()
		let time = $("#time").find("option:selected").text()
		if (drawType == "出租车") {
			path = './data/lowspeedtaxi/' + time + '.json';
		} else if (drawType == "网约车") {
			path = './data/lowspeedwyc/' + time + '.json';
		} else if (drawType == "共享单车") {
			path = './data/lowspeed/20201225/' + time + '.json';
		} else if (drawType == "请选择") {
			path = ' ';
		}
		draw();
	})
	$("#draw_type").change(re => {
		let time = $("#time").find("option:selected").text()
		let draw_type = $("#draw_type").find("option:selected").text()
		let type = '';
		if (draw_type == "出租车") {
			type = 'lowspeedtaxi';
		} else if (draw_type == "网约车") {
			type = 'lowspeedwyc';
		} else if (draw_type == "共享单车") {
			type = 'lowspeed/20201225';
		}
		if (time == "6-7") {
			path = './data/' + type + '/6-7.json';
		} else if (time == "7-8") {
			path = './data/' + type + '/7-8.json';
		} else if (time == "8-9") {
			path = './data/' + type + '/8-9.json';
		} else if (time == "9-10") {
			path = './data/' + type + '/9-10.json';
		} else if (time == "请选择时段") {
			path = ' ';
		}
		draw();
	})
	draw();

	function draw() {
		document.getElementById('map').style.display = 'block';
		var map = Map({
			tilt: 30,
			heading: 0,
			center: [118.152, 24.50],
			zoom: 14,
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
	}

}

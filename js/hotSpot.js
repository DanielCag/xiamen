function hotSpot() {
	let map = new BMap.Map("map", {
		enableMapClick: false
	});
	map.centerAndZoom(new BMap.Point(118.167588, 24.483765), 13);
	map.enableScrollWheelZoom(true);
	map.setMapStyle({
		style: "light",
		styleJson: [{
				"featureType": "highway",
				"elementType": "geometry.fill",
				"stylers": {
					"color": "#ffffffff",
					"hue": "#ffffff",
					"weight": "1",
					"lightness": 1,
					"saturation": 100,
					"visibility": "on"
				}
			},
			{
				'featureType': 'arterial',
				'elementType': 'geometry',
				'stylers': {
					'color': '#fff8cf'
				}
			},
			{
				'featureType': 'arterial',
				'elementType': 'labels',
				'stylers': {
					'visibility': 'on'
				}
			},
			{
				'featureType': 'green',
				'elementType': 'geometry',
				'stylers': {
					'visibility': 'off'
				}
			},
			{
				'featureType': 'subway',
				'elementType': 'geometry.stroke',
				'stylers': {
					'color': '#ffffff'
				}
			},
			{
				'featureType': 'subway',
				'elementType': 'labels',
				'stylers': {
					'visibility': 'off'
				}
			}
		]
	});
	picker(map);
	point("");

// 	let taxiMarkers = []; //出租车点
// 	let wycMarkers = []; //网约车点
// 	let bcyMarkers = []; //自行车点
// 	let taxiNum = 0,
// 		bcyNum = 0,
// 		wycNum = 0;
// 	d3.csv('./data/taxi2.csv').then(taxiData => {
// 		for (let i = 0; i < taxiData.length; i++) {
// 			let tem = convertWGS84ToBD09(taxiData[i].LONGITUDE, taxiData[i].LATITUDE);
// 			let point = new BMap.Point(tem[0], tem[1]);
// 			let marker = new BMap.Marker(point, {
// 				icon: new BMap.Icon('./img/taxi.png', new BMap.Size(24, 24)),
// 				enableClicking: false,
// 			});
// 			map.addOverlay(marker);
// 			taxiMarkers.push(marker);
// 			taxiNum += 1;
// 		}
// 		d3.csv('./data/wyc.csv').then(wycData => {
// 			for (let i = 0; i < wycData.length; i++) {
// 				let tem = convertWGS84ToBD09(wycData[i].LONGITUDE, wycData[i].LATITUDE);
// 				let point = new BMap.Point(tem[0], tem[1]);
// 				let marker = new BMap.Marker(point, {
// 					icon: new BMap.Icon('./img/wyc.png', new BMap.Size(24, 24)),
// 					enableClicking: false,
// 				});
// 				map.addOverlay(marker);
// 				wycMarkers.push(marker);
// 				wycNum += 1;
// 			}
// 			d3.csv('./data/open.csv').then(bcyData => {
// 				for (let i = 0; i < bcyData.length; i++) {
// 					let tem = convertWGS84ToBD09(bcyData[i].LONGITUDE, bcyData[i].LATITUDE);
// 					let point = new BMap.Point(tem[0], tem[1]);
// 					let marker = new BMap.Marker(point, {
// 						icon: new BMap.Icon('./img/bicycle.png', new BMap.Size(24, 24)),
// 						enableClicking: false,
// 					});
// 					map.addOverlay(marker);
// 					bcyMarkers.push(marker);
// 					bcyNum += 1;
// 				}
// 				show();
// 			})
// 		})
// 	})




// 	function show() {
// 		document.getElementById('bar').style.display = 'block';
// 		document.getElementById('word').style.display = 'block';
// 		let bar = echarts.init(document.getElementById('bar'));
// 		var checkName = 'normal'; //点击柱子的名字
// 		let option = {
// 			legend: {
// 				data: ['共享单车', '出租车', '网约车'],
// 			},
// 			grid: {
// 				left: '3%',
// 				right: '4%',
// 				bottom: '5%',
// 				containLabel: true
// 			},
// 			xAxis: {
// 				show: false,
// 				type: 'value'
// 			},
// 			yAxis: {
// 				show: false,
// 				type: 'category',
// 				data: ['Mon']
// 			},
// 			series: [{
// 					name: '共享单车',
// 					type: 'bar',
// 					stack: 'total',
// 					label: {
// 						show: true
// 					},
// 					barWidth: 40,
// 					emphasis: {
// 						focus: 'series',
// 					},
// 					data: [bcyNum],
// 					itemStyle: {
// 						normal: {
// 							color: function(params) {
// 								if (checkName === params.seriesName) {
// 									return 'rgb(19,34,122,1)';
// 								} else if (checkName === 'normal') {
// 									return 'rgba(19,34,122,1)';
// 								} else {
// 									return 'rgb(19,34,122,0.4)';
// 								}
// 							}
// 						}
// 					}
// 				},
// 				{
// 					name: '出租车',
// 					type: 'bar',
// 					stack: 'total',
// 					label: {
// 						show: true
// 					},
// 					emphasis: {
// 						focus: 'series'
// 					},
// 					data: [taxiNum],
// 					itemStyle: {
// 						normal: {
// 							color: function(params) {
// 								if (checkName === params.seriesName) {
// 									return 'rgba(255,127,0,1)';
// 								} else if (checkName === 'normal') {
// 									return 'rgba(255,127,0,1)';
// 								} else {
// 									return 'rgba(255,127,0,0.4)';
// 								}
// 							}
// 						}
// 					}
// 				},
// 				{
// 					name: '网约车',
// 					type: 'bar',
// 					stack: 'total',
// 					label: {
// 						show: true
// 					},
// 					emphasis: {
// 						focus: 'series'
// 					},
// 					data: [wycNum],
// 					itemStyle: {
// 						normal: {
// 							color: function(params) {
// 								if (checkName === params.seriesName) {
// 									return 'rgba(216,30,6,1)';
// 								} else if (checkName === 'normal') {
// 									return 'rgba(216,30,6,1)';
// 								} else {
// 									return 'rgba(216,30,6,0.4)';
// 								}
// 							}
// 						}
// 					}
// 				}
// 			]
// 		};
// 		bar.setOption(option);
// 		bar.on("click", function(params) {
// 			checkName = params.seriesName;
// 			//柱形图重构
// 			bar.setOption(option);
// 			if (params.seriesName == "共享单车") {
// 				showBicycle();
// 			} else if (params.seriesName == "出租车") {
// 				showTaxi();
// 			} else if (params.seriesName == "网约车") {
// 				showWyc();
// 			}
// 		})
// 	}


// 	function showBicycle() {
// 		for (let i = 0; i < bcyMarkers.length; i++) {
// 			bcyMarkers[i].show();
// 		}
// 		for (let i = 0; i < taxiMarkers.length; i++) {
// 			taxiMarkers[i].hide();
// 		}
// 		for (let i = 0; i < wycMarkers.length; i++) {
// 			wycMarkers[i].hide();
// 		}
// 		document.getElementById('text').style.display = 'block';
// 		document.getElementById('text').innerHTML =
// 			'湖里区林后路393号<br>湖里区岐山北路<br>湖里区兴隆路677-8号<br>思明区禾祥西路52号<br>湖里区岐山路<br>湖里区嘉禾路420号<br>思明区厦禾路875号<br>思明区厦禾路265号<br>思明区禾祥东路67-2号<br>思明区吕岭路1819号'

// 	}

// 	function showTaxi() {
// 		for (let i = 0; i < bcyMarkers.length; i++) {
// 			bcyMarkers[i].hide();
// 		}
// 		for (let i = 0; i < taxiMarkers.length; i++) {
// 			taxiMarkers[i].show();
// 		}
// 		for (let i = 0; i < wycMarkers.length; i++) {
// 			wycMarkers[i].hide();
// 		}
// 		document.getElementById('text').style.display = 'block';
// 		document.getElementById('text').innerHTML =
// 			'思明区镇海路32号<br>湖里区兴隆路36号<br>湖里区象兴三路16号<br>思明区仓里59号<br>湖里区创新路28号<br>思明区小学路96号<br>思明区莲前东路1188号<br>思明区思明南路400号<br>湖里区兴隆路400号<br>湖里区悦华路153号'
// 	}

// 	function showWyc() {
// 		for (let i = 0; i < bcyMarkers.length; i++) {
// 			bcyMarkers[i].hide();
// 		}
// 		for (let i = 0; i < taxiMarkers.length; i++) {
// 			taxiMarkers[i].hide();
// 		}
// 		for (let i = 0; i < wycMarkers.length; i++) {
// 			wycMarkers[i].show();
// 		}
// 		document.getElementById('text').style.display = 'block';
// 		document.getElementById('text').innerHTML =
// 			'集美区乐天路<br>翔安区金曾路<br>集美区盛光路340号<br>思明区双莲池街97号<br>集美区宁海五路<br>同安区环城南路909号<br>集美区滨水中三路<br>思明区站南路19号<br>集美区杏锦路<br>湖里区云顶北路'

// 	}
}

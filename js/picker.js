function picker(map) {
	let chart = echarts.init(document.getElementById('chart5'))

	document.getElementById('bar').style.display = 'none';
	document.getElementById('text').style.display = 'none';
	document.getElementById('word').style.display = 'none';

	let dataColor = ["#1576d2", "#d14a82", "#26c1f2", "#a166ff", "#1271cc", "#272f67", "rgba(156, 43, 182, 1)"]	
	let DD = [];
	let data_1 = [14153, 50370, 84611, 33265, 8512, 26365, 34877, 39136, 7232, 13000, 23905, 24000]
	let data = [{
		"value": 582592 / 356868,
		"name": "共享单车"
	}, {
		"value": 106332 / 356868,
		"name": "出租车"
	}, {
		"value": 68137 / 356868,
		"name": "网约车"
	}]
	for (let i = 0; i < 12; i++) {
		DD.push({
			"value": data_1[i],
			"name": (i % 4 + 6) + '~' + (i % 4 + 7)
		})
	}

	let taxiMarkers = []; //出租车点
	let wycMarkers = []; //网约车点
	let bcyMarkers = []; //自行车点
	let taxiNum = 0,
		bcyNum = 0,
		wycNum = 0;

	let option = {
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		series: [{
				name: '订单量',
				type: 'pie',
				radius: [0, '36%'],
				// roseType: 'area',
				labelLine: {
					show: false
				},
				label: {
					normal: {
						position: 'inner',
						show: false
					}
				},
				data: data,
				itemStyle: {
					normal: {
						opacity: 0.7,
						color: '#ff5500',
						borderWidth: 1,
						borderColor: '#ffaa7f'
					}
				},
				emphasis:{
					normal:{
						opacity: 1,
						color: '#ff5f88'
					}
				}
			},
			{
				name: '时间段',
				type: 'pie',
				selectedMode: 'single',
				radius: ['40%', '55%'],
				roseType: 'area',
				// clockwise: true,
				// label: {
				//     fontSize: 18,
				//     color: '#235894'
				// },
				// labelLine: {
				//     lineStyle: {
				//         color: '#235894'
				//     }
				// },
				// label: {
				//     // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
				//     backgroundColor: '#eee',
				//     borderColor: '#aaa',
				//     borderWidth: 1,
				//     borderRadius: 4,
				//     textColor:"#1576d2",
				//     rich: {
				//         a: {
				//             color: '#999',
				//             lineHeight: 22,
				//             align: 'center'
				//         },
				//         hr: {
				//             borderColor: '#aaa',
				//             width: '100%',
				//             borderWidth: 0.5,
				//             height: 0
				//         },
				//         b: {
				//             fontSize: 16,
				//             lineHeight: 33
				//         },
				//         per: {
				//             color: '#eee',
				//             backgroundColor: '#334455',
				//             padding: [2, 4],
				//             borderRadius: 2
				//         }
				//     }
				// },
				data: DD,
				itemStyle: {
					normal: {
						opacity: 0.7,
						// color: {
						//     // image: piePatternImg,
						//     repeat: 'repeat'
						// },
						color: 'rgb(241,168,0)',
						borderWidth: 1,
						borderColor: '#767302'
					}
				}
			}
		]
	}

	chart.setOption(option)
	chart.on('click', function(params) {
		console.log(params)
		if (params.data.name == "共享单车") {
			showBicycle();
		} else if (params.data.name == "出租车") {
			showTaxi();
		} else if (params.data.name == "网约车") {
			showWyc();
		}
		for (let i = 0; i < 24; i++) {
			let ss = i + '~' + (i + 1)
			if (ss == params.data.name) {
				if (i < 10) {
					S = '0' + i
				} else {
					S = '' + i
				}
				console.log(S);
				datapath = 'data/taxiODData/OD_taxiOrder' + S + '.json';
				point(datapath);
				break;
			}
		}

		// function drawODHeatmap(time) {
		// 	datapath = 'data/taxiODData/OD_taxiOrder' + time + '.json'
		// 	console.log(time)
		// 	fetch(datapath).then(function(rs) {
		// 		return rs.json();
		// 	}).then(function(jsondata) {
		// 		// jsondata=jsondata[100]
		// 		console.log(jsondata)
		// 		var heatmap = new mapvgl.HeatmapLayer({
		// 			size: 200, // 单个点绘制大小
		// 			max: 80, // 最大阈值
		// 			height: 0, // 最大高度，默认为0
		// 			unit: 'm', // 单位，m:米，px: 像素
		// 			gradient: { // 对应比例渐变色
		// 				0.25: 'rgb(255,132,0)',
		// 				0.55: 'rgba(255,0,221,0.47)',
		// 				0.85: 'rgb(255,0,111)',
		// 				1: 'rgb(255,0,0)'
		// 			}
		// 		});
		// 		view.addLayer(heatmap);
		// 		heatmap.setData(jsondata);
		// 	});
		// }
	});

	function showBicycle() {
		map.clearOverlays();
		d3.csv('./data/open.csv').then(bcyData => {
			for (let i = 0; i < bcyData.length; i++) {
				let tem = convertWGS84ToBD09(bcyData[i].LONGITUDE, bcyData[i].LATITUDE);
				let point = new BMap.Point(tem[0], tem[1]);
				let marker = new BMap.Marker(point, {
					icon: new BMap.Icon('./img/bicycle.png', new BMap.Size(24, 24)),
					enableClicking: false,
				});
				map.addOverlay(marker);
				bcyMarkers.push(marker);
				bcyNum += 1;
			}
		})
	}

	function showTaxi() {
		map.clearOverlays();
		d3.csv('./data/taxi2.csv').then(taxiData => {
			for (let i = 0; i < taxiData.length; i++) {
				let tem = convertWGS84ToBD09(taxiData[i].LONGITUDE, taxiData[i].LATITUDE);
				let point = new BMap.Point(tem[0], tem[1]);
				let marker = new BMap.Marker(point, {
					icon: new BMap.Icon('./img/taxi.png', new BMap.Size(24, 24)),
					enableClicking: false,
				});
				map.addOverlay(marker);
				taxiMarkers.push(marker);
				taxiNum += 1;
			}
		})
	}

	function showWyc() {
		map.clearOverlays();
		d3.csv('./data/wyc.csv').then(wycData => {
			for (let i = 0; i < wycData.length; i++) {
				let tem = convertWGS84ToBD09(wycData[i].LONGITUDE, wycData[i].LATITUDE);
				let point = new BMap.Point(tem[0], tem[1]);
				let marker = new BMap.Marker(point, {
					icon: new BMap.Icon('./img/wyc.png', new BMap.Size(24, 24)),
					enableClicking: false,
				});
				map.addOverlay(marker);
				wycMarkers.push(marker);
				wycNum += 1;
			}
		})
	}
}

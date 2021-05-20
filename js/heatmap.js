function heatmap() {
	let hours = ['6:00', '6:10', '6:20', '6:30', '6:40', '6:50', '7:00', '7:10', '7:20', '7:30', '7:40',
		'7:50', '8:00', '8:10', '8:20', '8:30', '8:40', '8:50', '9:00', '9:10', '9:20', '9:30',
		'9:40', '9:50'
	];
	let days = ['12月21日', '12月22日', '12月23日', '12月24日', '12月25日'];
	let myChart = echarts.init(document.getElementById('chart4'), 'dark');
	let option;

	d3.json('./data/heatmap.json').then(d => {
		let data = d[0].data.map(function(item) {
			return [item[1], item[0], item[2] || '-'];
		});

		option = {
			tooltip: {
				position: 'right'
			},
			grid: {
				height: '50%',
				top: '10%'
			},
			xAxis: {
				type: 'category',
				data: hours,
				splitArea: {
					show: true
				}
			},
			yAxis: {
				type: 'category',
				data: days,
				splitArea: {
					show: true
				}
			},
			visualMap: {
				show: false,
				min: 0,
				max: 10,
				calculable: true,
				orient: 'horizontal',
			},
			series: [{
				name: 'Punch Card',
				type: 'heatmap',
				data: data,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		myChart.setOption(option);
	})

}

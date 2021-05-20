function order() {
	document.getElementById('bar').style.display = 'none';
	document.getElementById('text').style.display = 'none';
	document.getElementById('word').style.display = 'none';
	d3.csv('data/ks3_data.csv').then(data => {

		var countdata = []
		var timedata = []
		for (var i = 0; i < data.length; i++) {
			countdata.push(data[i].count)
			timedata.push(data[i].time)
		}
		var chartDom = document.getElementById('chart5');
		var myChart = echarts.init(chartDom,'dark');
		var option;
		var option = {
			title: {
				text: '21-25日共享单车订单量',
				top: 10,
				left: 10,
				textStyle: {
					fontSize: 15,
				}
			},
			// toolbox: {
			// 	feature: {
			// 		dataZoom: {
			// 			yAxisIndex: false
			// 		},
			// 		saveAsImage: {
			// 			pixelRatio: 2
			// 		}
			// 	}
			// },
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				bottom: 90
			},
			dataZoom: [{
				type: 'inside'
			}, {
				type: 'slider'
			}],
			xAxis: {
				data: timedata,
				silent: false,
				splitLine: {
					show: false
				},
				splitArea: {
					show: false
				}
			},
			yAxis: {
				splitArea: {
					show: false
				}
			},
			series: [{
				type: 'bar',
				data: countdata,
				// Set `large` for large data amount
				large: true
			}]
		};

		myChart.setOption(option);
	})
}

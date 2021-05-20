//日期统计和日期转换  //中文-月日转换成数字格式 例如'1月15日'转换成'2020/1/15'
function weather() {
	let date = {
		formatEN: time => {
			return new Date("2020/" + time.replace(/月/, '/').replace(/日/, '/'))
		},
		formatCN: time => {
			return [time.getMonth() + 1 + "月", time.getDate() + "日"].join("")
		},
		formatPoint: time => {
			return [time.getMonth() + 1 + "." + time.getDate()]
		},

		getDays: data => {
			let startTime = d3.min(data, d => date.formatEN(d['日期']).getTime())
			let endTime = d3.max(data, d => date.formatEN(d['日期']).getTime())
			let totalTimes = (endTime - startTime) / 864e5 + 1
			return {
				startTime,
				endTime,
				totalTimes
			}
		}

	}
	let utils = {
		parseToInt: function(num) {
			return "" === num ? 0 : parseInt(num)
		}
	}

	d3.csv('./data/weather.csv').then(data => {
		let allHieData = d3.nest().key(t => t["类型"]).map(data);
		let city = d3.nest().key(t => t["城市名"]).key(t => t["日期"]).map(allHieData["$1"]);

		//晴雨表中间数据
		//画图数据，长度等于省级的数量
		let barometerDate = {};
		let mapData = []; //数据
		let xLabel = []; //标签
		let cityList = []; //地区省 清单
		barometerDate = date.getDays(data); //晴雨表数据

		for (let i = 0; i < barometerDate.totalTimes; i++) {
			let day = new Date(barometerDate.startTime + 864e5 * i);
			xLabel.push(date.formatPoint(day))
		}

		Object.keys(city).forEach(d => {
			let data = [];
			// let preInc = 0;
			let inc1Arr = [];
			let inc2Arr = [];
			let inc3Arr = [];
			for (let i = 0; i < barometerDate.totalTimes; i++) {
				let day = new Date(barometerDate.startTime + 864e5 * i);
				let dayCN = date.formatCN(day)
				let dayData = city[d]['$' + dayCN]
				let inc1 = dayData ? utils.parseToInt(dayData[0]['降水量']) : 0;
				let inc2 = dayData ? utils.parseToInt(dayData[0]['温度']) : 0;
				let inc3 = dayData ? utils.parseToInt(dayData[0]['风级']) : 0;
				// console.log(inc3);
				let change1 = inc1;
				let change2 = inc2;
				let change3 = inc3;
				inc1Arr.push(inc1)
				inc2Arr.push(inc2)
				inc3Arr.push(inc3)
				// preInc = inc
				data.push({
					day,
					inc1,
					inc2,
					inc3,
					change1,
					change2,
					change3
				})
			}
			d.slice(1) !== '0' && cityList.push(d.slice(1))
			d.slice(1) !== '0' && mapData.push({
				data,
				city: d.slice(1),
				max: d3.max(inc1Arr)
			});
			// console.log(d.slice(1))
			// console.log(d3.max(incArr))
		})
		//边距
		const margin = ({
			top: 40,
			right: 10,
			bottom: 20,
			left: 0
		})

		//矩形边长
		const rectHeight = 40; //大矩形一个单位长
		const padding = 20; //内置矩形边长
		const totalDays = barometerDate.totalTimes //总共的天数
		const width = rectHeight * totalDays; //大矩形长
		const height = (rectHeight + padding) * mapData.length;

		const color1 = 'rgb(170, 255, 255)'; //0-10   
		const color2 = 'rgb(85, 185, 231)'; //10-25   
		const color3 = 'rgb(129, 136, 238)'; //25-50  
		const color4 = 'rgb(71, 92, 232)'; //50-100   
		const color5 = 'rgb(107,46,206)'; //100-200   
		const color6 = 'rgb(27, 2, 108)'; //200---     

		//规模，标签
		const x = d3.scaleBand()
			.domain(xLabel)
			.range([margin.left, width - margin.right])
			.paddingInner(0.1)
			.paddingOuter(0.2)

		const y = d3.scaleBand()
			.domain(mapData.map(d => d.city))
			.range([margin.top, height - margin.bottom])
			.paddingInner(0.2)

		//标刻线
		const r = d3.scaleLinear()
			.domain([1, d3.max(mapData.map(d => d.max))])
			.rangeRound([5 * 5, Math.pow(x.bandwidth(), 2)])

		//添加画布
		let svg = d3.select('#chart4')
			.append('svg')
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])

		svg.append('g')
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(y)
				.tickValues(mapData.map(d => d.city))
				.tickSize(0))
			.call(g => g.select(".domain").remove())
			.call(g => g.selectAll("text").style("font-size", "14").style("font-weight", 'bold'))

		svg.append('g')
			.attr("transform", `translate(0,${margin.top})`)
			.call(d3.axisTop(x).tickSize(10))
			.call(g => g.select(".domain").remove())
			.call(g => g.selectAll("text").style("font-size", "14"))

		let prov = svg.append('g')
			.selectAll('g')
			.data(mapData)
			.join('g')
			.attr('class', 'prov')

		prov.each(function(d, i) {
			d3.select(this)
				.append('g')
				.selectAll('rect')
				.data(d => d.data)
				.join('rect')
				.attr('width', x.bandwidth())
				.attr('height', x.bandwidth())
				.attr('x', (t, n) => x(xLabel[n]))
				.attr('y', y(cityList[i]))
				.attr('fill', '#eee')
				.attr("rx", 20)
				.attr("ry", 20)

			//上层
			d3.select(this)
				.append('g')
				.selectAll('rect')
				.data(d => d.data)
				.join('rect')
				.attr('width', t => {
					return t.inc1 === 0 ? 0 : Math.sqrt(r(t.inc1))
				})
				.attr('height', t => {
					return t.inc1 === 0 ? 0 : Math.sqrt(r(t.inc1))
				})
				.attr('x', (t, n) => x(xLabel[n]))
				.attr('y', y(cityList[i]))
				.attr('fill', t => t.change1 <= 10 ? color1 : (t.change1 > 10 && t.change1 <= 25 ?
					color2 : (t
						.change1 > 25 && t.change1 <= 50 ? color3 :
						(t.change1 > 50 && t.change1 <= 100 ? color4 : (t.change1 > 100 && t
							.change1 <=
							200 ? color5 : color6)))))
				.attr("transform", t => {
					let innerR = Math.sqrt(r(t.inc1))
					let outerR = x.bandwidth()
					return t.inc1 === 0 ? '' :
						`translate(${(outerR - innerR) / 2},${(outerR - innerR) / 2})`
				})
				.attr("rx", 15)
				.attr("ry", 15)

			d3.select(this)
				.append('g')
				.selectAll('text')
				.data(d => d.data)
				.join('text')
				.attr('x', (t, n) => x(xLabel[n]))
				.attr('y', y(cityList[i]))
				.attr('dx', x.bandwidth() / 2)
				.attr('dy', y.bandwidth())
				.text(t => t.inc3)
				.attr('text-anchor', 'middle')
				.style("font-size", "10")

		})
	})
}

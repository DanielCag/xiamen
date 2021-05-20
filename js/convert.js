//WGS84坐标转为GCJ02坐标
function convertWGS84ToGCJ02(WGS84_lng, WGS84_lat) {
	let a = 6378245; //卫星椭球坐标投影到平面地图坐标系的投影因子
	let ee = 0.00669342162296594323; //椭球的偏心率
	let lng = parseFloat(WGS84_lng);
	let lat = parseFloat(WGS84_lat);
	let radLat = lat / 180 * Math.PI;
	let magic = Math.sin(radLat);
	magic = 1 - ee * magic * magic;
	let sqrtMagic = Math.sqrt(magic);
	let x = WGS84_lng - 105;
	let y = WGS84_lat - 35;
	let dLat = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
	dLat += (20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2 / 3;
	dLat += (20 * Math.sin(y * Math.PI) + 40 * Math.sin(y / 3 * Math.PI)) * 2 / 3;
	dLat += (160 * Math.sin(y / 12 * Math.PI) + 320 * Math.sin(y * Math.PI / 30)) * 2 / 3;
	dLat = (dLat * 180) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
	let dLng = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
	dLng += (20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2 / 3;
	dLng += (20 * Math.sin(x * Math.PI) + 40 * Math.sin(x / 3 * Math.PI)) * 2 / 3;
	dLng += (150 * Math.sin(x / 12 * Math.PI) + 300 * Math.sin(x / 30 * Math.PI)) * 2 / 3;
	dLng = (dLng * 180) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
	let GCJ02lng = lng + dLng;
	let GCJ02lat = lat + dLat;
	return [GCJ02lng, GCJ02lat]
}

//gcj02坐标转换为百度坐标
function convertGCJ02ToBD09(GCJ02_lng, GCJ02_lat) {
	xPi = Math.PI * 3000.0 / 180.0;
	x = GCJ02_lng
	y = GCJ02_lat
	z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi);
	theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi);
	lng = z * Math.cos(theta) + 0.0065;
	lat = z * Math.sin(theta) + 0.006;
	return [lng, lat]
}

//WGS84坐标转为百度坐标
function convertWGS84ToBD09(WGS84_lng, WGS84_lat) {
	let tem = convertWGS84ToGCJ02(WGS84_lng, WGS84_lat);
	return convertGCJ02ToBD09(tem[0], tem[1]);
}

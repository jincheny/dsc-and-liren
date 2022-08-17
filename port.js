const fs = require("fs");
const http = require("http");
let server = http.createServer(function (req, res) {
	var fileUrl = "./dscmall" + req.url;
	console.log(fileUrl)
	fs.readFile(fileUrl, function (err, data) {
		if (err) {
			res.write("404");
		} else {
			res.write(data);
		}
		res.end();
	})
}).listen(3000, function () {
	console.log("3000已启动")
})
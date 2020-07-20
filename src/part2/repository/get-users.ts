import userdata from "./userdata"
export default ():Promise<any[]> => {
	return new Promise(function (resolve, reject) {
		const e = 500 * Math.random() + 300;
		setTimeout(function () {
			try {
				resolve(JSON.parse(Buffer.from(userdata, "base64").toString()));
			} catch (e) {
				reject(e);
			}
		}, e);
	});
};

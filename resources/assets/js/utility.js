function baseUrl() {
	var win_loc = window.location;
	if (win_loc.host === 'localhost') {
            return win_loc.protocol + "//" + win_loc.host + "/edutube/public/";
	}
	return win_loc.protocol + "//" + win_loc.host + "/remote/host/path/";
};

function debug_console(msg) {
	var win_loc = window.location;
	if (win_loc.host === 'localhost') {
		console.log(msg);
	}
}
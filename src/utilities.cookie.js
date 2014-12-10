define(function() {

	var Cookie = {

		create: function(name, value, days) {
			var expires;
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			else {
				expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		},

		get: function(name) {
			if (document.cookie.length > 0) {
				start = document.cookie.indexOf(name + "=");
				if (start != -1) {
					start = start + name.length + 1;
					end = document.cookie.indexOf(";", start);
					if (end == -1) {
						end = document.cookie.length;
					}
					return unescape(document.cookie.substring(start, end));
				}
			}
			return "";
		}
	};

	return Cookie;
});

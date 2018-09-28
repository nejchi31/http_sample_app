export const getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=ISO-8859-1')
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send(null);
}

export const putUpdate = function(id, inx, weight, function_update, self){
    var _self = self;
		var url = "http://api.vx1.ekranj.si/v5/sources/14d1aad8-49a9-44eb-aba3-94feb70e184d/elements/";
		var data = {};
		data.weight = weight;
		var json = JSON.stringify(data);
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", url+id, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = function () {
      function_update(id, inx, weight);
      var updateData = sortByWeight(_self.props.data.event_data)
      _self.props.captureData(updateData);
			var users = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				//console.table(users);
			} else {
				//console.error(users);
			}
		}
		xhr.send(json);
	}

export const sortByWeight = function (data){
  data.sort((a,b) => {
    return b.weight - a.weight;
  });
  return data;
}

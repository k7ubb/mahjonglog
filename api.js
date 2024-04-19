let MahjongLogAPI = {
	
	api: API_ROOT_URL,
	
	api_info : function(cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=api_info`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				cb(result_json);
			}
			else{
				cb_error("api_info: network error");
			}
		};
	},
	
	account_getinfo : function(id, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=account_get_info&id=${id}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				if(result_json.account_idstr != ""){
					cb( {
						idstr: result_json.account_idstr,
						name: result_json.account_name,
						log_count: result_json.log_count,
						lastupdate: new Date(result_json.lastupdate/1000).toLocaleDateString("jp-JP")
					});
				}
				else{
					cb_error("accoung_getinfo: account is not exist");
				}
			}
			else{
				cb_error("accoung_getinfo: network error");
			}
		};
	},
	
	account_get_id : function(idstr, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=account_get_id&idstr=${idstr}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				if(result_json.account_id != ""){
					cb(result_json.account_id);
				}
				else{
					cb_error("account_get_id: account is not exist");
				}
			}
			else{
				cb_error("account_get_id: network error");
			}
		};
	},
	
	account_create : function(idstr, name, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=account_create&idstr=${idstr}&name=${name}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				if(result_json.succeed){
					cb(result_json.account_id);
				}
				else{
					cb_error("account_create: couldn't create account");
				}
			}
			else{
				cb_error("account_create: network error");
			}
		};
	},
	
	players_get : function(id, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=players_get&id=${id}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				cb(result_json.players);
			}
			else{
				cb_error("players_get: network error");
			}
		};
	},
	
	player_add : function(id, player, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=player_add&id=${id}&player=${player}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				if(result_json.succeed){
					cb();
				}
				else{
					cb_error("player_add: account error");
				}
			}
			else{
				cb_error("player_add: network error");
			}
		};
	},
	
	log_get_alldata : function(id, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=log_get_alldata&id=${id}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				cb(result_json.log_data);
			}
			else{
				cb_error("log_get_alldata: network error");
			}
		};
	},
	
	log_add : function(id, data, cb, cb_error){
		let xhr = new XMLHttpRequest();
		xhr.open("get", `${this.api}?function=log_add&id=${id}&data=${data}`);
		xhr.send();
		xhr.onload = function(){
			if(xhr.status == 200){
				let result_json = JSON.parse(xhr.responseText);
				if(result_json.succeed){
					cb();
				}
				else{
					cb_error("log_add: account error");
				}
			}
			else{
				cb_error("log_add: network error");
			}
		};
	}
	
};

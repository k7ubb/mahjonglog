(function(){
	
	let account_data;
	let api_name;
	
	window.Config = function(acc){
		location.hash = "config";
		account_data = acc;
		api_name = "";
		MahjongLogAPI.api_info(
			function(result){
				api_name = result.name;
				render();
			},
			function(message){
				alert(message);
			}
		);
		render();
	};
	
	
	function render(){
		ReactDOM.render(<AppScreen />, document.getElementById("config"));
	}
	
	
	function AppScreen(){
		return (
			<React.Fragment>
				<div className="header">
					<h1>設定</h1>
					<a className="back" onClick={Main}>戻る</a>
				</div>
				
				<div className="wrap">
					<div className="itemtitle">{account_data.name}</div>
					<div className="item list config">
						<div className="listitem"><div>ID<span>@{account_data.idstr}</span></div></div>
						<div className="listitem"><div>内部ID<span>{account_data.id}</span></div></div>
					</div>
					<div className="itemtitle">全般</div>
					<div className="item list config">
						<div className="listitem"><div>App version<span>β1.0.0</span></div></div>
						<div className="listitem"><div>{api_name}</div></div>
					</div>
					
					<div className="item list">
						<div className="listitem action"><div><a href="https://komekui.xrea.jp/mahjonglog/" target="_blank">Webサイトを開く</a></div></div>
					</div>
				</div>
			</React.Fragment>
		);
	}
	
	
})();

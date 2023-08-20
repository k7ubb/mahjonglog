(function(){
	
	let account_data;
	let players;
	
	window.Player = function(acc){
		location.hash = "player";
		account_data = acc;
		players = [];
		MahjongLogAPI.players_get(
			account_data.id,
			function(p){
				players = p;
				render();
			},
			function(message){
				alert(message);
			}
		);
		render();
	};
	
	
	function render(){
		ReactDOM.render(<AppScreen />, document.getElementById("player"));
	}
	
	
	function AppScreen(){
		return (
			<React.Fragment>
				<div className="header">
					<h1>個人記録</h1>
					<a className="back" onClick={Main}>戻る</a>
				</div>
				
				<div className="wrap">
					<div className="item list">
						<PlayerItems />
					</div>
					
					<div className="item list">
						<div className="listitem action" onClick={event_addPlayer}><div>名前を追加</div></div>
					</div>
				</div>
			</React.Fragment>
		);
	}
	
	
	function PlayerItem(props){
		return (
			<div className="listitem arrow" onClick={ event_goViewLogByPlayer(this) }>
				<div>{props.player}</div>
			</div>
		);
	}
	
	
	function PlayerItems(){
		return (
			players.map(item => (
				<PlayerItem player={item} />
			))
		);
	}
	
	
	function event_goViewLogByPlayer(){
		return function(e){
			e.stopPropagation();
			let player = e.currentTarget.firstChild.innerHTML;
			ViewLogByPlayer(account_data, player);
		};
	}
	
	
	function event_addPlayer(){
		let player_name = prompt("名前を入力してください\n※半角英数のみ使用可") || "";
		player_name = player_name.replace(/[\s\r\t\?\#\&,]/g, "");
		if(player_name == ""){ return; }
		if(players.indexOf(player_name) != -1){
			alert("その名前は既に使われています");
			return;
		}
		MahjongLogAPI.player_add(
			account_data.id,
			player_name,
			function(){
				alert("追加しました");
				Player(account_data);
			},
			function(message){
				alert(message);
			}
		);
	}
	
})();

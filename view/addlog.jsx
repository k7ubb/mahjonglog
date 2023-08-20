(function(){
	
	let account_data;
	let players;		// プレイヤーの一覧
						// 読込中は空配列を描画
	
	window.AddLog = function(acc){
		location.hash = "addlog";
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
		ReactDOM.render(<AppScreen />, document.getElementById("addlog"));
	}
	
	
	function AppScreen(){
		return (
			<React.Fragment>
				<div className="header">
					<h1>対局記録を登録</h1>
					<a className="back" onClick={Main}>戻る</a>
				</div>
				
				<div className="wrap">
					<div className="item list">
						<Player n="1" />
						<Player n="2" />
						<Player n="3" />
						<Player n="4" />
					</div>
					
					<div className="item list">
						<div className="listitem action" onClick={event_submit}><div>対局結果を保存</div></div>
					</div>
				</div>
			</React.Fragment>
		);
	}
	
	
	function PlayerOptions(){
		return (
			players.map(player => (
				<option>{player}</option>
			))
		);
	}
	
	
	function Player(props){
		return (
			<div className="listitem">
				<select id={"player"+props.n}>
				<option disabled selected value="">名前を選択</option>
				<PlayerOptions />
				</select>
				<span className="score">
					<input id={"score"+props.n} type="number" defaultValue="250" />00
				</span>
			</div>
		);
	}
	
	
	function checkError(score){
		let total = 0;
		for(let s of score){
			if(s.player == ""){ return "名前を選択してください"; }
			total += s.point;
		}
		if(total != 1000){
			return "点棒の合計が" + (Math.abs(1000-total)*100) + "点" + (1000>total? "少ない":"多い");
		}
		for(let i=0; i<3; i++){
			for(let j=i+1; j<4; j++){ 
				if(score[i].player == score[j].player){ return "同じプレイヤーが複数存在します"; }
			}
		}
		return false;
	};
	
	
	function event_submit(){
		let score = [];
		for(let i=1; i<5; i++){
			score.push({
				"player": document.getElementById("player"+i).value,
				"point":  Number(document.getElementById("score"+i).value)
			});
		}
		score.sort(function(a,b){return b.point - a.point;})
		
		let check = checkError(score);
		if(check){
			alert(check);
			return;
		}
		
		score[0].point = Math.round( (score[0].point+100-1) / 10 );
 		score[1].point = Math.round( (score[1].point-200-1) / 10 );
		score[2].point = Math.round( (score[2].point-400-1) / 10 );
		score[3].point = Math.round( (score[3].point-500-1) / 10 );
		
		let d = new Date();
		let today = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
		let data = JSON.stringify({
			date: today,
			score: score
		});
		
		MahjongLogAPI.log_add(
			account_data.id,
			data,
			function(){
				alert("追加しました");
				Main();
			},
			function(message){
				alert("正常に保存できなかった可能性があります。\nデータを保管しておいて、再度送信してください。");
			}
		);
	}
	
})();

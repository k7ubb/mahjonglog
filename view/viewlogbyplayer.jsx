(function(){
	
	let loading;
	
	let account_data;
	let player;
	let logData;
	let recode;
	
	window.ViewLogByPlayer = function(acc, p) {
		location.hash = "viewlogbyplayer";
		account_data = acc;
		player = p;
		logData = [];
		recode  = parseRecode(logData, player);
		
		loading = true;
		MahjongLogAPI.log_get_alldata(
			account_data.id,
			function(log){
				loading = false;
				logData = log;
				recode  = parseRecode(logData, player);
				render();
			},
			function(message){
				alert(message);
			}
		);
		render();
	};
	
	
	function render(){
		ReactDOM.render(<AppScreen />, document.getElementById("viewlogbyplayer"));
	}
	
	
	function AppScreen(){
		let score_color  = "#000";
		let ascore_color = "#000";
		if(recode.score > 0) { score_color  = "#00f"; }
		if(recode.score < 0) { score_color  = "#f00"; }
		if(recode.ascore > 0){ ascore_color = "#00f"; }
		if(recode.ascore < 0){ ascore_color = "#f00"; }
		
		return (
			<React.Fragment>
				<div className="header">
					<h1>{player}</h1>
					<a className="back" onClick={() => Player(account_data)}>戻る</a>
				</div>
				
				{loading == false &&
					<div className="wrap">
						<div className="item list logbyplayer">
							<div className="listitem"><div>1位<span>{recode.rank[0]}</span></div></div>
							<div className="listitem"><div>2位<span>{recode.rank[1]}</span></div></div>
							<div className="listitem"><div>3位<span>{recode.rank[2]}</span></div></div>
							<div className="listitem"><div>4位<span>{recode.rank[3]}</span></div></div>
							<div className="listitem"><div>試合数<span>{recode.count}</span></div></div>
							<div className="listitem"><div>平均順位<span>{recode.arank}</span></div></div>
							<div className="listitem"><div>累計得点<span style={{color:score_color}}>{recode.score}</span></div></div>
							<div className="listitem"><div>平均得点<span style={{color:ascore_color}}>{recode.ascore}</span></div></div>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
	
	
	function round(n){ return Math.floor(n*100)/100; }
	
	
	function parseRecode(logData, player){
		let recode = {
			"rank": [0,0,0,0],		// 各順位の回数
			"count": 0,				// 試合数
			"arank": 0,				// 平均順位
			"score": 0,				// 累計得点
			"ascore": 0,			// 平均得点
		};
		for(let log of logData){
			for(let i=0; i<4; i++){
				if(log.score[i].player == player){
					recode.rank[i]++;
					recode.count++;
					recode.score += log.score[i].point;
				}
			}
		}
		recode.arank =  recode.count? round( (recode.rank[0] + 2*recode.rank[1] + 3*recode.rank[2] + 4*recode.rank[3]) / recode.count ) : "-";
		recode.ascore = recode.count? round( recode.score / recode.count) : "-";
		return recode;
	}
	
})();

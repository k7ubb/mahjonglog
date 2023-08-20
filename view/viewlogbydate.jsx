(function(){
	
	let account_data;
	let show_date;
	let logData;
	let logData_toShow;
	let date;
	
	window.ViewLogByDate = function(acc, d){
		location.hash = "viewlogbydate";
		account_data = acc;
		show_date = d;
		logData = [];
		logData_toShow = data2show(logData, show_date);
		
		MahjongLogAPI.log_get_alldata(
			account_data.id,
			function(log){
				logData = log;
				logData_toShow = data2show(logData, show_date);
				render();
			},
			function(message){
				alert(message);
			}
		);
		render();
	};
	
	
	function render(){
		ReactDOM.render(<AppScreen />, document.getElementById("viewlogbydate"));
	}
	
	
	function AppScreen(){
		return (
			<React.Fragment>
				<div className="header">
					<h1>{show_date}</h1>
					<a className="back" onClick={() => ViewLog(account_data)}>戻る</a>
				</div>
				
				<div className="wrap">
					<LogItems />
				</div>
			</React.Fragment>
		);
	}
	
	
	function LogItems(){
		return (
			logData_toShow.map(item => (
				<LogItem log={item} />
			))
		);
	}
	
	
	function LogItem(props){
		let date = props.log.date;
		let score = props.log.score;
		let color = [];
		for(let i=0; i<4; i++){
			if(score[i].point == 0){ color[i] = "#000"; }
			if(score[i].point > 0){ color[i] = "#00f"; }
			if(score[i].point < 0){ color[i] = "#f00"; }
		}
		return (
			<div className="item logbydate">
				{date}<br />
				<p>
					1: {score[0].player} <span className="score_point" style={{color:color[0]}}>{score[0].point}</span><br />
					2: {score[1].player} <span className="score_point" style={{color:color[1]}}>{score[1].point}</span><br />
					3: {score[2].player} <span className="score_point" style={{color:color[2]}}>{score[2].point}</span><br />
					4: {score[3].player} <span className="score_point" style={{color:color[3]}}>{score[3].point}</span>
				</p>
			</div>
		);
	}
	
	
	function data2show(logData, date){
		let data = [];
		for(let i=0; i<logData.length; i++){
			if(logData[i].date == date){
				data.push(logData[i]);
			}
		}
		return data;
	}
	
})();

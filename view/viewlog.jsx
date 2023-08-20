(function(){
	
	let account_data;
	let logData;
	let logData_dates;
	
	window.ViewLog = function(acc){
		location.hash = "viewlog";
		account_data = acc;
		logData = [];
		logData_dates = data2dates(logData);
		
		MahjongLogAPI.log_get_alldata(
			account_data.id,
			function(log){
				logData = log;
				logData_dates = data2dates(logData);
				render();
			},
			function(message){
				alert(message);
			}
		);
		render();
	};
	
	
	function render(){
		ReactDOM.render(<AppScreen />, document.getElementById("viewlog"));
	}
	
	
	function AppScreen(){
		return (
			<React.Fragment>
				<div className="header">
					<h1>ログ表示</h1>
					<a className="back" onClick={Main}>戻る</a>
				</div>
				
				<div className="wrap">
					<div className="item list">
						<LogItems />
					</div>
				</div>
			</React.Fragment>
		);
	}
	
	
	function LogItems(){
		return (
			logData_dates.map(item => (
				<LogItem date={item.date} count={item.count} />
			))
		);
	}
	
	
	function LogItem(props){
		return (
			<div className="listitem arrow" onClick={ event_goViewLogByDate(this) }>
				<div><span>{props.date}</span>({props.count})</div>
			</div>
		);
	}
	
	
	function data2dates(logData){
		if(logData.length == 0){ return []; }
		let date = [{date: logData[logData.length-1].date, count: 1}];
		for(let i=logData.length-2; i>=0; i--){
			if(date[date.length-1].date != logData[i].date){
				date.push({
					date: logData[i].date,
					count: 1
				});
			}
			else{
				date[date.length-1].count++;
			}
		}
		return date;
	}
	
	
	function event_goViewLogByDate(){
		return function(e){
			e.stopPropagation();
			let date = e.currentTarget.firstChild.firstChild.innerHTML;
			ViewLogByDate(account_data, date);
		};
	}
	
})();

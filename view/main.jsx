(function(){
	
	let loading;
	
	let accounts;	// 登録しているアカウントのIDの一覧
	let account;	// 表示しているアカウント
	
	let accounts_data;	// 登録しているアカウントの情報
	let account_data;	// 表示しているアカウントの情報
	
	window.Main = function(){
		location.hash = "main";
		loading = false;
		accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
		account = localStorage.getItem("account") || "";
		accounts_data = [];
		account_data = {
			id: "",
			name: "",
			idstr: ""
		};
		
		for(let i=0; i<accounts.length; i++){
			loading = true;
			MahjongLogAPI.account_getinfo(
				accounts[i],
				function(result){
					loading = false;
					accounts_data[i] = {id: accounts[i], ...result};
					if(accounts[i] == account){
						account_data = {id: accounts[i], ...result};
					}
					render();
				},
				function(message){
					alert(message);
					if(message == "account_not_exist"){
						if(accounts[i] == account){ account = ""; }
						accounts.splice(i, 1);
						localStorage.setItem("account", JSON.stringify(account));
						localStorage.setItem("accounts", JSON.stringify(accounts));
						Main();
					}
				}
			);
		}
		render();
	};
	
	
	function render(){
		ReactDOM.render(<AppScreen />, document.getElementById("main"));
	}
	
	
	function AppScreen(){
		return (
			<React.Fragment>
				<div className="header">
					<h1>麻雀戦績共有アプリ</h1>
				</div>
				
				<div className="wrap">
					{loading == true && <React.Fragment>
						<p>Loading...</p>
					</React.Fragment> }
					{loading == false && account != "" && <React.Fragment>
						<p>{account_data.name} としてログイン中</p>
						
						<div className="item list">
							<div className="listitem arrow" onClick={() => AddLog(account_data)}><div>新規登録</div></div>
							<div className="listitem arrow" onClick={() => ViewLog(account_data)}><div>ログ表示</div></div>
							<div className="listitem arrow" onClick={() => Player(account_data)}><div>個人記録</div></div>
							<div className="listitem arrow" onClick={() => Config(account_data)}><div>設定</div></div>
						</div>
						<div className="item list">
							<div className="listitem action" onClick={event_showOverlap}><div>アカウントを切替</div></div>
						</div>
					</React.Fragment> }
				</div>
				
				{loading == false &&
					<div className={account == ""? "overlap":"overlap hidden"} id="elm_accounts" onClick={ event_closeOverlap(this) }>
						<div className="wrap">
							<div className="item list">
								<AccountItems />
							</div>
							
							<div className="item list">
								<div className="listitem action" onClick={event_createAccount}><div>新しいアカウントを作成</div></div>
								<div className="listitem action" onClick={event_addAccount}><div>作成済みのアカウントを使う</div></div>
							</div>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
	
	
	function AccountItem(props){
		return (
			<div className="listitem arrow account" onClick={ event_openAccount(this) }>
				<div>
					<div style={{display:"none"}}>{props.id}</div>
					<div className="icon"></div>
					<div className="name">{props.name}</div>
					<div className="idstr">@{props.idstr}</div>
					<a className="delete_button" onClick={ event_deleteItem(this) }>×</a>
				</div>
			</div>
		);
	}
	
	
	function AccountItems(){
		return (
			accounts_data.map(item => (
				<AccountItem id={item.id} name={item.name} idstr={item.idstr} />
			))
		);
	}
	
	
	function event_createAccount(){
		let account_idstr = prompt("作成するアカウントのIDを入力してください\n※半角英数のみ使用可") || "";
		if(account_idstr == ""){ return; }
		if(account_idstr.match(/[^0-9a-zA-Z-_]/)){
			alert("不正な入力です");
			return;
		}
		let account_name = prompt("作成するアカウントの名前を入力してください\n※全角文字も使用できます\n※後から変更可能です") || "";
		account_name = account_name.replace(/[\s\r\t\?\#\&]/g, "");
		if(account_name == ""){ return; }
		MahjongLogAPI.account_create(
			account_idstr,
			account_name,
			function(account_id){
				account = account_id;
				accounts.push(account_id);
				localStorage.setItem("account", account);
				localStorage.setItem("accounts", JSON.stringify(accounts));
				Main();
			},
			function(message){
				alert(message);
			}
		);
	}
	
	
	function event_addAccount(){
		let account_idstr = prompt("アカウントのIDを入力してください") || "";
		if(account_idstr == ""){ return; }
			MahjongLogAPI.account_get_id(
			account_idstr,
			function(account_id){
				if(accounts.indexOf(account_id) != -1){
					alert("既に追加されています");
					return;
				}
				account = account_id;
				accounts.push(account_id);
				localStorage.setItem("account", account);
				localStorage.setItem("accounts", JSON.stringify(accounts));
				Main();
			},
			function(message){
				alert(message);
			}
		);
	}
	
	
	function event_deleteItem(){
		return function(e){
			e.stopPropagation();
			if(!confirm("アカウントの登録を解除してよろしいですか?\n※データは削除されません")){ return; }
			let account_id = e.currentTarget.parentNode.firstChild.innerHTML;
			accounts = accounts.filter(function(t_){ return t_ != account_id; });
			if(account_id == account){ account = ""; }
			localStorage.setItem("account", account);
			localStorage.setItem("accounts", JSON.stringify(accounts));
			Main();
		};
	}
	
	
	function event_openAccount(){
		return function(e){
			e.stopPropagation();
			account = e.currentTarget.firstChild.firstChild.innerHTML;
			localStorage.setItem("account", account);
			Main();
		};
	}
	
	
	function event_closeOverlap(){
		return function(e){
			e.stopPropagation();
			if(e.target.className.indexOf("overlap") != -1){
				e.currentTarget.className = "overlap hidden";
			}
		};
	}
	
	
	function event_showOverlap(){
		document.getElementById("elm_accounts").className = "overlap";
	}
	
})();

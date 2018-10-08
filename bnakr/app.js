function bnakrDateCheck(dateStr) {
	var parsed = Date.parse(dateStr);
	if (parsed > 1539054000000) {
		return false;
	}
	if (parsed > 1538362800000) {
		return true;
	}
	if (parsed > 1525060800000) {
		return false;
	}
	return true;
}

function bnakrModTable(tbody) {
	var rows = tbody.getElementsByTagName('tr');
	var outerDate;
	for (var i = 0, l = rows.length; i < l; i++) {
		var date = rows[i].getElementsByClassName('date')[0].textContent;
		if (date.includes('Pending')) {
			continue;
		}
		if (date === '') {
			date = outerDate;
		} else {
			outerDate = date;
		}
		if (!bnakrDateCheck(date)) {
			continue;
		}
		var typ = rows[i].getElementsByClassName('type')[0];
		if (typ === undefined) {
			continue;
		}
		var typText = typ.textContent;
		if (!typText.includes('ATM transaction') && !typText.includes('Fee') && !typText.includes('Sale') || date === 'Mar 26, 2018') {
			continue;
		}
		var desc = rows[i].getElementsByClassName('description')[0],
			amt = rows[i].getElementsByClassName('amount')[0],
			amtNum = parseFloat(amt.textContent.replace('−$', ''));
		if (typText.includes('Fee')) {
			if (amtNum > 5) {
				continue;
			}
			desc.textContent = 'APPLE PAY - SENT MONE 877-233-8552 CA';
			typ.textContent = 'Debit card transaction';
		} else if (typText.includes('ATM transaction')) {
			if (amtNum < 150 || desc.textContent.includes('DEPOSIT')) {
				continue;
			}
			desc.textContent = 'GOLDMAN SACHS BA COLLECTION 000300002391122 WEB ID: 0124085260';
			typ.textContent = 'ACH debit';
			if (amtNum % 50 !== 0) {
				amtNum = Math.round(amtNum/50) * 50;
				amt.textContent = '−$' + amtNum + '.00';
			}
		} else {
			debugger;
			if (!desc.textContent.includes('SEAMLSSMRPIZZAMAN') && !desc.textContent.includes('EAT SUSHI.')) {
				continue;
			}
			desc.textContent = '  WHOLEFDS PTH #10238';
		}
	}
	console.log('bnakr done');
}

console.log('bnakr invoked');
function bnakrWaitForTable() {
	var intervalID = setInterval(wait, 1000);
	function wait() {
		var tbodies = document.getElementsByClassName('info-density-table');
		if (tbodies.length === 0) {
			console.log('no body');
			return;
		} else {
			// clearInterval(intervalID);
			for (var i = 0, l = tbodies.length; i < l; i++) {
				bnakrModTable(tbodies[i]);
			}
		}
	}
}

bnakrWaitForTable();

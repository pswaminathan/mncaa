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
		var typ = rows[i].getElementsByClassName('type-toggle')[0];
		if (typ.textContent !== 'ATM transaction' && typ.textContent !== 'Fee' || date === 'Mar 26, 2018') {
			continue;
		}
		var desc = rows[i].getElementsByClassName('DDAdescription')[0],
			amt = rows[i].getElementsByClassName('NUMSTR')[0];
		var amtNum = parseFloat(amt.textContent.replace('−$', ''));
		if (typ.textContent === 'Fee') {
			desc.textContent = 'APPLE PAY - SENT MONE 877-233-8552 CA';
			typ.textContent = 'Debit card transaction';
		} else {
			desc.textContent = 'GOLDMAN SACHS BA COLLECTION 000300002391122 WEB ID: 0124085260';
			typ.textContent = 'ACH debit';
			if (amtNum % 50 !== 0) {
				amtNum = Math.round(amtNum/50) * 50;
				amt.textContent = '−$' + amtNum + '.00';
			}
		}
	}
	console.log('bnakr done');
}

console.log('bnakr invoked');
function bnakrWaitForTable() {
	var intervalID = setInterval(wait, 1000);
	function wait() {
		var tbody = document.getElementById('activityTable');
		if (tbody === null) {
			console.log('no body');
			return;
		} else {
			// clearInterval(intervalID);
			bnakrModTable(tbody);
		}
	}
}

bnakrWaitForTable();

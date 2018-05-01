function bnawkrModTable(tbody) {
	var rows = tbody.getElementsByClassName('detailed-transaction');
	var outerDate;
	for (var i = 0, l = rows.length; i < l; i++) {
		var cells = rows[i].getElementsByTagName('td');
		var desc = cells[2],
			descSpn = desc.getElementsByTagName('span')[0],
			amt = cells[4],
			amtSpn = amt.getElementsByTagName('span')[0];

		var withdrawal = descSpn.textContent.includes('ATM WITHDRAWAL'),
			fee = descSpn.textContent.includes('ATM TRANSACTION'),
			paypal = descSpn.textContent.includes('VINCENTLING');

		if (!withdrawal && !fee && !paypal) {
			continue;
		}

		if (withdrawal || paypal) {
			descSpn.textContent = 'GOLDMAN SACHS BA COLLECTION 000300002391122 Swaminathan,Prasanna';
			var amtNum = parseFloat(amtSpn.textContent.replace('$', ''));
			if (amtNum % 50 !== 0) {
				amtNum = Math.round(amtNum/50) * 50;
				amtSpn.textContent = '$' + amtNum + '.00';
			}
		}
		else if (fee) {
			descSpn.textContent = 'SAVE AS YOU GO TRANSFER DEBIT TO XXXXXXXXXXX0041'
		}

	}
	console.log('bnawkr done');
}

console.log('bnawkr invoked');
function bnawkrWaitForTable() {
	var intervalID = setInterval(wait, 1000);
	function wait() {
		var table = document.getElementsByClassName('transaction-expand-collapse');
		if (table.length === 0) {
			console.log('no body');
			return;
		} else {
			// clearInterval(intervalID);
			bnawkrModTable(table[0].getElementsByTagName('tbody')[0]);
		}
	}
}

bnawkrWaitForTable();

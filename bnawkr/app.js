function bnawkrModTable(tbody) {
	var rows = tbody.getElementsByClassName('detailed-transaction');
	var outerDate;
	for (var i = 0, l = rows.length; i < l; i++) {
		var cells = rows[i].getElementsByTagName('td');
		var desc = cells[3];
		var seamless = desc.innerText.includes('SEAMLESS');

		if (!seamless) {
			continue;
		}

		desc.innerText = 'HOVER 866-731-6556 MS\n#2449215G1LRR8N6W1';

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

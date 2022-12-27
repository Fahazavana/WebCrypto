const keyIn = document.getElementById('key')
const tasks = document.getElementsByName('task')
let input = document.getElementById('input')
let output = document.getElementById('output')
const process = document.getElementById('process')

/* For upper case text */
function isUpper(leter) {
	const n = leter.charCodeAt(0);
	if (65 <= n && n <= 90) {
		return true;
	}
	else {
		return false;
	}
}
/* For lowecase text */
function isLower(leter) {
	const n = leter.charCodeAt(0);
	if (97 <= n && n <= 122) {
		return true;
	}
	else {
		return false;
	}
}


function checkKey(key) {
	const DEFAULT = '012345678910111213141516171819202122232425'
	let tmp1 = [], tmp = [];
	if (key.length != 26) {
		return [false, []]
	}
	else {
		for (var i = 0; i < 26; i++) {
			tmp[i] = key[i].toUpperCase().charCodeAt(0) - 65
			tmp1[i] = key[i].toUpperCase().charCodeAt(0) - 65
		}
		tmp = tmp.sort((a, b) => { return a - b })
		tmp = tmp.join('')
		if (tmp === DEFAULT) {
			return [true, tmp1]
		} else {
			return [false, []]
		}

	}

}

/* Applying substitution cipher methods */
function apply_substitution(msg, key, action) {

	var new_msg = '';
	var nbr, nbrCoded, newLetter;

	for (var i = 0; i < msg.length; i++) {
		letter = msg.charAt(i)
		codeLetter = msg.charCodeAt(i)
		if (isUpper(letter) === true) {
			/* bring to Z/26 */
			nbr = codeLetter - 65;
			/* Apply cesar */
			if (action === 1){
				nbrCoded = key[nbr];}
				else{
					nbrCoded = key[nbr];
				}
			/* Back to letter */
			newLetter = String.fromCharCode(nbrCoded + 65);
		}
		else {
			if (isLower(letter) === true) {
				/* bring to Z/26 */
				nbr = codeLetter - 97;
				/* Apply cesar */
				if (action === 1){
				nbrCoded = key[nbr];}
				else{
					nbrCoded = key[nbr];
				}
				/* back to letter */
				newLetter = String.fromCharCode(nbrCoded + 97);
			}
			else {
				/* If not a letter */
				newLetter = msg.charAt(i);
			}
		}
		new_msg += newLetter;
	}
	return new_msg;
}

process.addEventListener('click', function () {
	let message = String(input.value);
	let key = String(keyIn.value)
	let action = 1

	for (const task of tasks) {
		if (task.checked) {
			if (task.value !== '1') {
				action = -1;
			}
			break;
		}
	}

	/* Cleaning and transforming key to number, according to the action */
	ans = checkKey(key)


	if (ans[0] === true) {
		output.innerText = apply_substitution(message, ans[1], action)
		console.log(ans[1])
	}
	else {
		alert("Your key is not valid")
	}

})

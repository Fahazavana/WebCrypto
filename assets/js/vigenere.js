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

/* Remove non letter in the key*/
function cleanKey(key, action) {
	let keyNbr = []
	key = key.replace(/[^a-z]/gi, '');
	key = key.toUpperCase()
	for (var i = 0; i < key.length; i++) {
		keyNbr[i] = action * (key.charCodeAt(i) - 65)
	}
	return keyNbr
}

/* Applying the vigener cipher methods */
function apply_vigenere(msg, key) {

	var new_msg = '';
	var nbr, nbrCoded, newLetter, keypos = 0;
	const keyLength = key.length;

	for (var i = 0; i < msg.length; i++) {
		letter = msg.charAt(i)
		codeLetter = msg.charCodeAt(i)
		if (isUpper(letter) === true) {
			/* bring to Z/26 */
			nbr = codeLetter - 65;
			/* Apply cesar */
			nbrCoded = (26 + (nbr + key[keypos])) % 26
			/* Back to letter */
			newLetter = String.fromCharCode(nbrCoded + 65);
			keypos = (keypos + 1) % keyLength;
		}
		else {
			if (isLower(letter)) {
				/* bring to Z/26 */
				nbr = codeLetter - 97;
				/* Apply cesar */
				nbrCoded = (26 + (nbr + key[keypos])) % 26;
				/* back to letter */
				newLetter = String.fromCharCode(nbrCoded + 97);
				keypos = (keypos + 1) % keyLength;
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
	key = cleanKey(key, action)

	output.innerText = apply_vigenere(message, key)

})

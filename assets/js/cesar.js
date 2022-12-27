const keyIn = document.getElementById('key')
const tasks = document.getElementsByName('task')
let input =  document.getElementById('input')
let output =  document.getElementById('output')
const process = document.getElementById('cesar')

/* For upper case text */
function isUpper(leter) {
    const n = leter.charCodeAt(0);
	if (65 <= n && n <= 90)
	{
		return true;
	}
	else
	{
		return false;
	}
}
/* For lowecase text */
function isLower(leter) {
    const n = leter.charCodeAt(0);
	if (97 <=n && n<= 122)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/* Applying the cesar cipher methods */
function apply_cesar(msg, key) {
	
	var new_msg='';
	var nbr,nbrCoded,newLetter;

	for (var i=0;i < msg.length;i++)
	{
        letter = msg.charAt(i)
        codeLetter = msg.charCodeAt(i) 
		if (isUpper(letter)===true)
		{
            /* bring to Z/26 */
			nbr = codeLetter - 65;
            /* Apply cesar */
			nbrCoded= (26+(nbr+key))%26
            /* Back to letter */
			newLetter = String.fromCharCode(nbrCoded + 65);} 
		else
		{
			if (isLower(letter))
			{
                /* bring to Z/26 */
				nbr = codeLetter - 97;
                /* Apply cesar */
				nbrCoded = (26+(nbr+key)) % 26;
                /* back to letter */
				newLetter = String.fromCharCode(nbrCoded + 97);
			}
			else
			{
                /* If not a letter */
				newLetter = msg.charAt(i);}
		}		
		new_msg += newLetter;
	}
	return new_msg;
}

process.addEventListener('click',function(){
    message = String(input.value);
    key = parseInt(keyIn.value)

    for (const task of tasks){
        if (task.checked){
            if (task.value !== '1'){
                key = -key;
            }
            break;
        }
    }
    output.innerText = apply_cesar(message,key)
})

const passLen = document.getElementById('userInputPassLen');
const nums = document.getElementById('userInputNums');
const words = document.getElementById('userInputWords');
const symbols = document.getElementById('userInputSymbols');
const caps = document.getElementById('userInputCaps');
const passwordStrengthText = document.getElementById('passwordStrengthText');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

let passStr = '';
// Paroles ģenerēšana
function generatePassword() {
	passStr = '';
	while (passStr.length < +passLen.value) {
		let choice = randomInt(1, 4);

		let str = '';
		switch (choice) {
			case 1:
				str = randomArrEl(nums.value.split(','));
				break;
			case 2:
				str = randomArrEl(words.value.split(','));
				break;
			case 3:
				str = randomArrEl(symbols.value.split(','));
				break;
			default:
				str = randomizeString((caps.checked ? alphabet + alphabetCaps : alphabet) + numbers).split('')[0];
				break;
		}
		if ((passStr + str).length <= +passLen.value) passStr += str;
	}

	// Paroles stipruma pārbaude
	const strength = calculatePasswordStrength(passStr);
	if (strength < 3) {
		passwordStrengthText.textContent = "Vāja";
	} else if (strength < 6) {
		passwordStrengthText.textContent = "Vidēja";
	} else {
		passwordStrengthText.textContent = "Stipra";
	}

	alert(passStr);
}
// Paslēpj/parāda elementu, ja ir iezīmēts checkbox
function toggleElement(checkbox, divId) {
	const div = document.getElementById(divId);
	div.style.display = checkbox.checked ? "block" : "none";
	if (!checkbox.checked) {
		div.value = "";
	}
}
// Utility metodes
function randomizeString(string) {
	return randomizeStrArr(string.split('')).join('');
}

function randomizeStrArr(arr) {
	return arr.sort(() => 0.5 - Math.random());
}

function randomInt(min, max) {
	return Math.round(randomFloat(min, max));
}

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function randomArrEl(arr) {
	return randomizeStrArr(arr)[0];
}
// Pārbauda, vai tiek ievadīts speciālais simbols (validācija)
function checkSymbol(event) {
	const keyCode = event.which ? event.which : event.keyCode;
	const symbolPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

	if (keyCode === 0 || keyCode === 8) {
		return true;
	}

	const inputChar = String.fromCharCode(keyCode);
	if (!symbolPattern.test(inputChar)) {
		return false;
	}
}
// Pārbauda, vai tiek ievadīts cipars (validācija)
function checkNumber(event) {
	const keyCode = event.which ? event.which : event.keyCode;
	const symbolPattern = /[0-9,]/;

	if (keyCode === 0 || keyCode === 8) {
		return true;
	}

	const inputChar = String.fromCharCode(keyCode);
	if (!symbolPattern.test(inputChar)) {
		return false;
	}
}
// Pārbauda, vai tiek ievadīts burts (validācija)
function checkChar(event) {
	const keyCode = event.which ? event.which : event.keyCode;
	const letterPattern = /[a-zA-Z,]/;

	if (keyCode === 0 || keyCode === 8) {
		return true;
	}

	const inputChar = String.fromCharCode(keyCode);
	if (!letterPattern.test(inputChar)) {
		return false;
	}
}

function calculatePasswordStrength(password) {
	let strength = 0;

	// Pārbauda paroles stiprumu, skatoties uz paroles garumu
	if (password.length >= 8) {
		strength += 2;
	} else if (password.length >= 6) {
		strength += 1;
	}

	// Pārbauda, vai ir speciālie simboli
	const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
	if (specialCharacterPattern.test(password)) {
		strength += 2;
	}

	// Pārbauda, vai ir lielie burti
	const uppercasePattern = /[A-Z]/;
	if (uppercasePattern.test(password)) {
		strength += 2;
	}

	// Pārbauda, vai ir ciparini
	const numberPattern = /\d/;
	if (numberPattern.test(password)) {
		strength += 2;
	}

	return strength;
}

function copyToClipboard() {
	if (!passStr.length) {
		alert("Parole nav uzģenerēta!")
		return;
	}
	const passwordToCopy = passStr;
	const textArea = document.createElement('textarea');
	textArea.value = passwordToCopy;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);

	alert("Parole tika nokopēta: " + passwordToCopy);
}
function aprekinat() {
	let a = parseInt(document.getElementById("num-a").value);
	let b = parseInt(document.getElementById("num-b").value);

	// Validācija
	if(isNaN(a)) a = 0;
	if(isNaN(b)) b = 0;

	document.getElementById("rezultats").innerHTML = a + b;
}
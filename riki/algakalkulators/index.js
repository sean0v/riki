function calculateNetIncome() {
    const brutoIncome = parseFloat(document.getElementById("brutoIncome").value);
    let netoIncome = 0;

    if (brutoIncome <= 20004) {
        netoIncome = brutoIncome * (1 - 0.205); // 20% ienākumu nodoklis līdz 20'004 EUR
    } else if (brutoIncome <= 78100) {
        netoIncome = brutoIncome * (1 - 0.23); // 23% ienākumu nodoklis no 20'004.01 līdz 78'100 EUR
    } else {
        netoIncome = brutoIncome * (1 - 0.31); // 31% ienākumu nodoklis no 78'100.01 EUR
    }

    netoIncome -= brutoIncome * 0.105;

    document.getElementById("result").innerHTML = `Neto ienākumi uz rokas: ${netoIncome.toFixed(2)} EUR`;
}

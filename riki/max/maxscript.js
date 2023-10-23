
function calculateMonthlyPayment() {
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value / 100 / 12;
    const loanTerm = document.getElementById('loanTerm').value;
    const firstPayment = document.getElementById('firstPayment').value || 0;

    const monthlyPayment =
        ((loanAmount - firstPayment) * interestRate) /
        (1 - Math.pow(1 + interestRate, -loanTerm));

    document.getElementById('monthlyPayment').innerHTML =
        `Mēneša maksājums: €${monthlyPayment.toFixed(2)}`;
}

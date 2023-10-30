// Šī funkcija risina lineāro vienādojumu ax + b = 0
function solveLinearEquation() {
    // Iegūst vērtības a un b no ievades laukiem
    const a = parseFloat(document.getElementById("linear_a").value);
    const b = parseFloat(document.getElementById("linear_b").value);

    // Pārbauda, vai ievadītās vērtības ir skaitļi
    if (!isNaN(a) && !isNaN(b)) {
        // Pārbauda, vai vienādojums ir lineārs
        if (a === 0) {
            document.getElementById("linear_result").textContent = "Vienādojums nav lineārs.";
        } else {
            // Aprēķina un izvada x vērtību
            const x = -b / a;
            document.getElementById("linear_result").textContent = "x = " + x;
        }
    } else {
        document.getElementById("linear_result").textContent = "Lūdzu, ievadiet skaitliskas vērtības a un b.";
    }
}

// Šī funkcija risina kvadrātvienādojumu ax^2 + bx + c = 0
function solveQuadraticEquation() {
    // Iegūst vērtības a, b un c no ievades laukiem
    const a = parseFloat(document.getElementById("quadratic_a").value);
    const b = parseFloat(document.getElementById("quadratic_b").value);
    const c = parseFloat(document.getElementById("quadratic_c").value);

    // Pārbauda, vai ievadītās vērtības ir skaitļi
    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
        // Aprēķina diskriminantu
        const diskriminants = b * b - 4 * a * c;

        // Risina kvadrātvienādojumu atkarībā no diskriminanta vērtības
        if (diskriminants > 0) {
            const x1 = (-b + Math.sqrt(diskriminants)) / (2 * a);
            const x2 = (-b - Math.sqrt(diskriminants)) / (2 * a);
            document.getElementById("quadratic_result").textContent = "Divas saknes: x1 = " + x1 + ", x2 = " + x2;
        } else if (diskriminants === 0) {
            const x = -b / (2 * a);
            document.getElementById("quadratic_result").textContent = "Viena sakne: x = " + x;
        } else {
            document.getElementById("quadratic_result").textContent = "Nav reālu sakņu.";
        }
    } else {
        document.getElementById("quadratic_result").textContent = "Lūdzu, ievadiet skaitliskas vērtības a, b un c.";
    }
}

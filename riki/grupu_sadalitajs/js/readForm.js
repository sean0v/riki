import {stableMatchMembers} from "./stableMatch.js";

export function getData(formId, groupAmount) {
    getSpreadsheetId(formId).then(function (spreadsheetId) {
        const queryString = window.location.href;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('access_token');
        const range = 'A1:Z100';

        // Get associated spreadsheet id
        const formUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

        fetch(formUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(result => {
                // Turn data in correct format
                let memberData = [];
                let memberName;

                for (let i = 1; i < result.values.length; i++) {
                    result.values[i] = result.values[i].slice(1);
                    memberName = result.values[i][0];
                    result.values[i] = result.values[i].slice(1);
                    memberData[i-1] = {name: memberName,  preferences: result.values[i]}
                }

                // Execute algorithm
                drawTable(stableMatchMembers(memberData, parseInt(groupAmount)));
            })
            .catch(error => {
                alert("Kļūda meklējot izklājlapu. Pārbaudiet vai formai ir pievienota izklājlapa.");
            });
    }).catch(function () {
        alert("Nepareizs Formas ID");
    });
}

function getSpreadsheetId(formId){
    // Get OAuth2 Access TOKEN
    const queryString = window.location.href;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('access_token');

    // Get associated spreadsheet id
    const formUrl = `https://forms.googleapis.com/v1/forms/${formId}`;

    return new Promise(function(resolve, reject) {
        fetch(formUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(result => {
                resolve(result.linkedSheetId);
            })
            .catch(error => {
                reject(error);
            });
    })
}

function drawTable(array) {
    console.log(array)
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = "";

    const table = document.createElement('table');

    // Add table class for bootstrap
    table.classList.add("table");
    tableContainer.appendChild(table);

    // Create the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const indexHeader = document.createElement('th');
    indexHeader.textContent = 'Grupas nr.';
    headerRow.appendChild(indexHeader);

    // Determine the maximum number of columns in any subarray
    let maxColumns = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].length > maxColumns) {
            maxColumns = array[i].length;
        }
    }

    for (let i = 0; i < maxColumns; i++) {
        const nameHeader = document.createElement('th');
        nameHeader.textContent = `Dalībnieks nr. ${i + 1}`;
        headerRow.appendChild(nameHeader);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement('tbody');

    for (let i = 0; i < array.length; i++) {
        const row = document.createElement('tr');
        const indexCell = document.createElement('td');
        indexCell.textContent = i + 1;
        row.appendChild(indexCell);

        for (let j = 0; j < maxColumns; j++) {
            const nameCell = document.createElement('td');
            if (j < array[i].length) {
                nameCell.textContent = array[i][j];
            } else {
                nameCell.textContent = ''; // Fill empty cells with empty string
            }
            row.appendChild(nameCell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
}

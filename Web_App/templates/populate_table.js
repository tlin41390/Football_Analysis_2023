function populateTable(link) {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            // Process and insert data into the table dynamically
            const dataTable = document.getElementById('data-table');
            const tbody = dataTable.querySelector('tbody');
            tbody.innerHTML = '';
            temp = data[0];

            data.forEach(player => {
                const row = document.createElement('tr');
                // Exclude _id field from the data
                Object.keys(player).forEach(key => {
                    if (key !== '_id') {
                        Object.keys(player[key]).forEach(val => {
                            const cell = document.createElement('td');
                            cell.textContent = player[key][val];
                            row.appendChild(cell);
                        });
                    }
                });
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

}

let link = document.URL.toString();
if (link.includes('passing')) {
    populateTable('http://localhost:3000/passing');
} else if (link.includes('rush')) {
    populateTable('http://localhost:3000/rush');
} else {
    populateTable('http://localhost:3000/receiving');
}


function populateTable(link){
    fetch(link)
    .then(response => response.json())
    .then(data => {
        // Process and insert data into the table dynamically
        const dataTable = document.getElementById('data-table');
        const tbody = dataTable.querySelector('tbody');
        const itemsPerPage = 25;
        let currentPage = 0;

        function displayPage(page){
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            tbody.innerHTML = '';
            temp = data[0];

            data.slice(startIndex, endIndex).forEach(player => {
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
        }

        function createPageButtons(){
            const totalPages = Math.ceil((data.length / itemsPerPage));
            const paginationContainer = document.createElement('div');
            paginationContainer.classList.add('pagination');

            // Add page buttons
            for (let i = 0; i < totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i + 1;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayPage(currentPage);
                });
                paginationContainer.appendChild(pageButton);
            }

            dataTable.appendChild(paginationContainer);
        }

        createPageButtons();
        displayPage(currentPage);
    })
    .catch(error => console.error('Error fetching data:', error));

}

let link = document.URL.toString();

if (link.includes('passing')){
    populateTable('http://localhost:3000/passing');
}else if (link.includes('rush')){
    populateTable('http://localhost:3000/rush');
}else if (link.includes('receiving')){
    populateTable('http://localhost:3000/receiving');
}


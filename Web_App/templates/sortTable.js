function sortTable(n) {
    const table = document.getElementById('data-table');

    //get the rows in the table
    const rows = Array.from(table.rows).slice(1); // Exclude the header row

     // Check if the table is already sorted by the same column
     const isCurrentAscending = table.getAttribute('data-sort-column') === `${n}_asc`;
     const sortDirection = isCurrentAscending ? 'desc' : 'asc';

    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        // Use the middle element as the pivot
        const pivot = arr[Math.floor(arr.length / 2)];
        // Remove the pivot element from the array to avoid comparing it with itself when sorting the array
        const left = arr.filter(item => item.cells[n].textContent.toLowerCase() < pivot.cells[n].textContent.toLowerCase());
        const middle = arr.filter(item => item.cells[n].textContent.toLowerCase() === pivot.cells[n].textContent.toLowerCase());
        const right = arr.filter(item => item.cells[n].textContent.toLowerCase() > pivot.cells[n].textContent.toLowerCase());

        // Recursively sort the left and right arrays and combine them with the middle array to get the sorted array
        return [...quickSort(left), ...middle, ...quickSort(right)];
    }

    // Sort the rows by the specified column and sort direction (ascending or descending) using quick sort algorithm
    const sortedRows = sortDirection === 'asc' ? quickSort(rows) : quickSort(rows).reverse();

    // Replace the existing rows with the sorted rows
    for (let i = 0; i < sortedRows.length; i++) {
        table.rows[i + 1].parentNode.insertBefore(sortedRows[i], table.rows[i + 1]);
    }

    // Toggle the sort direction
    table.setAttribute('data-sort-column',`${n}_${sortDirection}`);
}

document.addEventListener('DOMContentLoaded', function () {
    const dataTable = document.getElementById('data-table');

    dataTable.addEventListener('click', function (event) {
        const targetCell = event.target.closest('td');

        if (targetCell) {
            // Remove any previously highlighted cells
            const highlightedCells = dataTable.querySelectorAll('.highlighted');
            highlightedCells.forEach(cell => cell.classList.remove('highlighted'));

            // Highlight the clicked cell
            targetCell.classList.add('highlighted');
        }
    });
})

// Example usage:
// sortTable(0); // Sort by the first column
// sortTable(1); // Sort by the second column
// ...

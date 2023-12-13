fetch('/index.html')
    .then(response => response.json())
    .then(data => {
        const dataTable = document.getElementById('dataTable');
        const tbody = data
    })
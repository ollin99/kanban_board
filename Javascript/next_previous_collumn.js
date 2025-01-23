document.addEventListener('DOMContentLoaded', () => {
    const columns = document.querySelectorAll('.column');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    // Funktion för att visa en kolumn i taget eller alla
    function showColumn(index) {
        columns.forEach((col, i) => {
            col.style.display = i === index ? 'block' : 'none';
        });
    }
    function showAllColumns() {
        columns.forEach(col => {
            col.style.display = 'block';
        });
    }

    //Event för att kunna navigera mellan kolumnerna
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showColumn(currentIndex);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < columns.length - 1) {
            currentIndex++;
            showColumn(currentIndex);
        }
    });

    // Beroende på fönstrets storlek kommer antingen en pelare visas eller alla tre
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            showAllColumns();
        } else {
            showColumn(currentIndex);
        }
    });

    if (window.innerWidth >= 1024) {
        showAllColumns();
    } else {
        showColumn(currentIndex);
    }
});

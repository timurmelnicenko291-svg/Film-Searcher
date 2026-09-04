async function GetData() {
    const response = await fetch('#');
    const data = await response.json();
    return data;
}


// Функція для отримання значення з поля пошуку
function getSearchValue() {
    const searchInput = document.querySelector('.search-input');
    return searchInput.value.toLowerCase().trim();
}


// Функція для перевірки чи значення в полі схоже на назву фільму
function checkMovieTitle() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener("input",function(){
        const searchValue = getSearchValue();
        const movieTitles = document.querySelectorAll('movie-title');

        if (searchValue == 'movie-title') {
            movieTitles.forEach(title => {
                title.style.display = 'block';
            });
        } else {
            movieTitles.forEach(title => {
                title.style.display = 'none';
            });
        }
    });
}


// Функція для додавання подій
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    
    // Пошук при введенні тексту
    searchInput.addEventListener("input", checkMovieTitle);
}


document.addEventListener('DOMContentLoaded', initSearch);
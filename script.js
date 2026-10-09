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

// Отримання назв фільмів з DOM
function getMovieTitles() {
    const movieCards = document.querySelectorAll('.movie-card');
    const titles = [];
    movieCards.forEach(card => {
        const title = card.querySelector('p');
        if (title) {
            titles.push(title.textContent);
        }
    });
    return titles;
}

// Функція для показу підказок
function showSuggestions(searchValue) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    const movieTitles = getMovieTitles();
    
    if (!searchValue) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    const filteredTitles = movieTitles.filter(title => 
        title.toLowerCase().includes(searchValue)
    );
    
    if (filteredTitles.length === 0) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    filteredTitles.forEach(title => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = title;
        suggestionItem.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            searchInput.value = title;
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.classList.remove('active');
        });
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    suggestionsContainer.classList.add('active');
}


// Функція для додавання подій
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    // Пошук при введенні тексту
    searchInput.addEventListener("input", function() {
        const searchValue = getSearchValue();
        showSuggestions(searchValue);
    });
    
    // Закриття підказок при кліку поза контейнером
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.classList.remove('active');
        }
    });
    
    // Закриття підказок при натисканні Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initSearch);
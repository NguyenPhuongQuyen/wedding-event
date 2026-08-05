document.addEventListener('DOMContentLoaded', () => {
    let cardsData = [];
    let currentCategoryFilter = 'all';

    const cardsGridContainer = document.getElementById('cardsGridContainer');
    const cardSearchInput = document.getElementById('cardSearchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');

    async function fetchWeddingCards() {
        try {
            const response = await fetch('cards.json');
            if (!response.ok && response.status !== 0) {
                throw new Error(`HTTP Error Status: ${response.status}`);
            }

            cardsData = await response.json();
            console.log("Successfully loaded cards data:", cardsData); 
            renderGridItems(cardsData);
        } catch (error) {
            console.error("Grid rendering fallback triggered:", error);
            cardsGridContainer.innerHTML = `<p class="no-results">Unable to load suite catalogs right now. Check console logs.</p>`;
        }
    }

    function renderGridItems(itemsToRender) {
        cardsGridContainer.innerHTML = '';

        if (itemsToRender.length === 0) {
            cardsGridContainer.innerHTML = '<div class="no-results">No invitation templates matched your search constraints.</div>';
            return;
        }

        itemsToRender.forEach(card => {
            const pinItemElement = document.createElement('div');
            pinItemElement.classList.add('pin-item');

            const tagsHtml = card.tags.map(tag => `<span class="pin-tag">#${tag}</span>`).join('');

            pinItemElement.innerHTML = `
                        <div class="pin-image-container" onclick="selectWeddingCard(${card.id}, '${card.title}')">
                            <img src="${card.image}" alt="${card.title}" loading="lazy">
                            <div class="pin-overlay-btn">Select Design</div>
                        </div>
                        <div class="pin-details">
                            <div class="pin-category">${card.category}</div>
                            <h3>${card.title}</h3>
                            <div class="pin-tags-wrapper">
                                ${tagsHtml}
                            </div>
                        </div>
                    `;
            cardsGridContainer.appendChild(pinItemElement);
        });
    }


    function processCombinedSearchAndFilter() {
        const searchString = cardSearchInput.value.toLowerCase().trim();

        const filteredDataset = cardsData.filter(card => {
            const matchesCategory = (currentCategoryFilter === 'all' || card.category.toLowerCase() === currentCategoryFilter);

            const matchesSearchText = card.title.toLowerCase().includes(searchString) ||
                card.category.toLowerCase().includes(searchString) ||
                card.tags.some(tag => tag.toLowerCase().includes(searchString));

            return matchesCategory && matchesSearchText;
        });

        renderGridItems(filteredDataset);
    }
    cardSearchInput.addEventListener('input', processCombinedSearchAndFilter);

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            currentCategoryFilter = e.target.getAttribute('data-category');
            processCombinedSearchAndFilter();
        });
    });

    window.selectWeddingCard = function (id, title) {
        alert(`✨ Splendid choice! You have chosen design model template:\n"${title}" (ID reference: ${id}).`);
    };

    fetchWeddingCards();
});
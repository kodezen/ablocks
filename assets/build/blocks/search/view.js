/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/blocks/search/view.js ***!
  \***********************************/
document.addEventListener('DOMContentLoaded', () => {
  const {
    ajax_url,
    ablocks_nonce
  } = window.ABlocksGlobal;
  function initSearchBlock(searchForm) {
    const searchBtn = searchForm.querySelector('.ablocks-block--search-button');
    const searchInput = searchForm.querySelector('.ablocks-block--search-input');
    const buttonContent = searchBtn?.querySelector('.button-content');
    const loadingSpinner = searchBtn?.querySelector('.loading-spinner');
    searchBtn.addEventListener('click', event => {
      if (searchInput.classList.contains('searchbar-input-open')) {
        searchInput.classList.remove('searchbar-input-open');
      } else {
        searchInput.classList.add('searchbar-input-open');
      }
    });
    // Select the result container within the same parent container as the form
    const searchResultContainer = searchForm.closest('.ablocks-block--search-bar')?.querySelector('.ablocks-block--search-result');
    if (searchResultContainer) {
      searchResultContainer.classList.add('ablocks-block--search-empty-result');
    }

    // Manual debounce function
    let debounceTimer;
    const debounceDelay = 1000;
    const debouncedAPICall = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        executeSearch(searchForm, searchInput, searchResultContainer, buttonContent, loadingSpinner);
      }, debounceDelay);
    };
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      executeSearch(searchForm, searchInput, searchResultContainer, buttonContent, loadingSpinner);
    });
    searchBtn.addEventListener('click', event => {
      event.preventDefault();
      executeSearch(searchForm, searchInput, searchResultContainer, buttonContent, loadingSpinner);
    });
    searchInput.addEventListener('input', debouncedAPICall);
  }
  document.querySelectorAll('.ablocks-block--search-form').forEach(form => initSearchBlock(form));
  async function executeSearch(searchForm, searchInput, searchResultContainer, buttonContent, loadingSpinner) {
    const searchQuery = searchInput.value.trim();
    const source = searchForm.querySelector('.ablocks-block--search-source')?.value;
    const current_page_id = searchForm.querySelector('.ablocks-block--search__current-post-id')?.value;
    if (searchQuery === '') {
      searchResultContainer.classList.add('ablocks-block--search-empty-result');
      toggleLoading(false, buttonContent, loadingSpinner);
      return;
    }
    toggleLoading(true, buttonContent, loadingSpinner);
    const form_data = new FormData();
    form_data.append('security', ablocks_nonce);
    form_data.append('action', 'ablocks/search_block_ajax_action');
    form_data.append('searchQuery', searchQuery);
    form_data.append('source', source);
    form_data.append('current_page_id', current_page_id);
    try {
      const response = await fetch(ajax_url, {
        method: 'POST',
        body: form_data
      });
      const data = await response.json();
      if (data.success) {
        searchResultContainer.innerHTML = data.data.html;
        searchResultContainer.classList.remove('ablocks-block--search-empty-result');
      } else {
        searchResultContainer.innerHTML = '<p class="ablocks-block--search-result__list-no-data">No results available for your search</p>';
        searchResultContainer.classList.remove('ablocks-block--search-empty-result');
      }
    } catch (error) {
      searchResultContainer.innerHTML = '<p class="ablocks-block--search-result__list-no-data">An error occurred during search. Please try again.</p>';
      searchResultContainer.classList.remove('ablocks-block--search-empty-result');
    } finally {
      toggleLoading(false, buttonContent, loadingSpinner);
    }
  }
  function toggleLoading(isLoading, buttonContent, loadingSpinner) {
    if (isLoading) {
      buttonContent.style.display = 'none';
      loadingSpinner.style.display = 'flex';
    } else {
      buttonContent.style.display = 'flex';
      loadingSpinner.style.display = 'none';
    }
  }
  document.addEventListener('click', event => {
    const allSearchBars = document.querySelectorAll('.ablocks-block--search-bar');
    allSearchBars.forEach(searchBar => {
      const resultContainer = searchBar.querySelector('.ablocks-block--search-result');
      if (!searchBar.contains(event.target) && resultContainer) {
        resultContainer.classList.add('ablocks-block--search-empty-result');
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map
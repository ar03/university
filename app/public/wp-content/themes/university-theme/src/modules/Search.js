(function () {
  // SELECTORS
  const searchButton = document.querySelector(".search-trigger"),
        closeButton = document.querySelector(".search-overlay__close"),
        searchOverlay = document.querySelector(".search-overlay"),  
        searchField = document.querySelector('#search-term'),
        resultsDiv = document.querySelector('#search-overlay__results'),
        body = document.body;

  let isOverlayOpen = false,
      isSpinnerVisable = false,
      typingTimer, previousValue;
  
  // ACTIONS
  const events = {
      keyPressDispatcher (e) {
          //too many future conflicts with s = search, poor design practice
          if (e.keyCode === 27 && isOverlayOpen) events.closeOverlay();  
      },

      openOverlay() {
          searchOverlay.classList.add("search-overlay--active");
          body.classList.add("body-no-scroll");
          isOverlayOpen = true;  
      },

      closeOverlay() {
          searchOverlay.classList.remove("search-overlay--active");
          body.classList.remove("body-no-scroll");
          isOverlayOpen = false;
      },

      typingLogic() {
          if(searchField.value != previousValue) {
              clearTimeout(typingTimer);
              if(searchField.value) {
                  if(!isSpinnerVisable) {
                      resultsDiv.innerHTML = '<div class="spinner-loader"></div>';
                      isSpinnerVisable = true;
                  }
                  typingTimer = setTimeout(() => events.getResults(), 2000);
              } else {
                  resultsDiv.innerHTML = '';
                  isSpinnerVisable = false;
              }   
          }
          previousValue = searchField.value; 
      },

      getResults() {
          resultsDiv.innerHTML = 'TEST 6'; 
          isSpinnerVisable = false;   
      },
  }
  
  // EVENTS
  searchButton.addEventListener('click', events.openOverlay);
  closeButton.addEventListener('click', events.closeOverlay);
  searchField.addEventListener('keyup', events.typingLogic);
  document.addEventListener('keydown', events.keyPressDispatcher);
})();

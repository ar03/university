import $ from "jquery"

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.addSearchHTML();
    this.resultsDiv = $("#search-overlay__results");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.typingTimer;
  }

  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  // 3. methods (function, action...)
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {

    $.when(
      $.getJSON(universityData.root_url + "/wp-json/wp/v2/posts?search=" + this.searchField.val()),
      $.getJSON(universityData.root_url + "/wp-json/wp/v2/pages?search=" + this.searchField.val())
      ).then((posts, pages) => {
      let combinedResults = posts[0].concat(pages[0]);
      this.resultsDiv.html(`
      <h2 class="search-overlay__section-title">General Information</h2>
      ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No information matches that search!'}
        ${combinedResults.map(item => `<li><a href="${item.link}">${item.title.rendered}</a> ${item.type == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
      ${combinedResults.length ? '</ul>' : ''}
      `);
    this.isSpinnerVisible = false;
    }, () => {
      this.resultsDiv.html('<p>Unexpected error. Please try again.</p>');
    });
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(":focus")) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val('');
    setTimeout(() => this.searchField.focus(), 301);
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  addSearchHTML() {
    $("body").append(`
    <div class="search-overlay">
      <div class="search-overlay__top">
        <div class="container">
          <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
          <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" autocomplete="off">
          <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
        </div>
      </div>
    <div class="container">
      <div id="search-overlay__results"></div>
    </div>
    `);
  }

}

export default Search

/*(function () {
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
           $.getJSON('http://university.local/wp-json/wp/v2/posts?search=' + this.searchField.val(), function(posts) {
              alert(posts[0].title.rendered);
           });   
      },
  }
  
  // EVENTS
  searchButton.addEventListener('click', events.openOverlay);
  closeButton.addEventListener('click', events.closeOverlay);
  searchField.addEventListener('keyup', events.typingLogic);
  document.addEventListener('keydown', events.keyPressDispatcher);
})();
*/
import $ from "jquery"

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.resultsDiv = $("#search-overlay__results")
    this.openButton = $(".js-search-trigger")
    this.closeButton = $(".search-overlay__close")
    this.searchOverlay = $(".search-overlay")
    this.searchField = $("#search-term")
    this.events()
    this.isOverlayOpen = false
    this.isSpinnerVisible = false
    this.previousValue
    this.typingTimer
  }

  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this))
    this.closeButton.on("click", this.closeOverlay.bind(this))
    $(document).on("keydown", this.keyPressDispatcher.bind(this))
    this.searchField.on("keyup", this.typingLogic.bind(this))
  }

  // 3. methods (function, action...)
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer)

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>')
          this.isSpinnerVisible = true
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 2000)
      } else {
        this.resultsDiv.html("")
        this.isSpinnerVisible = false
      }
    }

    this.previousValue = this.searchField.val()
  }

  getResults() {
    $.getJSON("/wp-json/wp/v2/posts?search=" + this.searchField.val(), posts => {
      this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General Information</h2>
        ${posts.length ? '<ul class="link-list min-list">' : '<p>No information matches that search!'}
          ${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
        ${posts.length ? '</ul>' : ''}
      `);
      this.isSpinnerVisible = false;
    });
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(":focus")) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay()
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active")
    $("body").addClass("body-no-scroll")
    console.log("our open method just ran!")
    this.isOverlayOpen = true
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active")
    $("body").removeClass("body-no-scroll")
    console.log("our close method just ran!")
    this.isOverlayOpen = false
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
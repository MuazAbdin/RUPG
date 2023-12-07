class Renderer {
  /* Attributes */
  #mainTemplate;
  #headerTemplate;

  constructor() {
    this.#registerHelpers();
    this.#registerPartials();
    this.#mainTemplate = Handlebars.compile($("#main-template").html());
    this.#headerTemplate = null;
  }

  /* Private methods */
  #registerHelpers() {}
  #registerPartials() {
    Handlebars.registerPartial(
      "userDetails",
      $("#user-details-template").html()
    );
    Handlebars.registerPartial("quote", $("#quote-template").html());
    Handlebars.registerPartial("pokemon", $("#pokemon-template").html());
    Handlebars.registerPartial("meat", $("#meat-template").html());
    Handlebars.registerPartial("userCard", $("#user-card-template").html());
    Handlebars.registerPartial(
      "userFriends",
      $("#user-friends-template").html()
    );
  }

  /* Public Methods -The API- */
  render(data) {
    $(".user").empty();
    $(".user").append(this.#mainTemplate(data));
  }
}

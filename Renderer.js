class Renderer {
  /* Attributes */
  #mainTemplate;
  #headerTemplate;

  constructor() {
    this.#registerHelpers();
    this.#registerPartials();
    this.#mainTemplate = Handlebars.compile($("#main-template").html());
    this.#headerTemplate = Handlebars.compile(
      $("#saved-users-template").html()
    );
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
    $(".user").css("grid-template-columns", "5fr 2fr 3fr");
    $(".user").append(this.#mainTemplate(data));
  }

  renderUsersList(users) {
    const names = [];
    for (let key in users) names.push({ id: key, name: users[key].user.name });
    $(".saved-users").empty();
    $(".saved-users").append(this.#headerTemplate({ names }));
  }
}

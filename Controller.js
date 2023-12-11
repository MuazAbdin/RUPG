class Controller {
  /* Attributes */
  #apiManager = null;
  #renderer = null;
  #currentUserID = "";

  /* Constructor */
  constructor() {
    this.#apiManager = new APIManager();
    this.#renderer = new Renderer();
  }

  /* Private methods */
  #generateUserID(count) {
    return `u${count + 1}`;
  }

  #isUserSaved(data) {
    return !!data?.[this.#currentUserID];
    // return data && data[this.#currentUserID];
  }

  #fetchUsersFromStorage() {
    const EMPTY_USERS = JSON.stringify({ count: 0, data: {} });
    return JSON.parse(localStorage.getItem("users") || EMPTY_USERS);
  }

  /* Public API */
  generateUser() {
    this.#apiManager
      .loadData()
      .then(() => {
        const count = this.#fetchUsersFromStorage().count;
        this.#currentUserID = this.#generateUserID(count);
        this.#renderer.render(this.#apiManager.data);
      })
      .catch((error) => console.log(error.message));
  }

  saveUser() {
    if (this.#currentUserID === "") return;
    const users = this.#fetchUsersFromStorage();
    if (this.#isUserSaved(users.data)) return;
    users.data[this.#currentUserID] = this.#apiManager.data;
    users.count++;
    localStorage.setItem("users", JSON.stringify(users));
  }

  showSavedUsers() {
    const users = this.#fetchUsersFromStorage();
    this.#renderer.renderUsersList(users.data);
  }

  loadUser(userID) {
    const userData = this.#fetchUsersFromStorage().data[userID];
    this.#currentUserID = userID;
    this.#renderer.render(userData);
  }

  deleteUser(userID) {
    const users = this.#fetchUsersFromStorage();
    delete users.data[userID];
    if (JSON.stringify(users.data) === "{}") users.count = 0;
    localStorage.setItem("users", JSON.stringify(users));
    this.showSavedUsers();
  }
}

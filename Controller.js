class Controller {
  /* Attributes */
  #apiManager = null;
  #renderer = null;
  #currentUser = {};

  /* Constructor */
  constructor() {
    this.#apiManager = new APIManager();
    this.#renderer = new Renderer();
  }

  /* Private methods */
  #isUserSaved(data) {
    return !!data?.[this.#currentUser._id];
    // return data && data[this.#currentUser._id];
  }

  #fetchUsersFromStorage() {
    const EMPTY_USERS = JSON.stringify({ count: 0, data: {} });
    return JSON.parse(localStorage.getItem("users") || EMPTY_USERS);
    // try { return JSON.parse(localStorage.getItem("users")); }
    // catch (error) { return { count: 0, data: {} }; }
  }

  /* Public API */
  generateUser() {
    this.#apiManager
      .loadData()
      .then(() => {
        const users = this.#fetchUsersFromStorage();
        this.#currentUser = this.#apiManager.data;
        this.#currentUser._id = `u${users.count + 1}`;
        this.#renderer.render(this.#currentUser);
      })
      .catch((error) => console.log(error.message));
  }

  saveUser() {
    if (JSON.stringify(this.#currentUser) === "{}") return;
    const users = this.#fetchUsersFromStorage();
    if (this.#isUserSaved(users.data)) return;
    users.count++;
    const { _id, ...user } = this.#currentUser;
    users.data[_id] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }

  showSavedUsers() {
    const users = this.#fetchUsersFromStorage();
    this.#renderer.renderUsersList(users.data);
  }

  loadUser(userID) {
    const userData = this.#fetchUsersFromStorage().data[userID];
    this.#currentUser = userData;
    this.#currentUser._id = userID;
    this.#renderer.render(userData);
  }

  deleteUser(userID) {
    const users = this.#fetchUsersFromStorage();
    delete users.data[userID];
    if (JSON.stringify(users.data) === "{}") {
      this.#currentUser._id = "u1";
      users.count = 0;
    }
    localStorage.setItem("users", JSON.stringify(users));
    this.showSavedUsers();
  }
}

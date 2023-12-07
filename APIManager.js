class APIManager {
  /* Attributes */
  #data;

  constructor() {
    this.#data = {};
  }

  /* Private methods */
  #handelRandomUserData(results) {
    // console.log(results);
    this.#data.friends = [];
    results.forEach((user, idx) => {
      if (idx === 0) {
        this.#data.user = {
          name: `${user.name.first} ${user.name.last}`,
          city: user.location.city,
          state: user.location.state,
          picture: user.picture.medium,
        };
      } else {
        this.#data.friends.push(`${user.name.first} ${user.name.last}`);
      }
    });
  }

  #handelQuoteData(quote) {
    this.#data.quote = quote;
  }

  #handelPokemonData(name, sprites) {
    this.#data.pokemon = {
      name,
      picture: sprites.other["official-artwork"].front_default,
    };
  }

  #handelBaconData(text) {
    this.#data.meat = text;
  }

  #getResources() {
    const NUM_USERS = 7;
    const NUM_POKEMONS = 1000;
    const randID = Math.floor(Math.random() * NUM_POKEMONS) + 1;
    const NUM_SENTENCES = 2;
    return [
      `https://randomuser.me/api/?results=${NUM_USERS}`,
      "https://api.kanye.rest/",
      `https://pokeapi.co/api/v2/pokemon/${randID}`,
      `https://baconipsum.com/api/?type=all-meat&sentences=${NUM_SENTENCES}`,
    ];
  }

  /* Public Methods -The API- */
  loadData() {
    return Promise.all(this.#getResources().map((res) => $.get(res)))
      .then(([{ results }, { quote }, { name, sprites }, [text]]) => {
        this.#handelRandomUserData(results);
        this.#handelQuoteData(quote);
        this.#handelPokemonData(name, sprites);
        this.#handelBaconData(text);
        // console.log(this.#data);
        // return Promise.resolve(this.#data);
      })
      .catch((error) => console.log(error.message));
  }

  get data() {
    return this.#data;
  }
}

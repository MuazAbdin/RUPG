class APIManager {
  /* Attributes */
  #data = {};

  constructor() {
    this.#data = {};
  }

  /* Private methods */
  #handelRandomUserData(users) {
    this.#data.friends = [];
    users.forEach((user, idx) => {
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

  #handelPokemonData(name, sprites, color) {
    const DEFAULT_POKEMON_IMG = "./assets/pokemon.png";
    if (!color) {
      this.#data.pokemon = {
        name,
        // picture: sprites.other["official-artwork"].front_default,
        frontFace: sprites.front_default || DEFAULT_POKEMON_IMG,
        backFace: sprites.back_default || DEFAULT_POKEMON_IMG,
      };
    } else {
      this.#data.pokemon.color = APIManager.#lightenNamedColor(color.name);
    }
  }

  #handelBaconData(text) {
    this.#data.meat = text;
  }

  #getResources() {
    const NUM_USERS = 7;
    const NUM_POKEMONS = 1000;
    const randID = Math.floor(Math.random() * NUM_POKEMONS) + 1;
    const NUM_SENTENCES = 3;
    return [
      `https://randomuser.me/api/?results=${NUM_USERS}`,
      "https://api.kanye.rest/",
      `https://pokeapi.co/api/v2/pokemon/${randID}`,
      `https://baconipsum.com/api/?type=all-meat&sentences=${NUM_SENTENCES}`,
    ].map((res) => $.get(res));
  }

  static #lightenNamedColor(name) {
    switch (name) {
      case "blue":
        return "hsl(240, 100%, 80%)";
      case "brown":
        return "hsl(0, 59%, 80%)";
      case "green":
        return "hsl(120, 100%, 80%)";
      case "pink":
        return "hsl(350, 100%, 80%)";
      case "purple":
        return "hsl(300, 100%, 80%)";
      case "red":
        return "hsl(0, 100%, 80%)";
      case "yellow":
        return "hsl(60, 100%, 80%)";
      default:
        return "hsl(0, 0%, 80%)";
    }
  }

  /* Public Methods -The API- */
  loadData() {
    return Promise.all(this.#getResources())
      .then(([{ results }, { quote }, { name, species, sprites }, [text]]) => {
        this.#handelRandomUserData(results);
        this.#handelQuoteData(quote);
        this.#handelPokemonData(name, sprites, null);
        this.#handelBaconData(text);
        return $.get(species.url);
      })
      .then(({ color }) => {
        this.#handelPokemonData(null, null, color);
      })
      .catch((error) => console.log(error.message));
  }

  get data() {
    return this.#data;
  }
}

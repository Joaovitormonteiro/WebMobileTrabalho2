export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PokemonForm = {
  name: string;
  url: string;
};

export type PokemonGameIndex = {
  game_index: number;
  version: {
    name: string;
    version: {
      name: string;
      url: string;
    }
  }
};

export type PokemonHeldItem = {
  item: {
    name: string;
    url: string;
  },
  version_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    },
    version_group: {
      name: string;
      url: string;
    },
  }[]
};

export type PokemonMove = {
  move: {
    name: string;
    url: string;
  },
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    },
    version_group: {
      name: string;
      url: string;
    },
  }[]
};

export type PokemonSpecies = {
  name: string;
  url: string;
};

export type PokemonSprite = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url:string
  }
}

export type Pokemon = {
  expanded: boolean;
  liked: boolean;
  bookmarked: boolean;
  abilities: PokemonAbility[];
  base_experience: number;
  forms: PokemonForm[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  species: PokemonSpecies;
  sprites: PokemonSprite;
  stats: PokemonStats[];
  types: PokemonType[];
  weight:number
}

<template>
  <div class="">
    <div class="q-pa-lg flex flex-center">
      <q-pagination
      v-model="currentPage"
      :max="numberOfPokemons/pokemonsPerPage"
      input
      v-if="readyToDisplay"
      />
    </div>
    <div class="q-pa-md flex flex-center">
      <div class="q-gutter-md" style="min-width: 250px">
        <q-select
        rounded
        outlined
        v-model="pokemonsPerPage"
        :options="pokemonsPerPageOptions"
        behavior="dialog"
        label="Pokemons per page"
        v-if="readyToDisplay"
        />
      </div>
    </div>
  </div>
  <div>
    <q-circular-progress
    indeterminate
    rounded
    size="50px"
    color="lime"
    class="q-ma-md"
    v-if="!readyToDisplay"
    style="flex flex-center"
    />
  </div>
  <q-page class="column items-center justify-evenly">
    <template v-for="pokemon in pokemons" v-bind:key="pokemon.name">
      <q-card
        style="background-color: white; margin: 10px; min-width: 300px;"
        v-if="readyToDisplay"
      >
        <q-card-section style="background-color: red;">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src=pokemon.sprites.front_default>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ capitalize(pokemon.name) }}</q-item-label>
              <q-item-label caption>
                {{ capitalize(pokemon.types.map((type) => type.type.name).join(', ')) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions>
          <q-btn
            flat
            round
            :color="isLiked(pokemon)"
            icon="favorite"
            @click="like(pokemon)"
          />
          <q-space />
          <q-btn
          color="grey"
          round
          flat
          dense
          :icon="pokemon.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expand(pokemon)"
          />
        </q-card-actions>
        <q-slide-transition>
          <div v-show="pokemon.expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              <template v-for="stats in pokemon.stats" v-bind:key="stats">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ capitalize(stats.stat.name) }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ stats.base_stat }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </template>
  </q-page>
</template>

<script lang="ts">
import { LocalStorage } from 'quasar';
import { Pokemon } from 'src/components/models';
import { defineComponent } from 'vue';

type PokemonCard = {
  name: string;
  url: string;
}

type FetchPokemonsResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonCard[];
}

function extracJsonFromResponse(response: Response) {
  return response.json();
}

export default defineComponent({
  name: 'IndexPage',
  components: {},
  mounted() {
    this.fetchPokemon();
    const listOfLiked: string[] = LocalStorage.getItem('liked') || [];
    this.likedPokemons = listOfLiked;
  },
  data() {
    return {
      store: this.$store,
      pokemons: [] as Pokemon[],
      numberOfPokemons: 0,
      pokemonsPerPage: 10,
      pokemonsPerPageOptions: [10, 20, 50],
      currentPage: 1,
      likedPokemons: [] as string[],
    };
  },
  methods: {
    capitalize(value: string) {
      return value[0].toUpperCase() + value.slice(1);
    },
    fetchPokemon() {
      this.pokemons = [];
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.pokemonsPerPage}&offset=${(this.currentPage - 1) * this.pokemonsPerPage}`)
        .then(extracJsonFromResponse)
        .then((res: FetchPokemonsResponse) => {
          this.numberOfPokemons = res.count;
          return res;
        })
        .then((res: FetchPokemonsResponse) => res.results)
        .then((res: PokemonCard[]) => {
          res.forEach((pokemon: PokemonCard) => {
            fetch(pokemon.url)
              .then((response) => response.json())
              .then((response: Pokemon) => {
                this.pokemons.push({
                  ...response, expanded: false,
                });
              });
          });
        });
    },
    expand(pokemon: Pokemon) {
      pokemon.expanded = !pokemon.expanded;
      this.pokemons.forEach((currentPokemon: Pokemon) => {
        if (currentPokemon.name !== pokemon.name) {
          currentPokemon.expanded = false;
        }
      });
    },
    like(pokemon: Pokemon) {
      const listOfLiked: string[] = LocalStorage.getItem('liked') || [];
      if (listOfLiked.includes(pokemon.name)) {
        listOfLiked.splice(listOfLiked.indexOf(pokemon.name), 1);
      } else {
        listOfLiked.push(pokemon.name);
      }
      LocalStorage.set('liked', listOfLiked);
      this.likedPokemons = listOfLiked;
    },
  },
  computed: {
    isLiked() {
      return (pokemon: Pokemon) => (this.likedPokemons.includes(pokemon.name) ? 'red' : 'none');
    },
    readyToDisplay() {
      return this.pokemons.length === this.pokemonsPerPage;
    },
  },
  watch: {
    pokemonsPerPage() {
      this.fetchPokemon();
    },
    currentPage() {
      this.fetchPokemon();
    },
  },
});
</script>

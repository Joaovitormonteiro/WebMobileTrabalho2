<template>
  <div>
    <q-page class="column items-center justify-evenly">
      <template v-for="pokemon in pokemons" v-bind:key="pokemon.name">
        <q-card
          style="background-color: white; margin: 10px; min-width: 300px;"
        >
          <q-card-section style="background-color: #ed1b24;">
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
          <q-slide-transition style="background-color: #ffcb05;">
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
  </div>
</template>

<script lang="ts">
import { LocalStorage } from 'quasar';
import { Pokemon } from 'src/components/models';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  mounted() {
    this.fetchPokemon();
  },
  data: () => ({
    LocalStorage,
    pokemons: [] as Pokemon[],
  }),
  methods: {
    capitalize(value: string) {
      return value[0].toUpperCase() + value.slice(1);
    },
    expand(pokemon: Pokemon) {
      pokemon.expanded = !pokemon.expanded;
      this.pokemons.forEach((currentPokemon: Pokemon) => {
        if (currentPokemon.name !== pokemon.name) {
          currentPokemon.expanded = false;
        }
      });
    },
    fetchPokemon() {
      const likedPokemons = LocalStorage.getItem('liked') as string[] || [] as string[];
      likedPokemons.forEach((pokemon: string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((response) => response.json())
          .then((response: Pokemon) => {
            this.pokemons.push({
              ...response, expanded: false,
            });
          });
      });
    },
  },
});
</script>

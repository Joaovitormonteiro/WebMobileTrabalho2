<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Pokemon
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <template v-for="item in linksList" v-bind:key="item.link">
          <q-item clickable tag="router-link">
            <q-item-section v-if="item.icon" avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <router-link
                :to="item.link"
                style="text-decoration: none; color: black;"
              >
                {{ item.title }}
              </router-link>
              <q-item-label caption>{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const linksList = [
  {
    title: 'Pokemon list',
    caption: 'List of all pokemons',
    icon: 'list',
    link: '/',
  },
  {
    title: 'Favorites',
    caption: 'List of favorite pokemons',
    icon: 'favorite',
    link: '/favorite',
  },
];

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      linksList,
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

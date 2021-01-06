<template>
  <v-card 
    max-width="10vw">
    <v-img
      src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
      height="200px"
    ></v-img>
    <v-card-title>
      {{person.firstname}} 
      <br>
      {{person.lastname}}
    </v-card-title>
    <v-card-subtitle>
      {{person.birthday}}
    </v-card-subtitle>
    
  </v-card>
</template>
<script>
export default {
  methods: {
    
  },data: () => ({
    
  }),
  props:{
    person:{}
  }
};
</script>


<!-- 

<v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          More Information about the person
        </v-card-text>
      </div>
    </v-expand-transition>


show: false
-->
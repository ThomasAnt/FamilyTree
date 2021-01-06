<template>
  <v-card
      color="blue"
      flat
      tile
    >
      <v-container justify="space-between" height="100">
        <v-toolbar dense color="orange" width="100%">
          <v-row>
            <v-col><h1>Personen: {{getNodeCount}}</h1></v-col>
            <v-col><h1>Beziehungen: {{getRelationshipCount}}</h1></v-col>
            <v-col>
              <v-btn
                icon
                color="black"
                class="ma-2"
                dark
                @click="createPersonDialog = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-btn
                icon
                color="black"
                class="ma-2"
                dark
                @click="createRelationshipDialog = true"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

            </v-col>
          </v-row>

        </v-toolbar>
      </v-container>
      <v-dialog
          v-model="createPersonDialog"
          max-width="500px"
        >
        <createPersonDialog v-on:submit="createPersonSubmit"/>
      </v-dialog>
      <v-dialog
          v-model="createRelationshipDialog"
          max-width="500px"
        >
        <createRelationshipDialog/>
      </v-dialog>
    </v-card>
</template>
<script>

import createPersonDialog from '../popUps/createPersonPopUp'
import createRelationshipDialog from '../popUps/createRealtionshipPopUp'

export default {
  components:{
    createPersonDialog,
    createRelationshipDialog
  },
  computed: {
    getNodeCount(){
      return this.$store.getters.getNodesCount;
    },
    getRelationshipCount(){
      return this.$store.getters.getRelationCount;
    },
    getNodes(){
      return this.$store.getters.getNodes
    }
  },
  mounted(){
    this.refreshData();
  },
  methods:{
    refreshData(){
      this.$store.dispatch('initData');
    },
    createPersonSubmit(){
      this.$store.dispatch('getNodes'); 
      this.createPersonDialog = false
    }
  },
  data (){
    return {
      createPersonDialog:false,
      createRelationshipDialog:false
    }
  }
}
</script>
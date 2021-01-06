<template>
  <div >
    <v-select
        class="pa-2"
        :items="getNodes"
        label="Outlined style"
        outlined
        v-model="selectedId"
        item-value="Id"
        color="black"
        v-on:change="getRelationshipsForPerson"
      >
        <template slot="selection" slot-scope="data">
          {{ data.item.lastname }} - {{ data.item.firstname }}
        </template>
        <template slot="item" slot-scope="data">
            {{ data.item.lastname }} - {{ data.item.firstname }}
        </template>
    </v-select>
    
    <div id="map">
    <div v-if="!selected.notSelected">
      <h1>Relations of</h1>
      <PersonDisplay
          :person="selected"></PersonDisplay>
    </div>
    
    <div v-if="getParents.length > 0">
      <h1>Eltern</h1>
      <v-row justify="space-around">
        <v-col
          v-for="(item,i) in getParents" :key="i"
        >
          <PersonDisplay
          :person="item.person"></PersonDisplay>
        </v-col>
      </v-row>
    </div>
    
    <div v-if="getChildren.length > 0">
      <h1>Kinder</h1>
      <v-row>
        <v-col
          v-for="(item,i) in getChildren" :key="i"
        >
          <PersonDisplay
          :person="item.person"></PersonDisplay>
        </v-col>
      </v-row>
    </div>

    <div v-if="getSiblings.length > 0">
      <h1>Geschwister</h1>
      <v-row>
        <v-col
          v-for="(item,i) in getSiblings" :key="i"
        >
          <PersonDisplay
          :person="item.person"></PersonDisplay>
        </v-col>
      </v-row>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PersonDisplay from  './PersonDisplay'
import $ from 'jquery';

export default {
  components:{
    PersonDisplay
  },
  computed: {
    getNodes(){
      return this.$store.getters.getNodes
    },
    getParents(){
      return this.outgoingRelations.filter(item => {return item.relationType=="childOf"});
    },
    getChildren(){
      return this.incommingRealtions.filter(item => {return item.relationType=="childOf"});
    },
    getSiblings(){
      return this.outgoingRelations.filter(item => {return item.relationType=="sibling"})
        .concat(this.incommingRealtions.filter(item => {return item.relationType=="sibling"}));
    }
  },
  mounted(){
    this.$nextTick(()=> {
      $("#map").draggable();
    })
  },
  data(){
    return {
      selectedId:0,
      selected:{notSelected:true},
      outgoingRelations:[],
      incommingRealtions:[]
    }
  },
  methods:{
    getRelationshipsForPerson(){
      this.selected = this.getNodes.filter((item) => {return item.Id==this.selectedId})[0]
      this.outgoingRelations = [];
      this.incommingRealtions = [];
      this.getIncommingRealtions();
      this.getOutgoingRelations();
    },
    getIncommingRealtions(){
      var statement = "MATCH (:Person {firstname: '" + this.selected.firstname + "',lastname:'" + this.selected.lastname + "'})<-[r]-(p) RETURN type(r),p"
      if(this.selected.birthday)
        statement = "MATCH (:Person {firstname: '" + this.selected.firstname + "',lastname:'" + this.selected.lastname + "',birthday:'" + this.selected.birthday + "})<-[r]-(p) RETURN type(r),p"

      axios({
        method: 'post',
        url: "http://192.168.99.100:7474/db/neo4j/tx/commit",
        auth:{
          username:'neo4j',
          password:'passme'
        },
        data:{
          "statements":[
            {"statement":statement}
          ]
        }
      }).then(data =>{
        // weird response
        this.incommingRealtions = data.data.results[0].data.map( function(r){
            return {relationType: r.row[0],person:r.row[1]}
          })
      }).catch(err =>{
        console.log(err)
      })
    },
    getOutgoingRelations(){
      var statement = "MATCH (:Person {firstname: '" + this.selected.firstname + "',lastname:'" + this.selected.lastname + "'})-[r]->(p) RETURN type(r),p"
      if(this.selected.birthday)
        statement = "MATCH (:Person {firstname: '" + this.selected.firstname + "',lastname:'" + this.selected.lastname + "',birthday:'" + this.selected.birthday + "})-[r]->(p) RETURN type(r),p"


      axios({
        method: 'post',
        url: "http://192.168.99.100:7474/db/neo4j/tx/commit",
        auth:{
          username:'neo4j',
          password:'passme'
        },
        data:{
          "statements":[
            {"statement":statement}
          ]
        }
      }).then(data =>{
        // weird response
        this.outgoingRelations = data.data.results[0].data.map( function(r){
            return {relationType: r.row[0],person:r.row[1]}
          })
      }).catch(err =>{
        console.log(err)
      })
    }
  }
}
</script>
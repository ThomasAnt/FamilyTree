<template>
  <v-card>
    <v-card-title>
      Create Relationship
    </v-card-title>
    <v-card-text>

      <v-form
        ref="form"
        v-model="valid">
        
          <v-select
            class="pa-2"
            :items="getNodes"
            label="Outlined style"
            outlined
            v-model="firstPerson"
            item-value="Id"
            color="black"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.lastname }} - {{ data.item.firstname }}
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.lastname }} - {{ data.item.firstname }}
            </template>
          </v-select>

          <v-select
            :items="relationShipTypes"
            v-model="relationShipType"
            item-value="intern"
            item-text="extern"
          />



          <v-select
            class="pa-2"
            :items="getNodes"
            label="Outlined style"
            outlined
            v-model="secondPerson"
            item-value="Id"
            color="black"
          >
            <template slot="selection" slot-scope="data">
              {{ data.item.lastname }} - {{ data.item.firstname }}
            </template>
            <template slot="item" slot-scope="data">
                {{ data.item.lastname }} - {{ data.item.firstname }}
            </template>
          </v-select>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="since"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="since"
                label="Seit ... "
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker v-model="since" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="menu = false">Cancel</v-btn>
              <v-btn text color="black" @click="$refs.menu.save(since)">OK</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn :disabled="!valid" v-on:click="submit">submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

import axios from 'axios';
export default {
  mounted(){

  },
  data() {
    return {
      valid:false,
      relationShipType:"",
      relationShipTypes:[
        {extern:"Kind von",intern:"childOf"},
        {extern:"Beziehung",intern:"couple"},
        {extern:"Verheiratet",intern:"married"},
        {extern:"Geschwister",intern:"sibling"}
      ],
      since:new Date().toISOString().substr(0, 10),
      firstPerson:{},
      secondPerson:{},
      menu:false
    }
  },
  computed: {
    getNodeCount(){
      return this.$store.getters.getNodesCount
    },
    getNodes(){
      return this.$store.getters.getNodes
    }
  },
  methods:{
    submit () {
      this.valid = this.$refs.form.validate()
      if(this.valid){
        var statement = `
        MATCH(
          p1:Person { firstname:'` + this.getNodes[this.firstPerson].firstname +`', lastname:'` + this.getNodes[this.firstPerson].lastname +`'})
        MATCH(
          p2:Person { firstname:'` + this.getNodes[this.secondPerson].firstname + `',lastname:'` + this.getNodes[this.firstPerson].lastname +`'}) 
        CREATE 
          (p1)-[:` + this.relationShipType + `]->(p2);
        `

        alert(statement)
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
          if(data.status == 200){
            
            this.$emit('submit')
          }
        }).catch(err =>{
          console.log(err)
        })
      }
    }
  }
}
</script>
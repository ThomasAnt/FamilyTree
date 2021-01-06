<template>
  <v-card>
    <v-card-title>
      Create Person
    </v-card-title>
    <v-card-text>

      <v-form
        ref="form"
        v-model="valid">
        
        <v-text-field
          :rules="firstnameRules"
          outlined
          shaped
          label="First Name"
          v-model="firstname"
          required></v-text-field>

        <v-text-field
          :rules="lastnameRules"
          outlined
          shaped
          label="Last Name"
          v-model="lastname"
          required/>

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="birthdate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="birthdate"
              label="Geburtstag"
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker v-model="birthdate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="orange" @click="menu = false">Cancel</v-btn>
            <v-btn text color="black" @click="$refs.menu.save(birthdate)">OK</v-btn>
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
    this.firstname = "";
    this.lastname = "";
    this.birthdate = "";
  },
  data() {
    return {
      valid:false,
      firstname:"",
      lastname:"",
      menu:false,
      birthdate:new Date().toISOString().substr(0, 10),
      firstnameRules: [
        v => !!v || 'Firstname is required',
      ],
      lastnameRules: [
        v => !!v || 'Lastname is required',
      ]
    }
  },
  methods:{
    submit () {
      this.valid = this.$refs.form.validate()
      if(this.valid){

        var statement = "create(Person{firstname:'" + this.firstname + "',lastname:'" + this.lastname + "'});";
        if(this.birthdate)
          statement = "create(Person{firstname:'" + this.firstname + "',lastname:'" + this.lastname + "',birthday:'" + this.birthdate + "'});";
        
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
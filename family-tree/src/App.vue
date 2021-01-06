<template>
  <v-app>
    <v-content >

      <ToolBarHeader/>
      <SelectPerson/>
      
      <PersonList v-if="false"/>
    </v-content>
  </v-app>
</template>

<script>
import PersonList from './components/PersonList';
import ToolBarHeader from './components/Header/ToolBar';
import SelectPerson from './components/SelectPerson';

export default {
  name: 'App',

  components: {
    PersonList,
    ToolBarHeader,
    SelectPerson
  },
  mounted(){
    
  },
  data: () => ({
    //
  }),
};
</script>

<template>
  <div>
    <h1>Family Tree</h1>

    <v-simple-table v-if="getNodeCount > 0">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">firstname</th>
            <th class="text-left">lastname</th>
            <th class="text-left">birthday</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in getNodes" :key="i">
            <td>{{ item.Id }}</td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.birthday }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </div>
</template>

<script>


export default {
  name: 'MainWindow',
  components:{

  },
  computed: {
    getNodeCount(){
      return this.$store.getters.getNodesCount
    },
    getNodes(){
      return this.$store.getters.getNodes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

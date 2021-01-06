import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex);
const ApiUrl = "http://192.168.99.100:7474/db/neo4j/tx/commit"

//https://scrimba.com/p/pnyzgAP/c2Be7TB

export const store = new Vuex.Store({
    state:{
      relation_count:0,
      listOfNodes:[],
      selectedNode:{}
    },
    getters:{
      getNodes: state => {
        return state.listOfNodes;
      },
      getNodesCount:(state,getters) => {
        return getters.getNodes.length;
      },
      getRelationCount: state => {
        return state.relation_count;
      },
      getSelectedNode: state => {
        return state.selectedNode;
      }
      
    },
    mutations:{
      setNodes(state,list){
        state.listOfNodes = list;
      },
      setRelationshipCount(state,count){
        state.relation_count = count;
      },
      setSelectedNode(state,node){
        state.selectedNode = node
      }
    },
    actions:{
      initData(){
        this.dispatch('getNodes');
        this.dispatch('getRelationshipCount');
      },
      getNodes({commit}){
        axios({
          method: 'post',
          url: ApiUrl,
          auth:{
            username:'neo4j',
            password:'passme'
          },
          data:{
            "statements":[
              {"statement":"match (n) return n,id(n) as Id"}
            ]
          }
        }).then(data =>{
          // weird response
          var list = data.data.results[0].data.map( function(r){
              return {firstname: r.row[0].firstname,lastname:r.row[0].lastname,Id:r.row[1],birthday:r.row[0].birthday}
            })
          commit('setNodes',list)
        }).catch(err =>{
          console.log(err)
        })
      },
      getRelationshipCount({commit}){
        axios({
          method: 'post',
          url: ApiUrl,
          auth:{
            username:'neo4j',
            password:'passme'
          },
          data:{
            "statements":[
              {"statement":"MATCH (n)-[r]->() RETURN COUNT(r)"}
            ]
          }
        }).then(data =>{
          commit('setRelationshipCount',data.data.results[0].data[0].row[0])
        }).catch(err =>{
          console.log( err)
        })
      }
    }
  })

<template>
     <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="close()">
                        <img src="../assets/logos/icons8-left-48.png" style="width:30px;" > 
                    </ion-button>
                </ion-buttons>
            <ion-title class="title_header" >{{this.data.title}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
          <div v-if="this.data.id == 1">
            <!-- Nome Modal -->
              <ion-grid style="margin-top:20px">
            <ion-row v-for="i in inputpassword" :key="i.id">
              <ion-col size="11" style="margin:5px auto 0px auto;">
                    <ion-item style="border:1px solid #1d76bb;border-radius:30px;padding:none;">
                      <ion-label position="floating">{{i.label}}</ion-label>
                      <ion-input :type="i.type" ></ion-input>
                    </ion-item>
                  <!-- <input type="password" name="" id=""> -->
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">
                <button class="conta-btn ion-activatable ripple-parent" style="color:white; background-color: #1d76bb;">
                  Guardar
                  <ion-ripple-effect></ion-ripple-effect>
                </button>
              </ion-col>
              <ion-col size="6">
                <button class="conta-btn" @click="close()" style=" color:#1d76bb;background-color: #fff; border: 1px solid #1d76bb;">
                  Cancelar
                </button>
              </ion-col>
            </ion-row>
          </ion-grid>
          </div>
          <div v-else-if="this.data.id == 2">
            <!-- Informação de Contacto Modal -->
          </div>
          <div v-else>
            <!-- Controlo de propriedade da conta -->
          </div>
        </ion-content>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {modalController} from '@ionic/vue'
export default defineComponent({
  props:['data'],
  setup(){
    return{
        inputpassword:[
          {
            id:1,
            label: 'Nome Próprio',
            type: 'text'

          },
          {
            id:2,
            label: 'Apelido',
            type: 'text'

          }
        ],
      modalController
    }
  },
  methods:{
     close() {
      this.modalController.dismiss();
    },
  }
})
</script>

<style>

</style>
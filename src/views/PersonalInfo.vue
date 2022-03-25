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
                <ion-grid style="margin-top:20px">
                    <ion-row v-for="i in info_account" :key="i.id">
                      <ion-col size="11" style="margin:5px auto 0px auto;">
                              <div class="input_account_c">
                                  <img :src="i.icon" alt="">
                                  <input :type="i.type" :id="i.id_el" :placeholder="i.label" >
                                <button class="visible_button"  @click="Enable(i.id_el)">
                                  <img :id="i.id_el+'img'" src="../assets/logos/icons8-edit-48.png" alt="">
                                </button>
                              </div>
                            
                      </ion-col>
                    </ion-row>
                    
                    <ion-row>
                      <ion-col size="6">
                        <button class="conta-btn" @click="close()" style=" color:#1d76bb;background-color: #fff; border: 1px solid #1d76bb;">
                          Cancelar
                        </button>
                      </ion-col>
                      <ion-col size="6">
                        <button class="conta-btn ion-activatable ripple-parent" style="color:white; background-color: #1d76bb;">
                          Confirmar
                          <ion-ripple-effect></ion-ripple-effect>
                        </button>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
          </div>
          <div v-else>
            <!-- Controlo de propriedade da conta -->
            <ion-list style="margin-top:20px;">
                <ion-radio-group value="Account_state">
                <ion-item>
                    <div class="title_donation" >Desativar conta </div>
                    <ion-radio slot="end" value="disable" color="warning"></ion-radio>
                </ion-item>

                <ion-item>
                    <div class="title_donation" >Eliminar Conta </div>
                    <ion-radio slot="end" value="delete" style="color:#1d76bb;" color="warning"></ion-radio>
                </ion-item>
                </ion-radio-group>
            </ion-list>
            <ion-grid>
              <ion-row>
                <ion-col size="12">
                  <button class="conta-btn ion-activatable ripple-parent" style="color:white; margin:10px auto; width:90% !important;  max-width:none; background-color: #1d76bb;">
                    Continuar a desativação da conta
                    <ion-ripple-effect></ion-ripple-effect>
                  </button>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12">
                  <button class="conta-btn" @click="close()" style=" color:#1d76bb;margin:0px auto; width:90%!important; max-width:none; background-color: #fff; border: 1px solid #1d76bb;">
                    Cancelar
                  </button>
                </ion-col>
              </ion-row>
              
          </ion-grid>
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
        info_account:[
          {
            id:1,
            label:"E-mail",
            icon:require("@/assets/logos/icons8-envelope-50.png"),
            type:"email"
          },
          {
            id:2,
            label:"Telemóvel",
            icon:require("@/assets/logos/icons8-phone-48.png"),
            type:"number"
          }
        ],
      modalController
    }
  },
  methods:{
     close() {
      this.modalController.dismiss();
    },
    Enable(element:string)
    {
      let n= document.getElementById(element) as HTMLFormElement
      console.log(n,element)
        if(n.disabled)
        {
          n.disabled=false
        }
        else
        {
          n.disabled=true
        }
    }
  }
})
</script>

<style>

</style>
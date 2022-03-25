<template>
            <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="close()">
                        <img src="../assets/logos/icons8-left-48.png" style="width:30px;" > 
                    </ion-button>
                </ion-buttons>
            <ion-title class="title_header" >{{this.data.nome}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
        <ion-list v-if="this.data.id == 1">
            <!-- Informações Pessoais Modal -->
            <ion-item style="padding-left:none;" class="ion-activatable ripple-parent" v-for="item in info" :key="item.id" @click="OpenPersonalInfo(item)">
               
                <div class="title_card_project" style="padding:15px;">
                    {{item.title}}  
                    <br>
                    <ion-note style="color:#bbb;">
                      {{item.note}}
                    </ion-note>
                </div>
                <img src="../assets/logos/icons8-back-60.png" style="width:20px;transform: scaleX(-1);" slot="end" alt="">
                <ion-ripple-effect></ion-ripple-effect>
            </ion-item>
        </ion-list>
        <div v-else>
          <!-- Alterar Palavra-passe modal -->
          <ion-grid style="margin-top:20px">
            <ion-row v-for="i in inputpassword" :key="i.id">
              <ion-col size="11" style="margin:5px auto 0px auto;">
                    <ion-item style="border:1px solid #1d76bb;border-radius:10px;padding:none;">
                      <ion-label position="floating">{{i.label}}</ion-label>
                      <ion-input :type="i.type" :id="i.id_el"></ion-input>
                        <button class="visible_button" v-if="i.type == 'password'" @click="Visibility(i.id_el)">
                          <img :id="i.id_el+'img'" src="../assets/logos/icons8-invisível-48.png" alt="">
                        </button>
                    </ion-item>
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
        </ion-content>
</template>
<script lang="ts">
import {defineComponent} from "vue"
import PersonalInfo from "./PersonalInfo.vue"
import {modalController} from "@ionic/vue"
export default  defineComponent({
  props:['data'],
  setup(){
    return{
      info:[
        {
          id:1,
          title:"Nome",
          note:"Nome do utilizador",
        },
        {
          id:2,
          title:"Informação de contacto",
          note:"Gere os teus números de telémovel e e-mails",
        },
        {
          id:3,
          title:"Controlo e propriedade da conta",
          note:"Desativa ou elimnina a tua conta",
        }
      ],
      inputpassword:[
        {
          id:1,
          type:"email",
          id_el:"email",
          label:"Endereço de E-mail"
        },
        {
          id:2,
          type:"password",
          id_el:"password",
          label:"Password"
        },
        {
          id:3,
          type:"password",
          id_el:"Cpassword",
          label:"Confirmar Password"
        }
      ],
      modalController,
      PersonalInfo
    }
  },
  methods:{
    close() {
      this.modalController.dismiss();
    },
    async OpenPersonalInfo(id:object){
          const modal= await this.modalController.create({
                        component: PersonalInfo,
                        animated:true,
                        backdropBreakpoint:0,
                        backdropDismiss:true,
                        breakpoints:undefined,
                        componentProps: {
                            data: id
                            }
                          });
            modal.present();
    },
    Visibility(element:string)
    {
      let el= document.getElementById(element) as HTMLFormElement;
      let img= document.getElementById(element+"img") as HTMLFormElement;
      console.log(el);
      if (el.type === "password") {
          el.type = "text";
          img.src=require("@/assets/logos/icons8-visível-48.png");
        } else {
          el.type = "password";
          img.src=require("@/assets/logos/icons8-invisível-48.png");
        }
    }
  }
})
</script>

<style>

</style>
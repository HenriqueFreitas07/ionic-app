<template>

          <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="close()">
                        <img src="../assets/logos/icons8-left-48.png" style="width:30px;" > 
                    </ion-button>
                </ion-buttons>
            <ion-title class="title_header" v-if="!this.data.page">Efetuar Doação</ion-title>
            <ion-title class="title_header" v-else>{{this.data.title}}</ion-title>
            </ion-toolbar>
        </ion-header>
 <!--    <div v-if="this.data.page !==undefined">
        <ion-content>
            <div :v-if="this.data.page =='account'">

            </div>
            <div></div>
            <div></div>
            <div></div>
        </ion-content>
    </div> -->
    <ion-content v-if="!this.data.page" class="ion-padding">
        <!-- Donation Page -->
        <ion-grid>
            <ion-row>
                <ion-col size="5">
                    <div id="progress_circle"></div>
                </ion-col>
                <ion-col size="7">
                    <button class="donation_button ion-activatable ripple-parent">Efetuar Doação
                        <ion-ripple-effect></ion-ripple-effect>
                    </button>
                </ion-col>
            </ion-row>
            <ion-row>
                    <ion-col>
                        <span class="title_donation">
                        {{this.data.title}}
                        </span>
                    </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="4">
                    <div class="money_tab">
                        <img src="../assets/logos/icons8-target-48.png"  > 
                        <div>
                            Objectivo
                        </div>   
                        <br>
                        {{this.data.objectivo}}€
                    </div>
                </ion-col>
                <ion-col size="4">
                    <div class="money_tab">
                        <img src="../assets/logos/icons8-euro-64.png"  > 
                        <div>
                            Angariado
                        </div>   
                        <br>
                        {{this.data.angariado}}€
                    </div>
                </ion-col>
                <ion-col size="4">
                    <div class="money_tab">
                        <img src="../assets/logos/icons8-location-50.png"  > 
                        <div>
                            Localização
                        </div>   
                        <br>
                        {{this.data.location}}
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <div class="section_donation">
                        <div class="title_sections_donations">Causa</div>
                        <br>
                        {{this.data.title}}
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <div class="section_donation">
                        <div  class="title_sections_donations">História</div>
                        <br>
                        {{this.data.story}}
                    </div>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <div  class="title_sections_donations">Imagens</div>
                    <br>
                    <img :src="this.data.img" alt="">
                </ion-col>
            </ion-row>

        </ion-grid>
    </ion-content>
    <ion-content v-else>
        <div v-if="this.data.page == 'account'">
            <!-- Account Modal -->
              <div class="title_timeline" >
                <span>Conta</span><br> 
                <ion-note>Atualize as suas informações para manter a conta segura.</ion-note>
              </div>
              <ion-item  @click="OpenConfigAccount({nome:'Informações Pessoais',id:1})" class=" ion-activatable ripple-parent">
                  <img src="../assets/logos/icons8-user-32.png" style="width:24px;" alt="">
                  <div class="title_donation" style="margin-left:15px;">Informações pessoais e da conta</div>
                  <ion-ripple-effect></ion-ripple-effect>
              </ion-item>
              <ion-item @click="OpenConfigAccount({nome:'Alterar Palavra-passe',id:2})" class="ion-activatable ripple-parent">
                  <img src="../assets/logos/icons8-senha-1-48.png" style="width:24px;" alt="">
                  <div class="title_donation" style="margin-left:15px;" >Alterar palavra-passe</div>
                  <ion-ripple-effect></ion-ripple-effect>
              </ion-item>
        </div>
        <div v-else-if="this.data.page == 'feed_def'">
            <!-- Feed Def Modal -->
            <ion-radio-group value="feed_def">
                <ion-grid>
                    <ion-row>
                        <ion-col size="2">
                            <img src="../assets/logos/icons8-home-48.png" style="position:relative ;width:50%;top:50%;left:50%;transform:translate(-50%,-50%);" alt="">
                        </ion-col>
                        <ion-col size="7">
                            <div class="notifications">
                                <div >
                                        Página Inicial
                                </div>
                                    <ion-note>
                                        Mostrar publicações mais relevantes primeiro.
                                    </ion-note>
                            </div>
                        </ion-col>
                        <ion-col size="3">
                            <ion-radio color="warning" value="fav_page" class="toggles_not" ></ion-radio>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="2">
                            <img src="../assets/logos/icons8-estrela-48.png" style="position:relative ;width:50%;top:50%;left:50%;transform:translate(-50%,-50%);" alt="">
                        </ion-col>
                        <ion-col size="7">
                            <div class="notifications">
                                <div >
                                    Favoritos                                
                                </div>
                                    <ion-note>
                                        Mostrar apenas publicações dos favoritos.
                                    </ion-note>
                            </div>
                        </ion-col>
                        <ion-col size="3">
                            <ion-radio color="warning" value="recents_page" class="toggles_not" ></ion-radio>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="2">
                            <img src="../assets/logos/icons8-relógio-48.png" style="position:relative ;width:50%;top:50%;left:50%;transform:translate(-50%,-50%);" alt="">
                        </ion-col>
                        <ion-col size="7">
                            <div class="notifications">
                                <div >
                                    Recentes                                
                                </div>
                                    <ion-note>
                                        Mostrar novas publicações primeiro.
                                    </ion-note>
                            </div>
                        </ion-col>
                        <ion-col size="3">
                            <ion-radio color="warning" value="primary_page" class="toggles_not" ></ion-radio>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-radio-group>
        </div>
        <div v-else-if="this.data.page == 'privacy'">
            <!-- Privacidade modal -->
                <ion-grid>
                    <ion-row>
                        <ion-col size="9">
                        <div class="notifications">
                            <div>Aceitar Cookies</div>
                        </div>
                        </ion-col>
                        <ion-col size="3">
                            <ion-toggle color="primary"  class="toggles_not"></ion-toggle> 
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="9">
                            <div class="notifications">
                                <div >
                                    Guardar info ínicio de sessão 
                                </div>
                                    <ion-note>
                                        Guardar o nome de utilizador e palavra-passe
                                    </ion-note>
                            </div>
                        </ion-col>
                        <ion-col size="3">
                            <ion-toggle color="primary" class="toggles_not"></ion-toggle>
                        </ion-col>
                    </ion-row>
                </ion-grid>
        </div>
        <div v-else>
            <!-- Idioma Modal -->
              <ion-list style="margin-top:20px;">
                <ion-radio-group value="idioma">
                <ion-item>
                    <div class="title_donation" >Português</div>
                    <ion-radio slot="end" value="Pt-pt" color="warning"></ion-radio>
                </ion-item>

                <ion-item>
                    <div class="title_donation" >English</div>
                    <ion-radio slot="end" value="En-en" style="color:#1d76bb;" color="warning"></ion-radio>
                </ion-item>
                </ion-radio-group>
            </ion-list>
        </div>
    </ion-content>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {IonHeader,IonRippleEffect,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,modalController,IonGrid, IonRow, IonCol,IonRadioGroup,IonRadio} from '@ionic/vue'
import ProgressBar from "progressbar.js";
import ConfigAccount from "./ConfigAccount.vue";

export default defineComponent({
    name:"SubPage",
    components:{
    IonHeader,IonToolbar,IonButtons,IonContent,IonTitle,IonButton,IonGrid, IonRow, IonCol,IonRippleEffect,IonRadioGroup,IonRadio
    },   
    setup()
    {
        return{
            modalController,
            ConfigAccount
        }
    },
    props:['data'],
    mounted()
    {
            if(this.data.page == undefined)
            { 
                 var bar:any = new ProgressBar.Circle("#progress_circle", {
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 3,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 3,
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
             step: function(state, circle:any) {
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                circle.setText('');
                } else {
                circle.setText(value+'%');
                }

            }
            
            });
            let percentage=this.data.angariado/this.data.objectivo
            console.log(percentage)
            bar.text.style.fontFamily = '"Permanent Marker", cursive';
            bar.text.style.fontSize = '1.1rem';
            bar.text.style.color = '#1d76bb';
            bar.animate(percentage);  // Number from 0.0 to 1.0
            }
    },
    methods:{
        close()
        {
            this.modalController.dismiss();
        },
        async OpenConfigAccount(item:number)
        {
            const modal= await this.modalController.create({
              component: ConfigAccount,
              animated:true,
              backdropBreakpoint:0,
              backdropDismiss:true,
              breakpoints:undefined,
              componentProps: {
                  data: item
                  }
                });
             modal.present();
        }
    }
})

</script>

<style>

</style>
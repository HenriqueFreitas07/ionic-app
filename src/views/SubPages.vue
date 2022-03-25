<template>

          <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="close()">
                        <img src="../assets/logos/icons8-left-48.png" style="width:30px;" > 
                    </ion-button>
                </ion-buttons>
            <ion-title class="title_header ">{{this.data.title}}</ion-title>
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
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {IonHeader,IonRippleEffect,IonToolbar,IonTitle,IonButtons,IonButton,IonContent,modalController,IonGrid, IonRow, IonCol,} from '@ionic/vue'
import ProgressBar from "progressbar.js";

export default defineComponent({
    name:"SubPage",
    components:{
    IonHeader,IonToolbar,IonButtons,IonContent,IonTitle,IonButton,IonGrid, IonRow, IonCol,IonRippleEffect
    },   
    setup()
    {
        return{
            modalController
        }
    },
    props:['data'],
    mounted()
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

    },
    methods:{
        close()
        {
            this.modalController.dismiss();
        }
    }
})

</script>

<style>

</style>
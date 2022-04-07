
<template>
    <div v-if="this.$route.params.id == 'Conta' ">
        <!-- Conta Modal -->
        <ion-grid>
            <ion-row>
                <ion-col size="12"> 
                    <ion-avatar style="width:100px;height:100px; margin:40px auto;">
                        <img src="https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png">
                    </ion-avatar>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <input type="text" :value="user.username" class="conta_input" placeholder="Nome" >
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <input type="text" :value="user.email" class="conta_input" placeholder="E-mail">
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <input type="password" class="conta_input" placeholder="" value="*******">
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <input type="Telemóvel" :value="user.telemovel" class="conta_input" placeholder="Telemóvel">
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button class="conta-btn" style=" color:#1d76bb;background-color: #fff; border: 1px solid #1d76bb;" >
                        Cancelar
                    </button>
                </ion-col>
                <ion-col>
                    <button class="conta-btn ion-activatable ripple-parent" style="color:white; background-color: #1d76bb;">
                        Guardar
                        <ion-ripple-effect></ion-ripple-effect>
                    </button>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
    <div v-else-if="this.$route.params.id == 'Notificações'">
        <!-- Notificaões Modal -->
        <ion-grid>
            <ion-row>
                <ion-col size="9">
                    <div class="notifications">
                        <div >
                                Permitir Notificações
                        </div>
                            <ion-note>
                                Recebe notificações desta aplicação incluindo mensagens de notificação.
                            </ion-note>
                    </div>
                </ion-col>
                <ion-col size="3">
                    <ion-toggle color="primary" class="toggles_not"></ion-toggle>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="9">
                  <div class="notifications">
                      <div>Som</div>
                  </div>
                </ion-col>
                <ion-col size="3">
                       <ion-toggle color="primary"  class="toggles_not"></ion-toggle> 
                </ion-col>
            </ion-row>
            <ion-row> 
                <ion-col size="9">
                        <div class="notifications">
                            <div>Vibração</div>
                        </div>
                </ion-col>
                <ion-col size="3">
                    <ion-toggle color="primary" class="toggles_not"></ion-toggle>
                </ion-col>
            </ion-row>
        </ion-grid>
    </div>
    <div v-else>
        <ion-list>
            <ion-item v-for="item in conf" :key="item.id" @click="OpenItemConfig(item)">
                <img :src="item.icon" style="width:26px" alt="">
                <div class="title_card_project" style="margin:0px 0px 0px 20px;">
                    {{item.title}}
                </div>
                <img src="../assets/logos/icons8-back-60.png" style="width:30px;transform: scaleX(-1);" slot="end" alt="">
            </ion-item>
        </ion-list>
    </div>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue'
import {IonGrid,IonCol,IonRow,IonPage,IonToggle,modalController} from '@ionic/vue' 
import SubPage from './SubPages.vue'
import {useStore} from 'vuex'

export default defineComponent({
    name:"ConfigPage",
    props:['page'],
    component:{
        IonGrid,IonCol,IonRow,IonPage,IonToggle,
    },
    setup(){
        const store=useStore();
        return{
            conf:[
                {
                    id:1,
                    page:"account",
                    title:"Configurações da Conta",
                    icon:require('@/assets/logos/icons8-user-32.png')
                },
                {
                    id:2,
                    page:"feed_def",
                    title:"Preferências do Feed de Notícias",
                    icon:require('@/assets/logos/icons8-home-48.png')
                },
                {
                    id:3,
                    page:"privacy",
                    title:"Privacidade",
                    icon:require('@/assets/logos/icons8-security-shield-green-50.png')
                },
                {
                    id:4,
                    page:"lang",
                    title:"Idioma",
                    icon:require('@/assets/logos/icons8-geography-50.png')
                }
            ],
            modalController,
            store,
        }
    },
    methods:{
        async OpenItemConfig(item:object)
        {
                const modal= await this.modalController.create({
                component: SubPage,
                animated:true,
                backdropBreakpoint:0,
                backdropDismiss:true,
                breakpoints:undefined,
                componentProps: {
                    data: item
                    }
                    });
                modal.present();
        },
    },
    mouted(){
            var user:any = window.localStorage.getItem('user')
            this.store.state.user=JSON.parse(user)
            console.log(this.store.state.user)
    },
    computed:{
        user(){
            return this.store.state.user
        }
    }
})
</script>

<style>

</style>
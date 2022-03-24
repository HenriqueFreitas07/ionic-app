<template>
  <ion-page>
  <div style="background-color:#d1e3f6;width:100%;
    height:100%; position:relative; ">
      <div class="img_main">
        <img src="../assets/logotipo_bighand.png">
      </div>
      <form class=" ion-text-center form_login">
        <input v-if="register_show" type="text"  placeholder="Username" v-model="username" class="input_b">
        <br v-if="register_show">
        <input type="email"  placeholder="Email" v-model="email" class="input_b">
        <br>
        <input type="password" required placeholder="Password" v-model="pwd" class="input_b">
        <br>
        <a href="/page/Feed" v-if="!register_show" >Forgot password?</a>
        <br v-if="!register_show">
        <button @click="submitform()" v-if="!register_show" class="btn_submit">Login</button>
        <button @click="register()" v-if="register_show" class="btn_submit">Register</button>
        <br>
        <a href.prevent="" @click="change()" > <span v-if="!register_show" >Don't have an account? Create</span> <span v-else>Already have an account? Login</span> </a>
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
//import { IonLabel, IonItem, IonInput,IonCard} from '@ionic/vue';
import {defineComponent} from 'vue'
import { alertController} from '@ionic/vue';
import axios from 'axios';

export default defineComponent ({
  name: 'HomePage',
   data() 
  {
    return{
        register_show:false,
        username:"",
        email:"",
        pwd:"",
    }
  },
  methods: 
  {
    change()
    {
      this.register_show = !this.register_show;
      console.log(this.register_show)
    },
     async submitform()
    {
       if(this.email !== ""|| this.pwd !== "")
      {
      await axios.post('http://192.168.1.199/laravel/public/api/login', {
        email: this.email,
        password: this.pwd
      },{
        withCredentials:true,
          headers:
          { 
            Accept: 'application/json','Content-Type': 'application/json',
          }
        })
      .then(function (response) {
        console.log(response.data)
        if(response.data.message)
        {
          alert("Seja bem-vindo:"+response.data.user.name)
          window.location.href="/todos"
        }
        
      })
      .catch(function (error) {
           if(error.response.status==401||error.response.status==422)
          {
            //error
          }   
      });
      }
      else
      {
        const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          message: 'All the fields are required!',
          buttons: ['OK'],
        });
        await alert.present();
      }
    },
     async register()
    {
      if(this.email !== ""||this.username !== ""||this.pwd !== "")
      {
        await axios.post('http://192.168.1.199/laravel/public/api/register', {
        email: this.email,
        username: this.username,
        password: this.pwd
      },{headers:
          { 
            Accept: 'application/json','Content-Type': 'application/json',
          },withCredentials:true
        })
      .then(function (response) {
        alert(response.data.message)
        window.location.href="/login";
      })
      .catch(function (error) {
        console.log(error)
          if(error.response.status==401)
          {
            alert("E-mail em uso!");
          }   
        });
      }
      else
      {
        const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          message: 'All the fields are required!',
          buttons: ['OK'],
        });
      await alert.present();
      }
      
    }
  }
})
</script>
<style scoped>
</style>
<template>
  <ion-page>
    <div
      style="
        background-color: #d1e3f6;
        width: 100%;
        height: 100%;
        position: relative;
      "
    >
      <div class="img_main">
        <img src="../assets/logotipo_bighand.png" />
      </div>
      <form class="ion-text-center form_login">
        <input
          v-if="register_show"
          type="text"
          placeholder="Username"
          v-model="username"
          class="input_b"
        />
        <br v-if="register_show" />
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="input_b"
        />
        <br />
        <input
          type="password"
          required
          placeholder="Password"
          v-model="pwd"
          class="input_b"
        />
        <br />
        <a href="/page/Feed" v-if="!register_show">Forgot password?</a>
        <br v-if="!register_show" />
        <button
          @click="login()"
          type="button"
          v-if="!register_show"
          class="btn_submit"
        >
          Login
        </button>
        <button @click="register()" type="button" v-else class="btn_submit">
          Register
        </button>
        <br />
        <a href.prevent="" @click="change()">
          <span v-if="!register_show">Don't have an account? Create</span>
          <span v-else>Already have an account? Login</span>
        </a>
      </form>
    </div>
  </ion-page>
</template>

<script lang="ts">
//import { IonLabel, IonItem, IonInput,IonCard} from '@ionic/vue';
import { defineComponent, computed } from "vue";
import { alertController } from "@ionic/vue";
import axios from "axios";
import "@capacitor-community/http";
import { Http, HttpResponse } from "@capacitor-community/http";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomePage",
  data() {
    const { cookies } = useCookies();
    const store = useStore();
    let register_show = false;
    return {
      register_show,
      username: "",
      email: "",
      pwd: "",
      cookies,
      store,
    };
  },
  methods: {
    change() {
      this.register_show = !this.register_show;
      console.log(this.register_show);
    },
    async login() {
      if (this.email !== "" && this.pwd !== "") {
        /*    await axios.post('http://192.168.0.85:8080/api/login', {
        email: this.email,
        password: this.pwd
      },{withCredentials:true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }})
      .then(async function (response) {

            const alert = await alertController
              .create({
                cssClass: 'my-custom-class',
                header: 'Alert',
                message: 'Login bem sucessido!',
                buttons: ['OK'],
              });
              console.log(response)
            await alert.present();
            
            //window.location.href="/page/Feed";
      })
      .catch(async function (error) {
           if(error.response.status==401||error.response.status==422)
          {
            const alert = await alertController
              .create({
                cssClass: 'my-custom-class',
                header: 'Alert',
                message: 'Credenciais incorretos',
                buttons: ['OK'],
              });
            await alert.present();
          }   
      }); */
        let res = await this.store.dispatch("loggin", {
          email: this.email,
          password: this.pwd,
        });

        if (res.status == 200) {
          let t = res.data.access_token.plainTextToken;
          this.cookies.set("BH", t);
          this.store.commit("setUser", { user: res.data.user });
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: "Alert",
            message: "Login bem sucessido!",
            buttons: [
              {
                text: "Okay",
                id: "confirm-button",
                handler: () => {
                  //window.location.href = "/page/Feed";
                  console.log(localStorage.getItem('user'))
                },
              },
            ],
          });
          await alert.present();
        } else {
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: "Alert",
            message: "Credenciais incorretos/Conta inexistente",
            buttons: ["OK"],
          });
          await alert.present();
        }
      } else {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Erro!",
          message: "Preencha os campos obrigatórios!",
          buttons: ["OK"],
        });
        await alert.present();
      }
    },
    async register() {
      if (this.email !== "" || this.username !== "" || this.pwd !== "") {
        await axios
          .post(
            "http://192.168.0.85:8080/api/register",
            {
              email: this.email,
              username: this.username,
              password: this.pwd,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: " application/json",
              },
            }
          )

          .then(async (response) => {
            console.log(response);
            const alert = await alertController.create({
              cssClass: "my-custom-class",
              header: "Sucesso!",
              message: "Conta criada com sucesso!!!",
              buttons: [
                {
                  text: "Okay",
                  id: "confirm-button",
                  handler: () => {
                    this.change();
                  },
                },
              ],
            });
            return alert.present();
          })
          .catch(async function (error) {
            console.log(error);
            if (error.response.status == 401) {
              const alert = await alertController.create({
                cssClass: "my-custom-class",
                header: "Alert",
                message: "E-mail já em uso!",
                buttons: ["OK"],
              });
              await alert.present();
            }
          });
      } else {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Alert",
          message: "Preencha os campos obrigatórios!",
          buttons: ["OK"],
        });
        await alert.present();
      }
    },
  },
  beforeMount() {
    if (this.cookies.get("BH")) {
      window.location.href = "page/Feed";
    }
    else
    {
      console.log(this.store.getters.getUser)
    }
  },
});
</script>

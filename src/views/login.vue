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
import { defineComponent } from "vue";
import { alertController } from "@ionic/vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomePage",
  data() {
    const store = useStore();
    const router = useRouter();
    let register_show = false;
    return {
      register_show,
      username: "",
      email: "",
      pwd: "",
      store,
      router,
      url_base:"http://192.168.0.86:8080",
    };
  },
  methods: {
    change() {
      this.register_show = !this.register_show;
    },
    async login() {
      if (this.email !== "" && this.pwd !== "") {
        const r = await this.store.dispatch("loggin", {
          email: this.email,
          password: this.pwd,
        });
        if (r.status == 201 || r.status ==200) {
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: "Alert!",
            message: r.data.message,
            buttons: [
              {
                text: "Okay",
                id: "confirm-button",
                handler: () => {
                  this.router.push("/page/Feed");
                },
              },
            ],
          });
          return alert.present();
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
        const r = await this.store.dispatch("register", {
          email: this.email,
          username: this.username,
          password: this.pwd,
        });
        if (r.status == 201 || r.status ==200) {
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: "Alert!",
            message: r.data.message,
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
        } else {
          const alert = await alertController.create({
            cssClass: "my-custom-class",
            header: "Alert",
            message: "E-mail já em uso!",
            buttons: ["OK"],
          });
          await alert.present();
        }
      
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
});
</script>

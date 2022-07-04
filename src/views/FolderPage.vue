<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar style="background-color:blue;">
        <ion-buttons slot="start">
          <ion-menu-button style="color: white"></ion-menu-button>
        </ion-buttons>
        <ion-title class="title_header">{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="Refresher($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div v-if="this.$route.path === '/page/Feed'">
        <ion-card
          v-for="item of feed"
          :key="item.id"
        >
          <img :src="item.feature_image" alt="" />
          <ion-card-header>
            <ion-card-title class="card_title_feed">{{
              item.title
            }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ item.description }}
          </ion-card-content>
        </ion-card>
      </div>

      <div v-else-if="this.$route.path === '/page/Projectos'">
        <ion-card v-for="item of projects" :key="item.id" style="display: flex">
          <div class="img_projects">
            <img class="" :src="this.urlProjects + item.feature_image" />
          </div>
          <div style="width: 65%" class="text_projects">
            <ion-card-header id="header_card_projects">
              <ion-card-title class="title_card_project">{{
                item.title
              }}</ion-card-title>
            </ion-card-header>
            <ion-card-content class="ion-card-content-box">
              <span class="content_card_projects"
                >Objectivo: <span>{{ " " + item.goal }}€ </span>
              </span>
              <br />
              <span class="content_card_projects"
                >Angariado: <span>{{ " " + item.raised }}€</span></span
              >
              <button class="button_card_projects" @click="setOpen(item)">
                Efetuar Doação
              </button>
            </ion-card-content>
          </div>
        </ion-card>
      </div>

      <div v-else-if="this.$route.path === '/page/Timeline'">
        <!-- Timeline -->
        <div class="title_timeline">
          <span>Próximos Desafios</span><br />
          <ion-note>Ajude-nos a atingir os objectivos!</ion-note>
        </div>
        <div class="card_timeline" v-for="def in timeline" :key="def.id">
          <div id="circle"></div>
          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <span class="card_title_timeline">{{ def.title }}</span>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="3">
                <div>
                  <ion-avatar>
                    <img :src="def.feature_image" />
                  </ion-avatar>
                </div>
              </ion-col>
              <ion-col size="9">
                <div id="desc">
                  {{ def.description }}
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </div>
      <div v-else>
        <config-page :page="this.$route.params.id"></config-page>
      </div>
    </ion-content>
    <ion-tabs
      id="tabs_bar"
      v-if="
        this.$route.params.id !== 'Conta' &&
        this.$route.params.id !== 'Notificações' &&
        this.$route.params.id !== 'Definições'
      "
      @ionTabsWillChange="beforeTabChange"
      @ionTabsDidChange="afterTabChange"
    >
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="feed" @click="() => router.push('/page/Feed')">
          <img src="../assets/logos/icons8-home-48.png" class="icons_tab" />
        </ion-tab-button>
        <ion-tab-button
          tab="projectos"
          @click="() => router.push('/page/Projectos')"
        >
          <img src="../assets/logos/icons8-hand-love.png" class="icons_tab" />
        </ion-tab-button>

        <ion-tab-button
          tab="timeline"
          @click="() => router.push('/page/Timeline')"
        >
          <img src="../assets/logos/icons8-timeline-24.png" class="icons_tab" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonAvatar,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  modalController,
} from "@ionic/vue";
import ConfigPage from "./ConfigPage.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { defineComponent, ref } from "vue";
import SubPage from "./SubPages.vue";

export default defineComponent({
  name: "FolderPage",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonAvatar,
    IonMenuButton,
    IonTabBar,
    IonTabButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    ConfigPage,
  },
  setup() {
    const router = useRouter();

    return {
      urlFeed: "https://www.thebighand.org/wp-content/uploads/2019/05/",
      urlProjects: "https://www.thebighand.org/wp-content/uploads/2020/05/",
      feed: ref([]),
      projects: ref([]),
      timeline: ref([]),
      url: "http://127.0.0.1:8000/api/",
      //url:"http://192.168.1.64:8000/api/",
      router,
      modalController,
    };
  },
  methods: {
    async setOpen(item: object) {
      const modal = await this.modalController.create({
        component: SubPage,
        animated: true,
        backdropBreakpoint: 0,
        backdropDismiss: true,
        breakpoints: undefined,
        componentProps: {
          data: item,
        },
      });
      modal.present();
    },
    async logout() {
      await axios
        .post(
          this.url + "/logout",
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        )
        .then(function () {
          alert("Logged out");
          window.location.href = "/";
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            window.location.href = "/";
          }
        });
    },
    /*  News: async function () {

    }, */
    async News() {
      const newei = await axios.get(this.url + "news/app", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+ localStorage.getItem("token")
        },
      });
      this.feed = [];
      newei.data.forEach((element: never) => {
        this.feed.push(element);
      });
      this.$store.commit("setFeed",{data:this.feed})
      return true;
    },
    async Timeline() {
      const t = await axios.get(this.url + "timeline/app", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+ localStorage.getItem("token")

        },
      });
      this.timeline = [];
      t.data.forEach((element: never) => {
        this.timeline.push(element);
      });
      this.$store.commit("setTimeline",{data:this.timeline})
      return true;
    },
    async Projects() {
      const project = await axios.get(this.url + "projects/app", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer "+ localStorage.getItem("token")
        },
      });
      this.projects=[]
      project.data.forEach((element: never) => {
        this.projects.push(element);
      });
      this.$store.commit("setProjects",{data:this.projects})                                              
      return true
    },

    async Refresher(event: any) {
      let endpoint = this.$route.params.id;
      if (endpoint == "Feed") {
        const r = await this.News();
        if (r) {
          event.target.complete();
        }
      } else if (endpoint == "Projectos") {
        const p = await this.Projects();
        if (p) {
          event.target.complete();
        }
      } else if (endpoint == "Timeline") {
        const t = await this.Timeline();
        if (t) {
          event.target.complete();
        }
      }
    },
  },
  mounted() {
    this.News();
    this.Projects();
    this.Timeline();
  },
  watch: {
    $route() {
      let endpoint = this.$route.params.id;
      if (endpoint == "Feed") {
        if(this.$store.getters.getFeed == [])
        {
          this.News();
        }
      } else if (endpoint == "Projectos") {
        if(this.$store.getters.getProjects == [])
        {
          this.Projects();
        }
      }
      else if (endpoint == "Timeline")
      {
       if(this.$store.getters.getTimeline == [])
        {
          this.Timeline();
        }
      }
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

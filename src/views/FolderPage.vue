<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar style="color: white">
        <ion-buttons slot="start">
          <ion-menu-button style="color: white"></ion-menu-button>
        </ion-buttons>
        <ion-title class="title_header">{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-if="this.$route.path === '/page/Feed'">
        <ion-card
          @click="redirect_card(item.id)"
          v-for="item of feed"
          :key="item.id"
        >
          <img :src="this.urlFeed + item.feature_image" alt="" />
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
                    <img :src="def.img" />
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
import {defineComponent,ref } from "vue";
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
      feed: ref([
        /* {
          id: 4,
          title: "DISTRIBUIÇÃO DE CASACOS PARA O TEMPO FRIO",
          img: "https://www.thebighand.org/wp-content/uploads/2019/05/noticias_thebighand_59-1120x550.jpg",
          desc: "O Inverno está a chegar às aldeias onde actuamos e para apoiar as crianças em risco distribuimos casacos quentinhos.",
        },
        {
          id: 5,
          title: "DIA DA CRIANÇA",
          img: "https://www.thebighand.org/wp-content/uploads/2019/05/noticias_thebighand_64-1120x550.jpg",
          desc: "O Dia da criança é todos os dias mas existe um que é especial e este ano conseguimos realizar uma festa inesquecível nas Aldeias onde actuamos. Com ajuda de geradores foi possível montar os insufláveis.",
        },
        {
          id: 6,
          title: "DISTRIBUIÇÃO DE MATERIAL ESCOLAR E DE HIGIENE",
          img: "https://www.thebighand.org/wp-content/uploads/2019/05/noticias_thebighand_70-1120x550.jpg",
          desc: "Com o apoio dos Padrinhos, Madrinhas e Amigos Big Hand continuamos a distribuir às crianças em risco os kits de material escolar e de higiene que são fundamentais para que a crianças se sinta motivada a continuar a estudar.",
        }, */
      ]),
      projects: ref([
      /*   {
          id: 1,
          title:
            "Construção de uma Sala de Aula na Escola da Aldeia de Montechimoio",
          objectivo: 5000,
          img: "https://www.thebighand.org/wp-content/uploads/2020/05/thebighand-doacao-objetivo-sala-de-aula.jpg",
          angariado: 3390,
          location: "Montechimoio",
          story:
            "Na escola da Aldeia de Montechimoio as crianças estudam com condiçoes precárias. É urgente ajudar! Construir uma sala de aulda para o pré-escolar é fundamental para que a Equipa Big Hand possa atuar na proteção das crianças em risco.",
        },
        {
          id: 2,
          title: "3 Salas de Aulas na Escola da Aldeia de Messica",
          objectivo: 3000,
          img: "https://www.thebighand.org/wp-content/uploads/2020/05/thebighand-doacao-objetivo.jpg",
          angariado: 1210,
          location: "Montechimoio",
          story:
            "Na escola da Aldeia de Montechimoio as crianças estudam com condiçoes precárias. É urgente ajudar! Construir uma sala de aulda para o pré-escolar é fundamental para que a Equipa Big Hand possa atuar na proteção das crianças em risco.",
        },
        {
          id: 3,
          title: "Furo de captação de água potável na aldeia de Montechimoio",
          objectivo: 3000,
          img: "https://www.thebighand.org/wp-content/uploads/2020/05/thebighand-doacao-objetivo-c-400x250.jpg",
          angariado: 1210,
          location: "Montechimoio",
          story:
            "Na escola da Aldeia de Montechimoio as crianças estudam com condiçoes precárias. É urgente ajudar! Construir uma sala de aulda para o pré-escolar é fundamental para que a Equipa Big Hand possa atuar na proteção das crianças em risco.",
        }, */
      ]),
      timeline: [
        {
          id: "1",
          title: "Programa Big Hand",
          description:
            " Aumentar o número de crianças abrangidas pelo programa Big Hand.",
          img: "https://www.thebighand.org/wp-content/uploads/2019/04/desafio-1-thebighand.png",
        },
        {
          id: "2",
          title: "Construção de Salas",
          description: "Construção de 3 salas em Matsinho e 2 salas em Chipaco",
          img: "https://www.thebighand.org/wp-content/uploads/2019/04/desafio-2-thebighand.png",
        },
        {
          id: "3",
          title: "Unidade Saúde",
          description: "Consolidar a ação da unidade avançada de saúde.",
          img: "https://www.thebighand.org/wp-content/uploads/2019/04/desafio-3-thebighand.png",
        },
        {
          id: "3",
          title: "Ensino Pré-Escolar",
          description:
            "Aumentar o número de Crianças a frequentar o ensino pré-escolar gratuito.",
          img: "https://www.thebighand.org/wp-content/uploads/2019/04/desafio-4-thebighand.png",
        },
        {
          id: "4",
          title: "Construção de latrinas ",
          description: "Construção de latrinas em Matsinho e Chipaco.",
          img: "https://www.thebighand.org/wp-content/uploads/2019/04/desafio-6-thebighand.png",
        },
      ],

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
          "http://192.168.1.199/laravel/public/api/logout",
          {},
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        )
        .then(function (response) {
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
         const newei = await axios.get("http://192.168.0.86:8080/api/news", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });
      
      newei.data.forEach((element:never, index:any) => {
        if(!this.feed.includes(element))
        {
          console.log(this.feed.includes(element),element,this.feed)
          this.feed.push(element);
        }
      });
      //console.log("News:", this.feed);
    },
      async Projects() {

        const project = await axios.get("http://192.168.0.86:8080/api/projects",
         { withCredentials: true,
          headers: {
            Accept: "application/json",
          },
         }
        )
          project.data.forEach((element: never, index: any) => {
            this.projects.push(element);
          });
    },
  },
  mounted(){
     this.News()
     this.Projects()
  },
   watch: {
    $route(to, from) {
      console.log("Route changed");
      let endpoint = this.$route.params.id;
      if (endpoint == "Feed") {
        this.News();
      } else if(endpoint=="Projectos"){
        this.Projects()
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

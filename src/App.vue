<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu
        content-id="main-content"
        v-if="$route.path !== '/login'"
        type="overlay"
      >
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Menu </ion-list-header>
            <ion-note href="https://www.thebighand.org/"
              >www.thebighand.org/</ion-note
            >

            <ion-menu-toggle
              auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                @click="selectedIndex = i"
                :router-link="p.url"
                lines="none"
                detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
              >
                <img slot="start" class="icons_menu" :src="p.mdIcon" />
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
import axios from "axios"

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
  },
  setup() {
    const selectedIndex = ref(0);
    const store = useStore();
    const { cookies } = useCookies();
    const appPages = [
      {
        title: "Feed",
        url: "/page/Feed",
        mdIcon: require("@/assets/logos/icons8-home-48.png"),
      },
      {
        title: "Projetos",
        url: "/page/Projectos",
        mdIcon: require("@/assets/logos/icons8-hand-love.png"),
      },
      {
        title: "Timeline",
        url: "/page/Timeline",
        mdIcon: require("@/assets/logos/icons8-timeline-24.png"),
      },
      {
        title: "Conta",
        url: "/page/Conta",
        mdIcon: require("@/assets/logos/icons8-user-32.png"),
      },
      {
        title: "Notificações",
        url: "/page/Notificações",
        mdIcon: require("@/assets/logos/icons8-notification-24.png"),
      },
      {
        title: "Definições",
        url: "/page/Definições",
        mdIcon: require("@/assets/logos/icons8-settings-48.png"),
      },
    ];
    const labels = [
      "Family",
      "Friends",
      "Notes",
      "Work",
      "Travel",
      "Reminders",
    ];

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }

    const route = useRoute();

    return {
      selectedIndex,
      appPages,
      labels,
      store,
      cookies,
      url:"http://127.0.0.1:8000/api",
      isSelected: (url: string) => (url === route.path ? "selected" : ""),
    };
  },
  async mounted() {
    let a: any =localStorage.getItem("token");
    if (a) {
      const d = await this.Verified() 
      if(!d)
      {
        this.$router.push("/login")
      }
    }
  },
  methods: {
    async Verified() {
      const r:any=await axios.post(this.url+"/verifyToken",{},{
        headers: {
          Authorization: "Bearer "+localStorage.getItem("token")
          }
      })
      return r.data.msg
    }
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>

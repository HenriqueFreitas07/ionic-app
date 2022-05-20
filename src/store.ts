import { createStore } from "vuex";
import axios from "axios";

const url = "http://127.0.0.1:8000/api/";
export const store = createStore({
  state() {
    return {
      token: "",
      projects:[],
      timeline:[],
      feed:[],
    };
  },
  actions: {
    async loggin(state: any, payload: any) {
      const ret = await axios
        .post(
          url + "login",
          {
            email: payload.email,
            password: payload.password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          window.localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
          window.localStorage.setItem(
            "token",
            response.data.token
          );
          return response;
        })
        .catch((error) => {
          return error;
        });

      return ret;
    },
    async register(state: any, payload: any) {
      const ret = await axios.post(url + "register", {
        email: payload.email,
        first_name: payload.username,
        last_name:"",
        password: payload.password,
      });
      return ret;
    },
    convertLocalStorage(state: any, payload: any) {
      const sItem: any = localStorage.getItem(payload.item);
      const item = JSON.parse(sItem);
      store.commit(payload.mutation, { data: item });
      return item;
    },
  },
  mutations: {
    setToken(state: any, payload: any) {
      //define o state tokenAA
      state.token = payload.data;
    },
    setProjects(state: any, payload: any) {
      //define o state projects
      state.projects = payload.data;
    },
    setFeed(state: any, payload: any) {
      //define o state feed
      state.feed = payload.data;
    },
    setTimeline(state: any, payload: any) {
      //define o state timeline
      state.timeline = payload.data;
    },
  },
  getters: {
    //ir buscar o user
    getUser: (state: any) => {
      return state.user;
    },
    getProjects: (state: any) => {
      return state.projects
    },
    getFeed: (state: any) => {
      return state.feed
    },
    getTimeline: (state: any) => {
      return state.timeline;
    }
  },
});

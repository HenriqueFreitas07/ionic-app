import { createStore } from "vuex";
import { Http, HttpResponse } from "@capacitor-community/http";
import axios from "axios";

const url = "http://192.168.0.86:8080";
export const store = createStore({
  state() {
    return {
      user: {} /* JSON.parse(window.localStorage.getItem('user')) */,
      token: "",
    };
  },
  actions: {
    async loggin(state: any, payload: any) {
      /* const ret = await axios
        .post(
          url + "/api/login",
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
            JSON.stringify(response.data.access_token)
          );
          store.commit("setToken", { data: response.data.access_token });
          store.commit("setUser", { data: response.data.user });
          r = response.status;
        })
        .catch((error) => {
          r=401
          return error;
        }); */
    },
    async register(state: any, payload: any) {
      const ret = await Http.request({
        method: "POST",
        url: url + "/api/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: payload.email,
          username: payload.username,
          password: payload.password,
        },
      });
      store.commit("setUser", { data: ret.data.user });
      return ret;
    },
    convertLocalStorage(state: any, payload: any) {
      const sItem: any = localStorage.getItem(payload.item);
      const item = JSON.parse(sItem);
      store.commit(payload.mutation, { data: item });
      return item;
    },
    async fetchData(state: any, payload: any) {
      const token = await store.dispatch("convertLocalStorage", {
        item: "token",
        mutation: "setToken",
      });

      const response: any = await Http.request({
        method: payload.method,
        url: url + payload.url,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
        data: payload.data,
      });
      store.commit(payload.mutation, {
        data: response.data[payload.localStorage],
      });
      localStorage.setItem(
        payload.localStorage,
        JSON.stringify(store.state.user)
      );
      return response;
    },
  },
  mutations: {
    //definir o user
    setUser(state: any, payload: any) {
      state.user = payload.data;
    },
    setToken(state: any, payload: any) {
      state.token = payload.data;
    },
  },
  getters: {
    //ir buscar o user
    getUser: (state: any) => {
      return state.user;
    },
  },
});

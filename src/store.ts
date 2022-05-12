import { createStore } from "vuex";
import axios from "axios";

const url = "http://127.0.0.1:8000/api/";
export const store = createStore({
  state() {
    return {
      user: {} /* JSON.parse(window.localStorage.getItem('user')) */,
      token: "",
    };
  },
  actions: {
    async loggin(state: any, payload: any) {
      console.log("bacano")
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
/*           window.localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          ); */
          window.localStorage.setItem(
            "token",
            response.data.token
          );
/*           store.commit("setToken", { data: response.data.token });
          store.commit("setUser", { data: response.data.user }); */
          return response;
        })
        .catch((error) => {
          return error;
        });

      return ret;
    },
    async register(state: any, payload: any) {
      const ret = await axios.post(url + "register/app", {
        email: payload.email,
        first_name: payload.username,
        password: payload.password,
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

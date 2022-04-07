import { createStore } from "vuex";
import { reactive } from "vue";
import { Http, HttpResponse } from "@capacitor-community/http";

export const store = createStore({
  state() {
    return {
      user:{} /* JSON.parse(window.localStorage.getItem('user')) */,
    };
  },
  actions: {
    async loggin(state: any, payload: any) {
      const ret = await Http.request({
        method: "POST",
        url: "http://192.168.0.85:8080/api/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: payload.email,
          password: payload.password,
        },
      });
      console.log(ret.data.user);
      window.localStorage.setItem('user',JSON.stringify(ret.data.user))
      store.commit("setUser", { user: ret.data.user });
      return ret;
    },
  },
  mutations: {

    //defenir o user
    setUser(state: any, payload: any) {
      state.user = payload.user;
      console.log(store.getters.getUser);
    },
  },
  getters: {
    //ir buscar o user
    getUser: (state: any) => {
      return state.user;
    },
  },
});

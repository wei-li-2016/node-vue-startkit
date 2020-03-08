import Vue from "vue";

export const userKey = "keydousuario";
export const baseApiUrl = "http://localhost:3001";

export function showError() {
  Vue.toasted.global.defaultError();
}

export function showErrorLogin() {
  Vue.toasted.global.defaultErrorLogin();
}

export function showErrorForm() {
  Vue.toasted.global.defaultErrorForm();
}

export default {
  baseApiUrl,
  showError,
  userKey,
  showErrorLogin,
  showErrorForm
};

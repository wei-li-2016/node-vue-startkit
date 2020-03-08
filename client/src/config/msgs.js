import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
  iconPack: "fontawesome",
  duration: 4000
});

Vue.toasted.register(
  "defaultSuccess",
  payload => (!payload.msg ? "Operação realizada com sucesso!" : payload.msg),
  { type: "success", icon: "check" }
);

Vue.toasted.register(
  "defaultError",
  payload => (!payload.msg ? "Oops.. Erro inesperado." : payload.msg),
  { type: "error", icon: "times" }
);

Vue.toasted.register(
  "defaultErrorLogin",
  payload =>
    !payload.msg ? "Oops.. Usuário ou senha inválidos." : payload.msg,
  { type: "error", icon: "times" }
);

Vue.toasted.register(
  "defaultErrorForm",
  payload =>
    !payload.msg ? "Oops.. Os dados do formulário são inválidos." : payload.msg,
  { type: "error", icon: "times" }
);

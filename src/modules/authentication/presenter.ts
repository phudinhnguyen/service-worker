import User from "@modules/user/entity";
import store from "@store/redux";
import profileStore from "./profileStore";
import authenticationRepository from "./repository";
import jwt from "jsonwebtoken";

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload) => {
  const token = await authenticationRepository.login(payload);

  var user = jwt.decode(token);
  store.dispatch(profileStore.actions.fetchProfile(new User(user)));
  return token;
};

export default authenticationPresenter;

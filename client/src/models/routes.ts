export enum Route {
  Blog = "/",
  SignUp = "/auth/signUp",
  SignIn = "/auth/signIn",
  Profile = "/profile",
}

export const PROTECTED_ROUTES: (Route | RegExp)[] = [
  Route.Blog,
  Route.Profile,
  new RegExp(`^${Route.Profile}/.+$`),
];

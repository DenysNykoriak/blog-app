import { PROTECTED_ROUTES } from "@/models/routes";

export const checkIsPathnameProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTES.some((route) =>
    typeof route === "string" ? route === pathname : route.test(pathname),
  );

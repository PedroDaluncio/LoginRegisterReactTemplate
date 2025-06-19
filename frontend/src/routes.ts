import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  route("/auth", "routes/auth/auth.tsx")
] satisfies RouteConfig
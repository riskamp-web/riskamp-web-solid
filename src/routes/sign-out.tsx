
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import * as auth from "~/lib/auth";

export default function Signout() {

  const navigate = useNavigate();

  onMount(async () => {
    await auth.Logout();
    navigate("/", { replace: true });
  });

  return null; // TODO: render something

}

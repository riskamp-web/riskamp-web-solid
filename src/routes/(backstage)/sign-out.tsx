
import { onMount } from '~/lib/solid-compat';
import { useNavigate } from "@solidjs/router";

import { flushDocuments } from '~/backstage/documents-store';
import * as auth from "~/lib/auth";

export default function Signout() {

  const navigate = useNavigate();

  onMount(async () => {
    try {
      await auth.Logout();
    }
    finally {
      await flushDocuments();
      navigate("/", { replace: true });
    }
  });

  return null; // TODO: render something

}

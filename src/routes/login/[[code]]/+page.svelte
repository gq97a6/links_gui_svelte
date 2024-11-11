<script lang="ts">
  import "@material/web/button/filled-tonal-button";
  import "@material/web/button/outlined-button";
  import "@material/web/textfield/outlined-text-field";
  import "@material/web/progress/circular-progress";
  import { login } from "$lib/api.ts";
  import { toast } from "svelte-sonner";
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  import type { TextField } from "@material/web/textfield/internal/text-field";

  let usernameField: TextField;
  let passwordField: TextField;
  let isLogin = $state(false);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      onLogin();
    }
  }
 
  function onLogin() {
    if (isLogin) return
    isLogin = true

    login({ username: usernameField.value, password: passwordField.value })
      .then(() => {
        if ($page.params.code === undefined) goto("/edit");
        else goto(`/edit/${$page.params.code}`);
      })
      .catch((error) => {
        setTimeout(() => { 
          isLogin = false
          toast("Niepoprawne dane logowania");
        }, 1000);
      });
  }
</script>

{#if isLogin}
  <div class="fixed flex top-0 left-0 w-full h-full backdrop-blur-md z-10 place-content-center">
    <md-circular-progress indeterminate class="place-self-center"></md-circular-progress>
  </div>
{/if}

<div class="flex flex-col items-start mx-auto w-2/6">
  <img class="h-36" src="/gp_logo.svg" alt="Logo" />
  <form onkeydown={handleKeyDown}>
    <md-outlined-text-field bind:this={usernameField} label="Login" class="w-3/4 mt-4"></md-outlined-text-field>
    <md-outlined-text-field bind:this={passwordField} label="Hasło" type="password" class="w-full mt-4"></md-outlined-text-field>
    <md-filled-tonal-button onclick={onLogin} role="button" class="w-3/5 mt-4">Potwierdź</md-filled-tonal-button>
  </form>
</div>

<div class="flex flex-row justify-center items-center"></div>

<style>
  md-circular-progress {
    --md-circular-progress-active-indicator-color: var(--md-sys-color-secondary);
  }
</style>
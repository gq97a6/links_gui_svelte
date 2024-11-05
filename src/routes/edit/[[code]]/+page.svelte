<script lang="ts">
  import "@material/web/button/filled-tonal-button";
  import "@material/web/button/filled-button";
  import "@material/web/textfield/outlined-text-field";
  import "@material/web/checkbox/checkbox";
  import "@material/web/switch/switch";
  import Link from "./Link.svelte";
</script>

<div class="flex flex-row w-1/2 mx-auto">
  <img class="h-36" src="gp_logo.svg" alt="Logo" />
  <div class="flex flex-col w-full ms-5 mt-6">
    <md-outlined-text-field label="Kod" value=""></md-outlined-text-field>
    <div class="flex flex-row w-full mt-3">
      <md-filled-tonal-button class="w-1/2">Edytuj</md-filled-tonal-button>
      <md-filled-button class="w-1/2 ms-4">Stwórz nowy</md-filled-button>
    </div>
  </div>
</div>

<div class="flex flex-row items-center font-semibold w-1/2 mx-auto mt-5">
  <md-switch class="me-3"></md-switch>
  Bezpośredni
</div>

<div class="flex flex-col mt-5 w-1/2 mx-auto">
  <Link index=0> </Link>
  <Link index=1> </Link>
  <Link index=2> </Link>
  <Link index=3> </Link>
</div>

<div class="flex flex-row items-center font-semibold w-1/2 mx-auto">
  <md-filled-tonal-button class="w-1/4">Potwierdź edycję</md-filled-tonal-button>
  <md-filled-button class="ms-10 w-1/4">Usuń ten adres</md-filled-button>
</div>


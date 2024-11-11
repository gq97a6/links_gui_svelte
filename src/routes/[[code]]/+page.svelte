<script lang="ts">
  import "@material/web/button/filled-tonal-button";
  import "@material/web/textfield/outlined-text-field";
  import CardSlot from "$lib/components/CardSlot.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { getAddress, type Address, type Link } from "$lib/api.ts";
  import type { TextField } from "@material/web/textfield/internal/text-field";
  import type { Button } from "@material/web/button/internal/button";
  import { toast } from "svelte-sonner";
  import { replaceState } from "$app/navigation";
  import { fade } from "svelte/transition";
  
  //Components
  let codeField: TextField;
  let showButton: Button;

  //States
  let address: Address
  let showLinks = $state(false)
  let isLoading = $state(false)
  let links: Link[] = $state([
    {payload: "", action: "TAB"},
    {payload: "", action: "TAB"},
    {payload: "", action: "TAB"},
    {payload: "", action: "TAB"}
  ])

  function loadAddressByCode(code: string) {
    //Validate code
    if (codeField.value.length < 0 || codeField.value.length > 10) {
      toast("Niepoprawny adres");
      return
    }

    isLoading = true

    //Get address from API and switch to show mode
    getAddress(code).then((newAddress: Address) => {
      isLoading = false
      if (!newAddress.direct) switchUiToShow(newAddress)
      else window.location.href = newAddress.links[0].payload
    })
    .catch((error) => {
      isLoading = false
      toast("Ten adres nie istnieje");
      switchUiToNone()
    });
  }

  function switchUiToShow(newAddress: Address) {
    address = newAddress
    replaceState(`/${address.code}`, {})
    codeField.value = address.code
    links = address.links
    showLinks = true
  }

  function switchUiToNone() {
    replaceState("/", {})
    showLinks = false
    showButton.disabled = codeField.value.length == 0
  }

  async function onShowClick() {
    loadAddressByCode(codeField.value)
  }

  async function onCodeInput() {
    switchUiToNone()
  }

  onMount(async () => {
    codeField.addEventListener("input", onCodeInput)
    showButton.addEventListener("click", onShowClick)
    if ($page.params.code != undefined) loadAddressByCode($page.params.code)
  })
</script>

{#if isLoading}
  <div in:fade out:fade class="fixed flex top-0 left-0 w-full h-full backdrop-blur-md z-10 place-content-center">
    <md-circular-progress indeterminate class="place-self-center"></md-circular-progress>
  </div>
{/if}

<div class="flex flex-row justify-center items-center">
  <img class="h-36" src="gp_logo.svg" alt="Logo" />
  <div class="flex flex-col w-1/3 ms-5 mt-4">
    <md-outlined-text-field bind:this={codeField} label="Kod" value=""></md-outlined-text-field>
    <md-filled-tonal-button bind:this={showButton} class="w-3/5 mt-3">Potwierdź</md-filled-tonal-button>
  </div>
</div>

<div class="linksBox {showLinks ? 'expanded' : ''}">
  <div class="flex flex-row justify-around mt-16">
    <CardSlot index={0} link={links[0]} />
    <CardSlot index={1} link={links[1]} />
    <CardSlot index={2} link={links[2]} />
    <CardSlot index={3} link={links[3]} />
  </div>
</div>

<style>
  .linksBox {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-in-out;
  }

  .linksBox.expanded {
      max-height: 100vh; /* Set to a value larger than the content */
      opacity: 1;
  }
</style>
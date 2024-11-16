<script lang="ts">
  import "@material/web/button/filled-tonal-button";
  import "@material/web/button/filled-button";
  import "@material/web/textfield/outlined-text-field";
  import "@material/web/checkbox/checkbox";
  import "@material/web/switch/switch";
  import LinkSlot from "$lib/components/LinkSlot.svelte";
  import { checkAuth, deleteAddress, getAddress, postAddress, putAddress, type Address, type Link } from "$lib/api.ts";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { toast } from "svelte-sonner";
  import { replaceState } from "$app/navigation";
  import type { TextField } from "@material/web/textfield/internal/text-field";
  import type { Button } from "@material/web/button/internal/button";
  import type { Checkbox } from "@material/web/checkbox/internal/checkbox";
  import type { Dialog } from "@material/web/dialog/internal/dialog";
  import ActionDialog from "$lib/components/ActionDialog.svelte";
  import { fade } from "svelte/transition";

  //Components
  let codeField: TextField;
  let customCodeField: TextField;
  let editButton: Button;
  let newButton: Button;
  let removeButton: Button;
  let editConfirmButton: Button;
  let newConfirmButton: Button;
  let isDirectCheckbox: Checkbox;
  let isRandomCheckbox: Checkbox;
  let dialog: Dialog;

  //States
  let address: Address
  let linkCount = $state(4);
  let showLinks = $state(false);
  let isLoading = $state(false);
  let showRandomLabel = $state(false);
  let dialogOnCancel = $state(() => {})
  let dialogOnAccept = $state(() => {})
  let links: Link[] = $state([
    {payload: "", action: "TAB"},
    {payload: "", action: "TAB"},
    {payload: "", action: "TAB"},
    {payload: "", action: "TAB"}
  ])
  
  async function loadAddressByCode(code: string) {
    //Validate code
    if (codeField.value.length < 0 || codeField.value.length > 10) {
      toast("Niepoprawny adres");
      return
    }

    isLoading = true

    //Get address from API and switch to edit mode
    getAddress(code).then((address: Address) => {
      isLoading = false
      switchUiToEdit(address)
    })
    .catch((error) => {
      isLoading = false
      toast("Ten adres nie istnieje");
      switchUiToNone()
    });
  }

  function switchUiToNewLink() {
    showLinks = true
    codeField.value = ""
    newButton.disabled = true
    editButton.disabled = true
    links = [
      {payload: "", action: "TAB"},
      {payload: "", action: "TAB"},
      {payload: "", action: "TAB"},
      {payload: "", action: "TAB"}
    ]
    linkCount = 4
    isRandomCheckbox.checked = true
    isDirectCheckbox.checked = false
    showRandomLabel = true
    customCodeField.hidden = isRandomCheckbox.checked
    isRandomCheckbox.hidden = false
    newConfirmButton.hidden = false
    editConfirmButton.hidden = true
    removeButton.hidden = true
  }

  function switchUiToEdit(newAddress: Address) {
    replaceState(`/edit/${newAddress.code}`, {})
    address = newAddress
    links = newAddress.links
    linkCount = newAddress.direct ? 1 : 4
    isDirectCheckbox.checked = address.direct
    codeField.value = address.code
    showLinks = true
    showRandomLabel = false
    customCodeField.hidden = true
    isRandomCheckbox.hidden = true
    newConfirmButton.hidden = true
    editConfirmButton.hidden = false
    removeButton.hidden = false
  }

  function switchUiToNone() {
    replaceState("/edit", {})
    showLinks = false
    newButton.disabled = false
    editButton.disabled = codeField.value.length == 0
  }

  //On clicks -------------------------

  async function onEditClick() {
    loadAddressByCode(codeField.value)
  }

  async function onNewClick() {
    switchUiToNewLink()
  }

  async function onEditConfirmClick() {
    dialogOnAccept = () => {
      address.direct = isDirectCheckbox.checked
      address.links = links
      
      isLoading = true
      putAddress(address).then(() => {
        isLoading = false;
        toast("Zmieniono adres")
      })
      .catch((error) => {
        isLoading = false;
        toast("Błąd przetwarzania")
      });
    }
    dialog.open = true
  }

  async function onNewConfirmClick() {
    dialogOnAccept = () => {
      let newAddress: Address = {
        id: "",
        direct: isDirectCheckbox.checked,
        code: "",
        links: links
      };

      if (!isRandomCheckbox.checked) newAddress.code = customCodeField.value

      isLoading = true
      postAddress(newAddress).then((address) => {
        isLoading = false;
        toast("Utworzono adres")
        switchUiToEdit(address)
      })
      .catch((error) => {
        isLoading = false;
        toast("Błąd przetwarzania")
      });
    }
    dialog.open = true
  }

  async function onRemoveClick() {
    dialogOnAccept = () => {
      isLoading = true
      deleteAddress(address.code).then(() => {
        isLoading = false;
        toast("Usunięto adres")
        codeField.value = ""
        switchUiToNone()
      })
      .catch((error) => {
        isLoading = false;
        toast("Błąd przetwarzania")
      });
    }
    dialog.open = true
  }

  async function onIsRandomCheckboxChange() {
    customCodeField.hidden = isRandomCheckbox.checked
  }

  async function onIsDirectCheckboxChange() {
    linkCount = isDirectCheckbox.checked ? 1 : 4
  }

  async function onCodeInput() {
    switchUiToNone()
  }

  onMount(async () => {
    codeField.addEventListener("input", onCodeInput)
    editButton.addEventListener("click", onEditClick)
    newButton.addEventListener("click", onNewClick)
    removeButton.addEventListener("click", onRemoveClick)
    editConfirmButton.addEventListener("click", onEditConfirmClick)
    newConfirmButton.addEventListener("click", onNewConfirmClick)
    isDirectCheckbox.addEventListener("change", onIsDirectCheckboxChange)
    isRandomCheckbox.addEventListener("change", onIsRandomCheckboxChange)

    await checkAuth($page.params.code ? $page.params.code : "")
    if ($page.params.code != undefined) loadAddressByCode($page.params.code)
  })
</script>

<ActionDialog bind:dialog={dialog} content="Czy jesteś pewien?" onAccept={dialogOnAccept} onCancel={dialogOnCancel}></ActionDialog>

{#if isLoading}
  <div in:fade out:fade class="fixed flex top-0 left-0 w-full h-full backdrop-blur-md z-10 place-content-center">
    <md-circular-progress indeterminate class="place-self-center"></md-circular-progress>
  </div>
{/if}


<div class="flex flex-row w-1/2 mx-auto">
  <img class="h-36" src="/gp_logo.svg" alt="Logo" />
  <div class="flex flex-col w-full ms-5 mt-6">
    <md-outlined-text-field bind:this={codeField} label="Kod" type="number" noSpinner></md-outlined-text-field>
    <div class="flex flex-row w-full mt-3">
      <md-filled-tonal-button bind:this={editButton} class="w-1/2" disabled>Edytuj</md-filled-tonal-button>
      <md-filled-button bind:this={newButton} class="w-1/2 ms-4">Stwórz nowy</md-filled-button>
    </div>
  </div>
</div>

<div class="linksBox {showLinks ? 'expanded' : ''}">
  <div class="flex flex-row items-center font-semibold w-1/2 mx-auto mt-5">
    <md-checkbox bind:this={isDirectCheckbox} class="me-3"></md-checkbox>
    Bezpośredni
    <md-checkbox bind:this={isRandomCheckbox} class="ms-7 me-3"></md-checkbox>
    {#if showRandomLabel} Losowy kod {/if}
    <md-outlined-text-field bind:this={customCodeField} label="Niestandardowy kod" type="number" noSpinner class="ms-5"></md-outlined-text-field>
  </div>
  
  <div class="flex flex-col mt-6 w-1/2 mx-auto">
    {#each {length: linkCount} as _, index}
      <LinkSlot index={index} link={links[index]} onActionSelected={(a) => { links[index].action = a}} onPayloadSet={(p) => {links[index].payload = p}}> </LinkSlot>
	  {/each}
  </div>
    
  <div class="flex flex-row items-center font-semibold w-1/2 mx-auto">
    <md-filled-tonal-button bind:this={editConfirmButton} class="w-1/4">Potwierdź edycję</md-filled-tonal-button>
    <md-filled-button bind:this={removeButton} class="ms-10 w-1/4">Usuń ten adres</md-filled-button>
    <md-filled-tonal-button bind:this={newConfirmButton} class="w-1/4">Potwierdź utworzenie</md-filled-tonal-button>
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



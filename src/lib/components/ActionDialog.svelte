<script lang="ts">
  import "@material/web/dialog/dialog";
  import "@material/web/button/filled-tonal-button";
  import "@material/web/button/filled-button";
  import "@material/web/button/text-button";
  import "@material/web/button/outlined-button";
  import type { Button } from "@material/web/button/internal/button";
  import type { Dialog } from "@material/web/dialog/internal/dialog";
  import { onMount } from "svelte";

  let { dialog = $bindable(), content, onCancel, onAccept}: {
    dialog: Dialog,
    content: string,
    onCancel: () => void,
    onAccept: () => void 
  } = $props();

  let cancelButton: Button;
  let acceptButton: Button;

  onMount(async () => {
    dialog.addEventListener('cancel', async () => {
      onCancel();
    });

    cancelButton.addEventListener('click', async () => {
      await dialog.close();
      onCancel();
    });

    acceptButton.addEventListener('click', async () => {
      await dialog.close();
      onAccept();
    });
  })
</script>

<md-dialog bind:this={dialog} type="alert">
  <div slot="headline">
    <div class="text-3xl w-full text-center px-3 pt-2">
      {content}
    </div>
  </div>
  <div slot="actions" class="flex justify-center mt-4 pb-8">
    <md-outlined-button bind:this={cancelButton}>Anuluj</md-outlined-button>
    <md-filled-tonal-button bind:this={acceptButton} class="ms-6">Potwierdź</md-filled-tonal-button>
  </div>
</md-dialog>
<script lang="ts">
  import type { Link } from "$lib/api.svelte";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";

  let { index, link }: { index: number; link: Link } = $props();
  let card: any;

  async function onCardClick() {
    switch(link.action) {
      case "TAB":
        window.open(link.payload, "_blank");
        break;
      case "LINK":
        window.location.href = link.payload
        break;
      case "COPY":
        window.navigator.clipboard.writeText(link.payload)
        toast("Przeniesiono do schowka")
        break;
    }

  }

  onMount(async () => {
    card.addEventListener("click", onCardClick);
  });
</script>

<div bind:this={card} id="card{index}" class="card size-1/6 border rounded-2xl aspect-square text-9xl font-semibold flex items-center justify-center pb-4 {link.payload.length == 0 ? 'opacity-30' : 'opacity-100'}">
  <md-ripple for="card{index}" disabled={link.payload.length == 0}></md-ripple>
  {index}
</div>

<style>
  .card {
    color: var(--md-sys-color-on-background);
    border-color: var(--md-sys-color-on-background);
    position: relative;
  }
</style>

<script lang="ts">
  export let index;
</script>

<div
  class="card size-1/6 border rounded-2xl aspect-square text-9xl font-semibold flex items-center justify-center pb-4"
  id="card{index}"
>
  <md-ripple for="card{index}"></md-ripple>
  {index}
</div>

<style>
  .card {
    color: var(--md-sys-color-on-background);
    border-color: var(--md-sys-color-on-background);
    position: relative;
  }
</style>

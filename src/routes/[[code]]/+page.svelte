<script lang="ts">
  import "@material/web/button/filled-tonal-button";
  import "@material/web/textfield/outlined-text-field";
  import Card from "./Card.svelte";
</script>

<div class="flex flex-row justify-center items-center">
  <img class="h-36" src="gp_logo.svg" alt="Logo" />
  <div class="flex flex-col w-1/3 ms-5 mt-4">
    <md-outlined-text-field label="Kod" value=""></md-outlined-text-field>
    <md-filled-tonal-button class="w-3/5 mt-3">Potwierdź</md-filled-tonal-button>
  </div>
</div>

<div class="flex flex-row justify-around mt-16">
  <Card index=0></Card>
  <Card index=1></Card>
  <Card index=2></Card>
  <Card index=3></Card>
</div>
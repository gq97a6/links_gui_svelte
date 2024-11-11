<script>
  import Clicker from "./Clicker.svelte";
  import "@material/web/textfield/outlined-text-field";

let count = $state(0);
</script>

<button onclick={() => count++}>
	clicks: {count}
</button>

<Clicker index={count}></Clicker>
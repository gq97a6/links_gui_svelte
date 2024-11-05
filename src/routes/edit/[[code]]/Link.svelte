<script lang="ts">
  import "@material/web/textfield/outlined-text-field";
  import "@material/web/chips/input-chip";
  import "@material/web/chips/chip-set";

  export let index;
</script>

<md-outlined-text-field label="Slot{index}" value=""></md-outlined-text-field>
<md-chip-set class="mt-3 mb-8">
  <md-input-chip label="ㅤKartaㅤ" class="me-3"></md-input-chip>
  <md-input-chip label="ㅤLinkㅤ" class="me-3"></md-input-chip>
  <md-input-chip label="ㅤSchowekㅤ" class="me-3"></md-input-chip>
</md-chip-set>

<style>
  md-input-chip {
    --md-input-chip-icon-size: 0px;
  }
</style>

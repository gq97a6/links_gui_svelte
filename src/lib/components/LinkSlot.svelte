<script lang="ts">
  import "@material/web/textfield/outlined-text-field";
  import "@material/web/chips/filter-chip";
  import "@material/web/chips/chip-set";
  import { FilterChip } from "@material/web/chips/internal/filter-chip";
  import type { ChipSet } from "@material/web/chips/internal/chip-set";
  import type { TextField } from "@material/web/textfield/internal/text-field";
  import { actionEntries, type Action, type Link } from "$lib/api.ts";

  let { index, link, onActionSelected, onPayloadSet}: {
    index: number,
    link: Link,
    onActionSelected: (action: Action) => void,
    onPayloadSet: (link: string) => void
  } = $props();

  let chipSet: ChipSet;
  let slotField: TextField;

  function onSlotInput() {
    onPayloadSet(slotField.value)
  }

  function onChipClick(chipIndex: number) {
    //Diselect all chips
    chipSet.chips.forEach((chip) => {
      if (chip instanceof FilterChip) chip.selected = false
    })
    
    //Select clicked chip
    let chip = chipSet.chips[chipIndex]
    if (chip instanceof FilterChip) chip.selected = true

    //Fire on chip select event action
    onActionSelected(actionEntries[chipIndex])
  }
</script>

<md-outlined-text-field bind:this={slotField} value={link.payload} oninput={onSlotInput} label="Slot{index}"></md-outlined-text-field>
<md-chip-set class="mt-3 mb-8" bind:this={chipSet}>
  <md-filter-chip selected={link.action == "TAB"} onclick={() => {onChipClick(0)}} label="Karta" class="me-3"></md-filter-chip>
  <md-filter-chip selected={link.action == "LINK"} onclick={() => {onChipClick(1)}} label="Link" class="me-3"></md-filter-chip>
  <md-filter-chip selected={link.action == "COPY"} onclick={() => {onChipClick(2)}} label="Schowek" class="me-3"></md-filter-chip>
</md-chip-set>

<style>
  md-filter-chip {
    --md-filter-chip-leading-space: 30px;
    --md-filter-chip-trailing-space: 30px;
    --md-filter-chip-with-leading-icon-leading-space: 30px;
    --md-filter-chip-icon-label-space: 0px;
    --md-filter-chip-icon-size: 0px;
  }
</style>

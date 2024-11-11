<script>
  import { Toaster } from "svelte-sonner";
  import "../app.css";
  import { onMount } from "svelte";
  import "@material/web/progress/circular-progress";
  import { fade } from "svelte/transition";

  let { children } = $props()
  
  let isMounted = $state(false);
  onMount(async () => {
    isMounted = true;
  });
</script>

<Toaster
  duration={2000}
  position="top-center"
  toastOptions={{
    //unstyled: true,
    class:
      "border-0 text-neutral-200 text-center text-lg bg-neutral-800 drop-shadow-lg",
    descriptionClass: "my-toast-description",
  }}
/>

{#if !isMounted}
  <div in:fade out:fade class="fixed flex top-0 left-0 w-full h-full backdrop-blur-md z-10 place-content-center loading">
    <div class="loader place-self-center"></div>
  </div>
{/if}

{@render children()}

<style>
  .loading {
    background-color: var(--md-sys-color-background);
  }

  .loader {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid var(--md-sys-color-secondary);
    animation:
      l20-1 0.8s infinite linear alternate,
      l20-2 1.6s infinite linear;
  }
  @keyframes l20-1{
    0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
    12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
    25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
    50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
    62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
    75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
    100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
  }
  @keyframes l20-2{ 
    0%    {transform:scaleY(1)  rotate(0deg)}
    49.99%{transform:scaleY(1)  rotate(135deg)}
    50%   {transform:scaleY(-1) rotate(0deg)}
    100%  {transform:scaleY(-1) rotate(-135deg)}
  }
</style>
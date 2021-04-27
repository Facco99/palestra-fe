<script>
  import { getContext } from "svelte";
  import ModaleModifica from "./ModaleModifica.svelte";
  const { open } = getContext("simple-modal");

  const showSurprise = () => {
    open(ModaleModifica, {message: "Questa funzionalità non è ancora disponibile"});
  };
</script>

<button on:click={showSurprise} class="bg-purple-600 text-white rounded p-2 margin">Modifica</button>

<style>
    .margin{
        margin-left: 70px;
    }
</style>

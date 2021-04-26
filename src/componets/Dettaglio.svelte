<script>
  export let params = {};
  import { onMount } from "svelte";
  import axios from "axios";

  let dettaglio;

  onMount(async () => {
    const res = await axios.get(
      `http://localhost:1337/schedas/${params.id}`
    );
    dettaglio = res.data;
    console.log(dettaglio);
  });
</script>
<section class="text-gray-600 body-font">
  {#if dettaglio}
  <div class="container px-5 py-24 mx-auto flex flex-wrap">
    {#each dettaglio.esercizi as esercizio, i}
    <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">{i+1}</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        {#each esercizio.immagine as img}
        <div class="w-6/12 sm:w-4/12 px-4">
          <img src="http://localhost:1337{img.formats.thumbnail.url}" alt="{esercizio.nome}" class="shadow max-w-full h-auto align-middle border-none">
        </div>
        {/each}
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">{esercizio.nome}</h2>
          <p class="leading-relaxed">Serie : {esercizio.serie}</p>
          <p class="leading-relaxed">Ripetizioni : {esercizio.ripetizioni}</p>
          <p class="leading-relaxed">Recupero : {esercizio.recupero}</p>
          <p class="leading-relaxed">Descrizione : {esercizio.descrizione}</p>
        </div>
      </div>
    </div>
    {/each}
  </div>
  {/if}
</section>

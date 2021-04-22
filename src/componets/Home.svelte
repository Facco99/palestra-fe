<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import {fade, scale} from 'svelte/transition';
  import { getUser } from "../auth";

  let schede = [];

  let user = JSON.parse(sessionStorage.getItem("user"));

  onMount(async () => {
    const res = await fetch(`http://localhost:1337/schedas?user_null=true`);  //far vedere schede senza utente collegato
    schede = await res.json();
  });

</script>

<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h2
        class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1"
      >
        Palestra 4.0
      </h2>
      {#if sessionStorage.getItem("user")==null}
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
        Benvenuto!!
      </h1>
      {:else}
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
        Benvenuto {user.username}!!
      </h1>
      {/if}
    </div>
    <div class="flex flex-wrap -m-4" in:fade out:scale|local>
      {#if schede.length > 0}
        {#each schede as scheda}
          <div class="p-4 md:w-1/3">
            <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div class="flex items-center mb-3">
                <div
                  class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h2 class="text-gray-900 text-lg title-font font-medium">
                  {scheda.tipo}
                </h2>
              </div>
              <div class="flex-grow">
                <p class="leading-relaxed text-base">{scheda.descrizione}</p>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                  class="mt-3 text-indigo-500 inline-flex items-center"
                  on:click={() =>
                    push(`/dettaglio/${scheda.id}`)}
                  >Dettaglio Scheda
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>

<style>
  section {
    margin-top: -80px;
    margin-bottom: -80px;
  }
</style>

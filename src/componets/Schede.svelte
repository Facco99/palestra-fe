<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import {fade, scale} from 'svelte/transition';
    import { getToken } from "../auth";
    import Tabs from "../shared/Tabs.svelte";
  
    let schede = [];
  
    let user = JSON.parse(sessionStorage.getItem("user"));

    let items=['Visualizza le tue schede', 'Crea una scheda personalizzata'];
	  let activeItem = 'Visualizza le tue schede';
  
    onMount(async () => {
      axios.get(
              `http://localhost:1337/schedas?user.username=${user.username}`,
                {
                    headers: {
                        Authorization: "Bearer " + getToken(),
                    },
                }
            ).then((res) => {
              schede = res.data;
            })
    });

    const tabChange = (e) => {
		activeItem = e.detail;
	}

</script>

<Tabs {activeItem} {items} on:tabChange={tabChange}/>
{#if activeItem==="Visualizza le tue schede"}
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
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
                  on:click={() => push(`/dettaglio/${scheda.id}`)}
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
{:else if activeItem==="Crea una scheda personalizzata"}
sei in crea scheda
{/if}


<style>
  section {
    margin-top: -80px;
    margin-bottom: -80px;
  }
</style>

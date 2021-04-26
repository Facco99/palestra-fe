<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import { push } from "svelte-spa-router";
  import { fade, scale } from "svelte/transition";
  import { getToken } from "../auth";
  import Tabs from "../shared/Tabs.svelte";

  let schede = [];

  let tipo;
  let descrizione;
  let esercizi = [];
  let valoriSelezionati = [];

  let user = JSON.parse(sessionStorage.getItem("user"));

  let items = ["Visualizza le tue schede", "Crea una scheda personalizzata"];
  let activeItem = "Visualizza le tue schede";

  onMount(async () => {
    axios
      .get(`http://localhost:1337/schedas?user.username=${user.username}`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        schede = res.data;
      });
    axios.get(`http://localhost:1337/esercizios`).then((res) => {
      console.log(res.data);
      esercizi = res.data.map((esercizio) => {
        return {
          label: esercizio.nome,
          value: esercizio,
        };
      });
    });
  });

  const tabChange = (e) => {
    activeItem = e.detail;
  };

  const eliminaScheda = async (id) => {
    await axios.delete(`http://localhost:1337/schedas/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
    schede = schede.filter((scheda) => scheda.id !== id);
  };

  function eserciziSelezionati(event) {
    console.log(event.detail);
    valoriSelezionati = event.detail.map(({ value }) => value);
  }

  const aggiungi = async () => {
    await axios.post(
      `http://localhost:1337/schedas`,
      {
        tipo,
        descrizione,
        user: user,
        esercizi: valoriSelezionati,
      },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    activeItem = "Visualizza le tue schede";
    window.location.reload();
  };
</script>

<Tabs {activeItem} {items} on:tabChange={tabChange} />
{#if activeItem === "Visualizza le tue schede"}
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
                  <button
                    class="bg-purple-700 text-white rounded p-2 margin-left"
                    on:click={() => eliminaScheda(scheda.id)}
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <p>Non hai schede personalizzate</p>
        {/if}
      </div>
    </div>
  </section>
{:else if activeItem === "Crea una scheda personalizzata"}
  <div class="font-sans margin-bottom">
    <div class="relative min-h-screen flex flex-col items-center">
      <div class="relative sm:max-w-sm w-full">
        <div class="w-full h-full rounded-3xl absolute  transform -rotate-6" />
        <div class="w-full h-full rounded-3xl absolute  transform rotate-6" />
        <div
          class="relative w-full rounded-3xl  px-6 py-4 bg-indigo-100 shadow-md"
        >
          <form
            method="#"
            action="#"
            class="mt-10"
            in:fade
            on:submit={() => aggiungi()}
          >
            <div>
              <input
                type="text"
                bind:value={tipo}
                placeholder="Nome Scheda"
                class="mt-1 block w-full border-none bg-indigo-100 h-11 rounded-xl shadow-lg hover:bg-indigo-200 focus:bg-indigo-200 focus:ring-0"
              />
            </div>

            <div class="mt-7">
              <input
                type="text"
                placeholder="Descrizione"
                bind:value={descrizione}
                class="mt-1 block w-full border-none bg-indigo-100 h-11 rounded-xl shadow-lg hover:bg-indigo-200 focus:bg-indigo-200 focus:ring-0"
              />
            </div>

            <div class="mt-7">
              <Select
                items={esercizi}
                bind:valoriSelezionati
                isMulti={true}
                on:select={eserciziSelezionati}
              />
            </div>

            <div class="mt-7">
              <button
                class="bg-indigo-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              >
                Aggiungi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  section {
    margin-top: -80px;
    margin-bottom: -80px;
  }
  .margin-left {
    margin-left: 170px;
  }
  .margin-bottom {
    margin-bottom: -25%;
  }
</style>

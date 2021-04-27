<script lang="ts">
  import Router from "svelte-spa-router";

  import Footer from "./componets/Footer.svelte";
  import Navbar from "./componets/Navbar.svelte";
  import Home from "./componets/Home.svelte";
  import Schede from "./componets/Schede.svelte";
  import Login from "./componets/Login.svelte";
  import Register from "./componets/Register.svelte";
  import Dettaglio from "./componets/Dettaglio.svelte";

  import { location } from "svelte-spa-router";
  import ModaleModifica from "./componets/ModaleModifica.svelte";

  const routes = {
    // Exact path
    "/": Home,

    // Using named parameters, with last being optional
    "/schede": Schede,

    // Wildcard parameter
    "/login": Login,

    // Wildcard parameter
    "/register": Register,

    // Wildcard parameter
    "/dettaglio/:id": Dettaglio,

    // Wildcard parameter
    "/modifica/:id": ModaleModifica,

    // Catch-all
    // This is optional, but if present it must be the last
    "*": Home,
  };
</script>

{#if $location != "/login"}
  {#if $location != "/register"}
    <Navbar />
  {/if}
{/if}

<main>
  <Router {routes} />
</main>
{#if $location != "/login"}
  {#if $location != "/register"}
    <Footer />
  {/if}
{/if}

<script lang="ts">
  import { link } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { getContext } from "svelte";
  import axios from "axios";

  export let next: string = "/";
  let registerError: string | null = null;

  let email = "";
  let password = "";
  let cpassword = "";
  let username = "";

  function register() {
        username = username.trim();
        password = password.trim();
        username = username.trim();

        if (!username || !password || !username) {
            registerError = "Controlla tutti i campi";
            return;
        }
        registerError = null;

        axios
            .post("http://localhost:1337/auth/local/register", {
                email,
                username,
                password,
            })
            .then(({ data }) => {
                sessionStorage.setItem("JWT", data.jwt);
                sessionStorage.setItem("user", JSON.stringify(data.user));
                // Using window.location.href instead of router.redirect to refresh the page
                // so that components like Navbar update too
                window.location.href = next;
            })
            .catch((err) => {
                if (err.response) {
                    registerError = "";
                    for (let message of err.response.data.message[0].messages) {
                        registerError += `${message.message}\n`;
                    }
                } else registerError = err;
            });
    }
</script>

<!-- This is an example component -->
<div class="font-sans">
  <div
    class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 "
  >
    <div class="relative sm:max-w-sm w-full">
      <div
        class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"
      />
      <div
        class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"
      />
      <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
        <label
          for=""
          class="block text-sm text-gray-700 text-center font-semibold"
        >
          Registrazione
        </label>
        <form class="mt-10" on:submit|preventDefault={register} in:fade>
          <div>
            <input
              type="text"
              bind:value={username}
              placeholder="Username"
              class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>

          <div class="mt-7">
            <input
              type="email"
              bind:value={email}
              placeholder="E-mail"
              class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>

          <div class="mt-7">
            <input
              type="password"
              bind:value={password}
              placeholder="Password"
              class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>

          <div class="mt-7 flex">
            <div class="w-full text-right">
              <a
                class="underline text-sm text-gray-600 hover:text-gray-900"
                use:link
                href="/"
              >
                Torna alla Home
              </a>
            </div>
          </div>

          <div class="mt-7">
            <button
              class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
            >
              Registrati
            </button>
          </div>

          <div class="mt-7">
            <div class="flex justify-center items-center">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="w-full text-sm text-gray-600"
                >Sei già registrato?</label
              >
              <a
                class="w-full text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                use:link
                href="/login"
              >
                Torna a Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

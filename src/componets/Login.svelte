<script lang="ts">
    import { link } from "svelte-spa-router";

    import { fade } from "svelte/transition";
    import { getContext } from "svelte";
    import axios from "axios";

    export let next: string = "/posts";
    const apiUrl: string = getContext("http://localhost:1337");

    let loginError: string | null = null;

    let username = "";
    let password = "";

    function login() {
        username = username.trim();
        password = password.trim();

        if (!username || !password) {
            loginError = "Controlla tutti i campi!";
            return;
        }
        loginError = null;

        axios
            .post(apiUrl + "/auth/local", {
                identifier: username,
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
                    loginError = "";
                    for (let message of err.response.data.message[0].messages) {
                        loginError += `${message.message}\n`;
                    }
                } else loginError = err;
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
          Login
        </label>
        <form method="#" action="#" class="mt-10">
          <div>
            <input
              type="username"
              placeholder="Username"
              class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
            />
          </div>

          <div class="mt-7">
            <input
              type="password"
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
              Login
            </button>
          </div>

          <div class="mt-7">
            <div class="flex justify-center items-center">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="w-full text-sm text-gray-600"
                >Non sei ancora registrato?</label
              >
              <a
                class="w-full text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                use:link
                href="/register"
              >
                REGISTRATI
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

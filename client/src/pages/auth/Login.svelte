<script>
    import {Link} from "svelte-navigator"
    import ForgotPassword from "./ForgotPassword.svelte"
    import {BASE_URL} from "../../../stores/globals.js";

    let isVisible = false

    export const recoverPasswordButton = () => {
        isVisible = true
    }
    let email = ""
    let password = ""
    const login = async () => {
        await fetch(`${$BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            credentials: "include"
        })
        location.reload()
    }


</script>

<div class="container">
    <h1>Login</h1>
    <form on:submit|preventDefault={login}>
        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="Bob@mail.com" type="email">

        <label for="password">Password</label>
        <input bind:value={password} autocomplete="current-password" id="password" name="password" placeholder="*******" type="password">
        <button type="submit">Login</button>
    </form>
    <h3>Not a user?</h3>
    <p>Sign up
        <Link to="/auth/signup">here!</Link>
    </p>
    <br>
    <hr>

    {#if !isVisible}
        <button type="button" class="recover-btn" on:click="{recoverPasswordButton}">Forgot password?</button>
    {/if}

    {#if isVisible}
        <br>
        <div>
            <ForgotPassword/>
        </div>
    {/if}

</div>


<style lang="scss">
  .container {
    margin: auto;
    width: 25%;
    text-align: center;

    h1 {
      margin: 1em 0;
    }

  }

  .recover-btn {
    margin-top: 0.75em;
    padding: 1em 2.25em;
    width: 100%;

    border: 1px solid #ccc;
    background-color: transparent;
  }

  input[type=text],
  input[type=password],
  input[type=email] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button[type=submit] {
    width: 100%;
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
</style>

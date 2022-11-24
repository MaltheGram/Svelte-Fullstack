<script>
    import {Link, navigate} from "svelte-navigator"
    import {token} from "../../../stores/globals.js"

    import ForgotPassword from "./ForgotPassword.svelte"
    import {BASE_URL} from "../../../stores/globals.js"
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "0",
        "timeOut": "9000",
        "showMethod": "fadeIn",
        "extendedTimeOut": "1000",
    }


    let isVisible = false
    const recoverPasswordButton = () => {
        isVisible = true
    }
    let email = ""
    let password = ""
    const login = async () => {
        const response = await fetch(`${$BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            credentials: "include"
        })
        if (response.status === 200){
            //TODO: Rather do this with a truly random number, and a hash value
            const secretTokenValue = Math.floor(Math.random() * 25).toString()
            localStorage.setItem("token", secretTokenValue)
            token.set(localStorage.getItem("token"))
            navigate("/memes", {replace:true})
            location.reload()
        } else
        {
            response.status === 404
            toastr["error"]("Login failed.<br>Email or password was incorrect.<br>Please try again")
        }
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
  @import "../../styles/forms.css";

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
</style>

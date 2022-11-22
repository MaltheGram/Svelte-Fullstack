<script>
    import {Link} from "svelte-navigator"
    import ForgotPassword from "./ForgotPassword.svelte"
    import Form from "../../components/Form.svelte";
    import toastr from "toastr";


    let isVisible = false

    export const recoverPasswordButton = () => {
        isVisible = true
    }
    const successMessage = () => {
        toastr["success"]("You successfully logged in", "Success ✅")
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }


</script>

<div class="container">
    <h1>Login</h1>
    <Form
            action="/auth/login"
            method="POST"
            userAction="Login"
    />
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
</style>

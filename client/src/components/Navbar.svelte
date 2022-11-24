<script>
    import {Router, Link} from "svelte-navigator";
    import {onMount} from "svelte";
    import {BASE_URL} from "../../stores/globals.js";
    import {clearToken} from "../scripts/exports.js";

    export let userRole = ""
    export let userName = "Not logged in"
    export let isLoggedIn = false

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
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

    export const userStatus = () => {
        fetch(`${$BASE_URL}/api/session`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then((data) => {
                if (data.data.isLoggedIn) {
                    userRole = data.data.userRole
                    userName = data.data.user
                    isLoggedIn = true
                    toastr["success"](`Welcome ${userName}`, "Logged in")
                }
            })
    }
    const logOut = () => {
        fetch(`${$BASE_URL}/api/sessiondestroy`,{
            method: "GET",
            credentials: "include"
        })
        clearToken()
        setTimeout(() => {
                location.reload()
            }, 1000
        )
        toastr["info"]("Logging out...⌛️")

    }
    const notImplementedYet = () => {
        // To show that user profile is not implemeted when clicking on user profile name
        toastr["warning"]("User profile not implemented.. Redirecting to root")
    }

    onMount(
        userStatus
    )

</script>

<Router>
    {#if isLoggedIn}
    <nav class="navbar">
        <Link to="/">Home</Link>
        <Link on:click={notImplementedYet} to="/">Welcome <b>{userName}</b></Link>
        <Link to="/memes">Meme me!</Link>
        <Link on:click={logOut} to="/">Logout</Link>
    </nav>
    {:else}
    <nav class="navbar">
        <Link to="/">Home</Link>
        <Link to="/auth/login">Login &#128100;</Link>
    </nav>
        {/if}
</Router>
<style lang="scss">
  nav {
    background-color: #404046;
    height: 3.35rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      color: aliceblue;
    }
  }
</style>

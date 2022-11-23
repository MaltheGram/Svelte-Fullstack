<script>
    import {Router, Link} from "svelte-navigator";
    import {onMount} from "svelte";
    import {BASE_URL} from "../../stores/globals.js";

    let userRole = ""
    let userName = "Not logged in"
    let isLoggedIn = false

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


    const userStatus = () => {
        fetch(`${$BASE_URL}/api/session`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then((data) => {
                if (data.data.isLoggedIn) {
                    console.log("In if")
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
        setTimeout(() => {
                location.reload()
            }, 1000
        )
        toastr["info"]("Logging out...⌛️")

    }
    onMount(
        userStatus
    )

</script>

<Router>
    <nav class="navbar">
        <Link to="/">Home</Link>
        <Link to="/auth/login">Login &#128100;</Link>
        {#if isLoggedIn === false}
            <span>{userName}</span>
        {:else}
            <span>Welcome <b>{userName}<b/></span>
            <Link on:click={logOut} to="/">Logout</Link>
        {/if}
    </nav>
</Router>
<style lang="scss">
  nav {
    background-color: #404046;
    height: 3.35rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
      margin: auto;
      color: aliceblue;
    }
  }
</style>
<script>
    import {Route, Router} from "svelte-navigator";
    import {token} from "../../stores/globals.js";

    import Login from "../pages/auth/Login.svelte";
    import Signup from "../pages/auth/Signup.svelte";
    import Memes from "./Memes.svelte";

    $: isAuthenticated = $token
    const isLoggedIn = isAuthenticated


</script>


<Router>
    <Route path="/auth/login">
        <Login/>
    </Route>
    <Route path="/auth/signup">
        <Signup/>
    </Route>
    {#if isLoggedIn}
    <Route path="/memes">
        <Memes/>
    </Route>
    {/if}
</Router>

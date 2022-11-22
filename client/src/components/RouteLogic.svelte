<script>
    import {Route, Router} from "svelte-navigator";
    import Login from "../pages/auth/Login.svelte";
    import Signup from "../pages/auth/Signup.svelte";
</script>

<Router>
    <Route path="/auth/login">
        <Login/>
    </Route>
    <Route path="/auth/signup">
        <Signup/>
    </Route>
</Router>
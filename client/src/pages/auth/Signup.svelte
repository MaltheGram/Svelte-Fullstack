<script>
    import {BASE_URL} from "../../../stores/globals.js";
    let userName = ""
    let email = ""
    let password = ""
    const signUp = () => {
        console.log("Before feth")
        fetch(`${$BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,userName,password}),
            credentials: "include"
        })
        console.log("After fetch")
    }

</script>

<div class="container">
    <h1>Signup</h1>
    <form on:submit|preventDefault={signUp}>
        <label for="name">Name</label>
        <input bind:value={userName} id="name" name="name" placeholder="Bob" type="text">

        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="Bob@mail.com" type="email">

        <label for="password">Password</label>
        <input bind:value={password} autocomplete="current-password" id="password" name="password" placeholder="*******" type="password">

        <button type="submit">Signup</button>

    </form>
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
</style>
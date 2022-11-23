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
  .container {
    margin: auto;
    width: 25%;
    text-align: center;

    h1 {
      margin: 1em 0;
    }
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
<script>
    export let method = ""
    export let userAction = ""
    export let action = ""
    export let showUser = true

    const showUserNameInput = () => {
        action === "/auth/login" ? showUser = false : showUser = true
    }
    showUserNameInput()

</script>

<form {action} {method}>

    {#if showUser}
    <label for="name">Name</label>
    <input id="name" name="name" placeholder="Bob" value="Bob" type="text">
        {/if}

    <label for="email">Email</label>
    <input id="email" name="email" placeholder="Bob@mail.com" type="email" value="test@test.dk">

    <label for="password">Password</label>
    <input autocomplete="current-password" id="password" name="password" placeholder="*******" type="password"
           value="123">

    <button type="submit">{userAction}</button>
</form>


<style lang="scss">
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
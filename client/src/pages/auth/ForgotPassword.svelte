<script>
    import {BASE_URL} from "../../../stores/globals.js";
    toastr.options = {
        "closeButton": false,
        "positionClass": "toast-bottom-center",
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

    let email = ''
    const submit = async () => {
        await fetch(`${$BASE_URL}/api/recovery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email}),
            credentials: "include"
        })
        toastr["info"](`Dear ${email}<br>Password recovery request has been sent!`)

    }

</script>

<div>
    <form on:submit|preventDefault={submit}>
        <label for>Email</label>
        <input bind:value={email} id="email" placeholder="example@mail.com" type="email">
        <button type="submit">Please recover my password!</button>
    </form>
</div>

<style lang="scss">
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
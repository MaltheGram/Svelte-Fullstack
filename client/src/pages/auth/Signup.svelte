<script>
    import Form from "../../components/Form.svelte";

</script>

<div class="container">
    <h1>Signup</h1>
    <Form
            action="/auth/signup"
            method="POST"
            userAction="Sign up"
    />
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
</style>
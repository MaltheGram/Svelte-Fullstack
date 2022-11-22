<script>
    import {onMount} from "svelte";
    const memeUrl = "https://meme-api.herokuapp.com/gimme"
    let alt
    let src
    const nextMemeTimer = 20000

    const fetchMemes = () => {
        fetch(memeUrl)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                src = data.url
                alt = data.title
            })
    }
    const changeImageInterval = () => {
        setInterval(() => {
            fetchMemes()
        }, nextMemeTimer)
    }
    const changeImageBtn = () => {
        fetchMemes()
    }
    onMount(
        changeImageInterval
    )
    changeImageBtn

</script>


<div class="container">
    <img alt="{alt}" class="image-crop" src="{src}">
    <button class="next-btn" id="next-btn" on:click={changeImageBtn}>Show me meme
    </button>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-content: center;

    .image-crop {
      max-height: 80vh;
    }

    .next-btn {
      background-color: cornflowerblue;
      color: aliceblue;
      border: 2px solid black;
      position: absolute;
      margin-top: 5em;
      bottom: 1.25em;
      padding: 1.25em 2.5em;
    }
  }


</style>
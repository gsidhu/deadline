<script>
  let count = 0
  const increment = () => {
    count += 1
  }
  export const reset = () => {
    count = 0
  }
</script>

<button on:click={increment}>
  count is {count}
</button>

<script>
  import {dailyTarget, deadlineDate, headline, wordCountEditorToggle, wordsWritten, wordsOrPages, totalWords, readOrWrite} from '../stores'

  function reset() {
    $wordCountEditorToggle = false
    $wordsWritten = 0
    $wordsOrPages = "words"
    $totalWords = 5000
    $dailyTarget = 1000
    $deadlineDate = "2022-10-30"
    $headline = "Let's do this!"
    $readOrWrite = "write"
  }
</script>

<!-- Footer -->
<footer class="text-muted py-5">
  <div class="container">
    <p class="float-end mb-0">I love you.</p>
    <p class="mb-0">You got this.</p>
    <p class="text-center mb-0 pt-5 pb-0" on:click={reset} style="text-decoration: underline; cursor: pointer;"><small>reset.</small></p>
  </div>
</footer>
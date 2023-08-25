<script>
  import {dailyTarget, deadlineDate, headline, wordCountEditorToggle, wordsWritten, wordsOrPages, totalWords, readOrWrite} from '../stores'

  function reset() {
    // const presentDate = new Date()
    // const presentYear = presentDate.getFullYear()
    // const presentMonth = presentDate.getMonth()
    // var defaultDeadline = ''
    // if (presentMonth < 11) {
    //   defaultDeadline = presentYear + '-' + (presentMonth+2) + '-30'
    // } else {
    //   defaultDeadline = (presentYear+1) + '-3' + '-30'
    // }
    let daysInMs = 50 * 24 * 60 * 60 * 1000;
    let deadline = Date.now() + daysInMs;
    let defaultDeadline = new Date(deadline).toISOString().slice(0, 10);
    $wordCountEditorToggle = false
    $wordsWritten = 0
    $wordsOrPages = "words"
    $totalWords = 5000
    $dailyTarget = 1000
    $deadlineDate = defaultDeadline
    $headline = "💪 Let's do this!"
    $readOrWrite = "write"
  }
</script>

<!-- Footer -->
<footer class="text-muted py-5">
  <div class="container">
    <p class="float-end mb-0">I love you.</p>
    <p class="mb-0">You got this.</p>
    <div class='d-flex justify-content-between pt-3'>
      <p class="d-flex" on:click={reset} style="text-decoration: underline; cursor: pointer;"><small>reset.</small></p>
      <a class="d-flex text-muted" href="mailto:deadline@thatgurjot.com" style="text-decoration: underline;"><small>report error.</small></a>
    </div>
  </div>
</footer>
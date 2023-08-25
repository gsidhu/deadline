<script>
  import Header from './lib/Header.svelte'
  import Calendar from './lib/Calendar.svelte'
  import Modal from './lib/Modal.svelte'
  import Footer from './lib/Footer.svelte'
  import { fade } from 'svelte/transition';
  import {dailyTarget, deadlineDate, wordCountEditorToggle, wordsWritten, wordsOrPages, totalWords, readOrWrite} from './stores'

  let heroResponseMsg = "Yay! Way to go! <3"
  let heroResponseToggle = false
  let showModal = true

  $: if ($wordsWritten === 0) {
    heroResponseToggle = false
  } else if ($wordsWritten === NaN || $wordsWritten === null) {
    $wordsWritten = 0
  }
  
  let diffTime, deadline
  const date = new Date();
  $: deadline = new Date($deadlineDate);
  $: diffTime = Math.abs(deadline - date);
  $: daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let wordsLeft
  $: wordsLeft = $totalWords - $wordsWritten
  
  function celebrate() {
    let xray = Math.random()
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: xray > 0.7 | xray < 0.3 ? 0.5 : xray }
    });
  }

  function addWords() {
    $wordsWritten = parseInt($wordsWritten) + parseInt($dailyTarget)
    heroResponseToggle = !heroResponseToggle
    celebrate()
  }

  function noWords() {
    const rando = Math.random()
    let msg = ''
    if (rando < 0.33) {
      msg = "You are amazing and nothing will change that <3"
    } else if (rando < 0.66 && rando >= 0.33) {
      msg = "It's okay to rest sometimes :)"
    } else {
      msg = "Issokay bb you got this :)"
    }
    heroResponseMsg = msg
    heroResponseToggle = !heroResponseToggle
  }

  function changeWordCount() {
    $wordCountEditorToggle = !JSON.parse($wordCountEditorToggle)
    // heroResponseToggle = false
  }

  let progressDone, progressLeft

  $: progressDone = 100*parseInt($wordsWritten) / parseInt($totalWords)
  $: progressLeft = (100 - progressDone > 0) ? 100 - progressDone : 0
</script>

<main>
  <Header openModal={showModal} />
  <!-- Hero container -->
  <section class="py-3 text-center container">
    <div class="row py-lg-4">
      <div class="col-xl-6 col-lg-9 mx-auto">
        {#if heroResponseToggle === true}
        <h1 class="fw-light py-2" transition:fade={{delay: 100, duration: 500}}>{ heroResponseMsg }</h1>
        {:else}
        <h1 class="fw-light py-2" id="msg" transition:fade="{{delay: 0, duration: 0}}">Did you {$readOrWrite} {$dailyTarget} {$wordsOrPages} today?</h1>
        {/if}
        <!-- Yes / No buttons -->
        <p class="py-2" id="yes-no-buttons">
          <button class="btn btn-success my-2 mx-3" style="width: 7rem; line-height: 2rem;" disabled={heroResponseToggle} on:click={addWords}>Yes!</button>
          <button href="#" class="btn btn-warning my-2 mx-3" style="width: 7rem; line-height: 2rem;" disabled={heroResponseToggle} on:click={noWords}>No</button>
        </p>
        
        <!-- Progress bars -->
        {#if progressDone > 0 }
        <div class="progress" style="height: 20px; line-height: 20px; font-size: 16px;">
          <div id="progress-done" class="progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-label="Segment one" style="width: {progressDone}%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">{(progressDone).toFixed(1) + '%'}</div>
          <div id="progress-left" class="progress-bar-striped bg-warning progress-bar-animated" role="progressbar" aria-label="Segment two" style="width: {progressLeft}%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{(progressLeft).toFixed(1) + '%'}</div>
        </div>
        {:else}
        <div class="progress" style="height: 20px; line-height: 20px; font-size: 16px;">
          <div id="progress-done" class="progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Segment one" style="width:0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        {/if}

        {#if (100 - progressDone > 0) }
        <p id="words-msg" class="lead text-muted py-2">You have finished {$wordsWritten} {$wordsOrPages} so far and have {wordsLeft} {$wordsOrPages} left out of {$totalWords}.</p>
        {:else}
        <p id="words-msg" class="lead text-muted py-2">You have finished {$wordsWritten} {$wordsOrPages} so far, which is {$wordsWritten - $totalWords} {$wordsOrPages} more than your target of {$totalWords}!</p>
        {/if}
      </div>
    </div>

    <!-- Change word count and Celebrate buttons -->
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col my-1">
        {#if JSON.parse($wordCountEditorToggle) === true}
        <div id="word-input" class="col my-1 align-self-center">
          <form class="mx-2">
            <input id="word-count-input" type="number" style="width: 145px" bind:value="{$wordsWritten}">
            <svg on:click={changeWordCount} style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>
          </form>
        </div>
        {:else}
        <button id="change-word-count-btn" class="btn btn-primary mx-2" on:click={changeWordCount}>Change count</button>
        {/if}
      </div>
      <div class="col my-1 align-self-center">
        <button id='celebrate-btn' class='btn btn-danger' on:click={celebrate}>Celebrate!</button>
      </div>
    </div>
  </section>

  <Calendar {daysLeft} />

  <Modal open={showModal} {daysLeft} />

  <Footer />
</main>

<style>
#progress-done {
  color: white;
}  
</style>

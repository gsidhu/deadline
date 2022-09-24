<script>
  export let open = true;

  const modalClose = () => {
    // open = false;
  }

  import {dailyTarget, deadlineDate, wordsOrPages, totalWords, headline, readOrWrite} from '../stores'
</script>

<!-- Editing modal -->
{#if open === true}
<div class="modal fade" id="settingsModal" tabindex="-1" aria-labelledby="settingsModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="settingsModal">Edit parameters</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={modalClose}></button>
      </div>
      <div class="modal-body">
        <div id="word-input" class="col my-1 align-self-center">
          <form class="mx-2">
            <p class="mb-1">Deadline</p>
            <input id="deadline-input" placeholder="2022-12-30" bind:value="{$deadlineDate}">
            
            <p class="mb-1 mt-3">Target count</p>
            <input id="target-count-input" type="number" placeholder="25000" bind:value="{$totalWords}">
            
            <p class="mb-1 mt-3">Daily target</p>
            <input id="daily-target-input" type="number" placeholder="1000" bind:value="{$dailyTarget}">
            
            <p class="mb-1 mt-3">Headline</p>
            <input id="headline-input" type="text" placeholder="Let's goooooo!" bind:value="{$headline}">
            
            <p class="mb-1 mt-3">Pages or words</p>
            <select name="words-pages" id="words-pages" bind:value="{$wordsOrPages}">
              <option value="pages">Pages</option>
              <option value="words">Words</option>
            </select>
            
            <p class="mb-1 mt-3">Reading or writing</p>
            <select name="read-write" id="read-write" bind:value="{$readOrWrite}">
              <option value="read">Reading</option>
              <option value="write">Writing</option>
            </select>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={modalClose}>Close</button>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
</style>
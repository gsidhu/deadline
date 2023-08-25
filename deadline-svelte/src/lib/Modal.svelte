<script>
  import {dailyTarget, deadlineDate, wordsOrPages, totalWords, readOrWrite} from '../stores';
  export let open = true;
  export let daysLeft;
  import { onMount } from 'svelte';
  let amount = $totalWords;
  let byOrFor = 'by';
  let daysWeeks = 'days';
  let daysWeeksNum = daysLeft;

  function calculateDeadlineDate() {
    console.log("calculating");
    let now = Date.now();
    console.log(now);
    if (daysWeeks === 'days') {
      let days = daysWeeksNum;
      let daysInMs = days * 24 * 60 * 60 * 1000;
      let deadline = now + daysInMs;
      $deadlineDate = new Date(deadline).toISOString().slice(0, 10);
    } else if (daysWeeks === 'weeks') {
      let weeks = daysWeeksNum;
      let weeksInMs = weeks * 7 * 24 * 60 * 60 * 1000;
      let deadline = now + weeksInMs;
      $deadlineDate = new Date(deadline).toISOString().slice(0, 10);
    }
    console.log($deadlineDate);
    calculateTargets();
  }

  function calculateTargets() {
    if (byOrFor === 'by') {
      $totalWords = amount;
    } else {
      $dailyTarget = amount;
      $totalWords = amount * daysWeeksNum;
    }
  }

  $: amount && calculateTargets();

  function customInputSelector(el) {
    // if el is of type text input, select all text on click
    if (el.target.tagName === "INPUT") {
      el.target.select();
    }
    if (el.target.id === "read-write-custom-input") {
      // @ts-ignore
      document.getElementById("readWriteCustomRadio").checked = true;
    }
    if (el.target.id === "words-pages-custom-input") {
      // @ts-ignore
      document.getElementById("wordsPagesCustomRadio").checked = true;
    }
    calculateTargets();
  }

  onMount(() => {
    // document.getElementById('read-write-custom-input').value = $readOrWrite;
  })
</script>

<!-- Editing modal -->
{#if open === true}
<div class="modal fade" id="settingsModal" tabindex="-1" aria-labelledby="settingsModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="settingsModal">My Goal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="word-input" class="col my-1 align-self-center">
          <form class="mx-2">
            <div class="col">
              <p>I want to</p>
              <!-- Action -->
                <div id="read-write-selector" class="my-3 btn-group" role="group" aria-label="Read or write selector" on:click={(e) => customInputSelector(e)}>
                  <input type="radio" class="btn-check" name="readWriteRadios" id="readRadio" autocomplete="off">
                  <label class="btn btn-outline-primary" for="readRadio" on:click={() => ($readOrWrite = 'read')}>read</label>
                  <input type="radio" class="btn-check" name="readWriteRadios" id="writeRadio" autocomplete="off">
                  <label class="btn btn-outline-primary" for="writeRadio" on:click={() => ($readOrWrite = 'write')}>write</label>
                  <!-- <input type="radio" class="btn-check" name="readWriteRadios" id="drinkRadio" autocomplete="off">
                  <label class="btn btn-outline-primary" for="drinkRadio" on:click={() => ($readOrWrite = 'drink')}>drink</label> -->
                  <input type="radio" class="btn-check" name="readWriteRadios" id="readWriteCustomRadio" autocomplete="off" checked>
                  <label class="btn btn-outline-danger" for="readWriteCustomRadio" style="cursor: text !important;">
                    <input type="text" id="read-write-custom-input" class="" placeholder="drink..." bind:value="{$readOrWrite}" on:click={(e) => customInputSelector(e)}>
                  </label>
                </div>
              <!-- Action as a dropdown -->
              <!-- <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {$readOrWrite}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li class="dropdown-item" on:click={() => ($readOrWrite = 'read')}>read</li>
                  <li class="dropdown-item" on:click={() => ($readOrWrite = 'write')}>write</li>
                  <li class="dropdown-item" on:click={() => ($readOrWrite = 'drink')}>drink</li>
                  <li class="dropdown-item">✏️
                    <input type="text" id="read-write-custom-input" class="" placeholder="sleep..." bind:value="{$readOrWrite}">
                  </li>
                </ul>
              </div> -->
              <!-- Amount -->
                <div class="my-3">
                  <input id="daily-target-input" type="text" placeholder="{$totalWords}" bind:value="{amount}" 
                  on:click={(e) => customInputSelector(e)}>
                </div>
              <!-- Unit of Object -->
                <div id="words-pages-selector" class="my-3 btn-group" role="group" aria-label="Words or pages selector" on:click={(e) => customInputSelector(e)}>
                  <input type="radio" class="btn-check" name="wordsPagesRadios" id="wordsRadio" autocomplete="off">
                  <label class="btn btn-outline-primary" for="wordsRadio" on:click={() => ($wordsOrPages = 'words')}>words</label>
                  <input type="radio" class="btn-check" name="wordsPagesRadios" id="pagesRadio" autocomplete="off">
                  <label class="btn btn-outline-primary" for="pagesRadio" on:click={() => ($wordsOrPages = 'pages')}>pages</label>
                  <!-- <input type="radio" class="btn-check" name="wordsPagesRadios" id="booksRadio" autocomplete="off">
                  <label class="btn btn-outline-primary" for="booksRadio" on:click={() => ($wordsOrPages = 'glasses of water')}>glasses of water</label> -->
                  <input type="radio" class="btn-check" name="wordsPagesRadios" id="wordsPagesCustomRadio" autocomplete="off" checked>
                  <label class="btn btn-outline-danger" for="wordsPagesCustomRadio" style="cursor: text !important;">
                    <input type="text" id="words-pages-custom-input" class="" placeholder="glasses of water" bind:value="{$wordsOrPages}" on:click={(e) => customInputSelector(e)}>
                  </label>
                </div>
              <!-- Time -->
              <div class="my-3 btn-group" id="time-type-selector" role="group" aria-label="Time type selector">
                <input type="radio" class="btn-check" name="timeTypeRadios" id="byRadio" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="byRadio" on:click={() => (byOrFor = "by") && calculateTargets()}>by</label>
                <input type="radio" class="btn-check" name="timeTypeRadios" id="InTheNextRadio" autocomplete="off">
                <label class="btn btn-outline-primary" for="InTheNextRadio" on:click={() => (byOrFor = "for") && calculateTargets()}>everyday for the next</label>
              </div>
              {#if byOrFor === "by"}
              <div class="my-3">
                <input type="text" id="deadline-input" placeholder="{$deadlineDate}" bind:value="{$deadlineDate}" on:click={(e) => customInputSelector(e)}>
                <p class="my-3">at</p>
                <p>
                  <input id="daily-target-input" type="text" placeholder="{$dailyTarget}" bind:value="{$dailyTarget}" on:click={() => calculateTargets()}>
                  {$wordsOrPages} per day.
              </p>
              </div>
              {:else if byOrFor === "for"}
              <div class="my-3">
                <input id="days-input" type="text" placeholder="{daysLeft}" bind:value="{daysWeeksNum}" on:change={() => calculateDeadlineDate()} on:click={(e) => customInputSelector(e)}>
              </div>
              <div id="time-selector" class="my-3 btn-group" role="group" aria-label="Time selector">
                <input type="radio" class="btn-check" name="timeRadios" id="daysRadio" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="daysRadio" on:click={() => (daysWeeks = 'days') && (calculateDeadlineDate())}>days</label>
                <input type="radio" class="btn-check" name="timeRadios" id="weeksRadio" autocomplete="off">
                <label class="btn btn-outline-primary" for="weeksRadio" on:click={() => (daysWeeks = 'weeks') && (calculateDeadlineDate())}>weeks</label>
              </div>
              {/if}
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
  #read-write-custom-input,
  #words-pages-custom-input {
    max-width: 100px !important;
    all: unset;
  }
  #target-count-input,
  #deadline-input,
  #daily-target-input {
    max-width: 100px !important;
  }
</style>
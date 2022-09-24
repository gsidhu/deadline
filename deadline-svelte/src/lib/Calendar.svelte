<script>
  import { deadlineDate } from "../stores";
	import { onMount } from 'svelte';

  export let daysLeft
  
  let compactCal = false

  let myArray = []
  let today = new Date()
  let presentMonth = today.getMonth()
  let presentYear = today.getFullYear()

  function addCalendars() {
    let deadlineMonth = parseInt($deadlineDate.split('-')[1])
    let startYear = today.getFullYear()
    let endYear = parseInt($deadlineDate.split('-')[0])
    let monthsAdded = 0

    // calculate total months
    let totalMonths = 0
    if (startYear === endYear) {
      totalMonths = deadlineMonth - presentMonth
    } else {
      totalMonths = 12*(endYear - startYear) + deadlineMonth - presentMonth
    }

    let tempArray = []
    let firstYearMonths = 12 - presentMonth
    while (monthsAdded < totalMonths) {
      let monYe = ''
      let tempYear, tempMonth
      // add months for present year
      if ((presentMonth + monthsAdded + 1) <= 12) {
        tempYear = startYear
        tempMonth = (presentMonth + monthsAdded + 1) // +1 to adjust for array start from 0
        monYe = tempYear + '-' + tempMonth
      }
      // add months for next year(s)
      else if (((presentMonth + monthsAdded)%12 + 1) <= 12+firstYearMonths) {
        tempYear = startYear + Math.floor(presentMonth + monthsAdded)/12
        tempMonth = ((presentMonth + monthsAdded)%12 + 1) // +1 to adjust for array start from 0
        monYe = tempYear + '-' + tempMonth
      }
      
      monthsAdded += 1

      let mY = monYe.split('-')
      let generatedCal =  generateMonth(parseInt(mY[1]), parseInt(mY[0]), compactCal)
      let temp = {
        'id': monYe,
        'header': generatedCal[1],
        'table': generatedCal[0]
      }
      tempArray.push(temp)
    }
    return tempArray
  }

  function colorDeadlineDate(on) {
    // colour deadline date
    let deadline = $deadlineDate
    let items = deadline.split('-')
    if (items[1][0] === "0") { items[1] = items[1][1]}
    if (items[2][0] === "0") { items[2] = items[2][1]}
    deadline = items[0] + "-" + items[1] + "-" + items[2]
    try {
      let el = document.getElementsByClassName(deadline)[0]
      if (on===true) { el.style.backgroundColor = "gainsboro" }
      else { el.style.backgroundColor = "white" }
    } catch(e) {}
  }

  function addColor() {
    let numTables = document.getElementsByClassName('html-calendar').length
    let currentMonthTable = document.getElementsByClassName('html-calendar')[0]
    // clear the intermitten deadline colours before painting
    for (var i=0; i < numTables; i++) {
      let MonthTable = document.getElementsByClassName('html-calendar')[i]
      try {colorDates(MonthTable, [[1,31,"white","black"]])} catch (e) {}
    }
    // paint new colours
    colorDates(currentMonthTable, [[1,today.getDate()-1,"red","white"],[today.getDate(), today.getDate(),"green","white"]])
    colorDeadlineDate(true)
  }

  onMount(() => {
    addColor()
  });

  let childDaysLeft = 0
  // reactive block
  // runs every time daysLeft changes value
  $: if (daysLeft != childDaysLeft) {
    let deadlineMonth = parseInt($deadlineDate.split('-')[1])
    let deadlineYear = parseInt($deadlineDate.split('-')[0])
    if (deadlineYear === presentYear) {
      if (deadlineMonth >= presentMonth) {
        myArray = addCalendars()
        try { addColor() } catch(e) {}
      }
    } else if (deadlineYear > presentYear) {
      if (deadlineMonth <= 12) {
        myArray = addCalendars()
        try { addColor() } catch(e) {}
      }
    }
    childDaysLeft = daysLeft
  }

  function addDeadlineColor(node) {
    // have to mandatorily accept the `node` as input
    // this function is called when the month table element is created (`use:function`)
    try { addColor() } catch(e) {}
  }
</script>

<!-- Calendar -->
<div class="py-5 bg-light">
  <div class="container">
    <p class="text-center lead text-muted">You have <span class="underline">{daysLeft} days</span> till your deadline ({$deadlineDate}).</p>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center" id="insert-calendars">
      {#each myArray as month}
        <div>
          <div class="card shadow-sm mx-1">
            <div class="html-calendar card-body" id={month.id} use:addDeadlineColor>
              {@html month.header.outerHTML}
              {@html month.table.outerHTML}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
.underline {
  text-decoration: underline;
}
</style>
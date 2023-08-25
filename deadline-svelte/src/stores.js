import { writable } from 'svelte/store'

// Get the value out of storage on load.
const storedwordCountEditorToggle = localStorage.wordCountEditorToggle
const storedwordsWritten = localStorage.wordsWritten
const storedwordsOrPages = localStorage.wordsOrPages
const storedtotalWords = localStorage.totalWords
const storeddailyTarget = localStorage.dailyTarget
const storeddeadlineDate = localStorage.deadlineDate
const storedheadline = localStorage.headline
const storedreadOrWrite = localStorage.readOrWrite

// Set the stored value or a sane default.
export const wordCountEditorToggle = writable(storedwordCountEditorToggle || false)
export const wordsWritten = writable(storedwordsWritten || 0)
export const wordsOrPages = writable(storedwordsOrPages || "words")
export const totalWords = writable(storedtotalWords || 5000)
export const dailyTarget = writable(storeddailyTarget || 1000)

// Set the default deadline to 50 days from now.
let daysInMs = 50 * 24 * 60 * 60 * 1000;
let deadline = Date.now() + daysInMs;
let defaultDeadline = new Date(deadline).toISOString().slice(0, 10);
export const deadlineDate = writable(storeddeadlineDate || defaultDeadline)
export const headline = writable(storedheadline || "Let's do this!")
export const readOrWrite = writable(storedreadOrWrite || "write")

// Anytime the store changes, update the local storage value.
wordCountEditorToggle.subscribe((value) => localStorage.wordCountEditorToggle = JSON.parse(value))
wordsWritten.subscribe((value) => localStorage.wordsWritten = value)
wordsOrPages.subscribe((value) => localStorage.wordsOrPages = value)
totalWords.subscribe((value) => localStorage.totalWords = value)
dailyTarget.subscribe((value) => localStorage.dailyTarget = value)
deadlineDate.subscribe((value) => localStorage.deadlineDate = value)
headline.subscribe((value) => localStorage.headline = value)
readOrWrite.subscribe((value) => localStorage.readOrWrite = value)
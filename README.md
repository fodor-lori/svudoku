# Svudoku

![image](https://github.com/user-attachments/assets/d241d760-f3e8-4592-97f8-5108509e86dd)

Try it online here: **[Live Demo](https://svudoku.vercel.app/)**

## SvelteHack 2024

This application has been developed for **[SvelteHack 2024](https://hack.sveltesociety.dev/2024)**, using primarily Svelte 5 and SvelteKit. Honorable mentions go to _Tailwind CSS_ and _shadcn-svelte_ for not having to worry about UI components and styling too much, and _Vercel_ for the quick and simple demo deployment.

Yes, the name comes from Svelte + Sudoku. Svelte is a given (seriously, it's fantastic), but why Sudoku?

## Motivation

Lately, I’ve been playing a fair amount of Killer Sudoku online, which is a variant of Sudoku with the added twist of starting from an empty grid and sum-based cages that must be filled without repeating digits. I find it very interesting, it's also a great way to pass time while waiting for a five-minute build to complete. However, I'm not that fond of the look and feel of current online Sudoku applications. I've also been experimenting with Svelte and SvelteKit since early 2024, and I _really_ wanted to try Svelte 5 out.

Then, with the announcement of SvelteHack 2024, I decided to build the Sudoku app that _I enjoy_. I also wanted to challenge myself with some less frequently used algorithmic thinking, for which (Killer) Sudoku generation can bring endless thinking and tinkering.

Enjoy!

## Features

- Classic and Killer Sudoku puzzle types
- Cell highlighting\*\*, note-taking, and action history with undo functionality
- Self-made puzzle generation (although it's a basic one)
- Fully playable with keyboard-only controls
- Light/Dark Mode

## Next steps

While I'm satisfied with the current state of Svudoku since the beginning of the hackathon, it's nowhere near perfect. What I plan in the months ahead:

- Fixing bugs!
- Mobile support - sorry mobile users, I couldn't make it responsive in time :'(
- Clean up code (especially state management, bloated components)
- Improve both classic and killer Sudoku generation - the current version is a semi-decent proof of concept, but there's plenty of room for improvement

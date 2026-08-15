# Week 09: React Advanced
 
## Author
- **Name:** Trevor Wachira
- **GitHub:** [@TrevorWachira690](https://github.com/TrevorWachira690)
- **Date:** 08/16/2026
## Project Description
I built a React project covering advanced patterns — `useEffect`, data fetching, React Router, custom hooks, and styling with both CSS Modules and Tailwind CSS — using a real Vite project with `react-router-dom` and Tailwind installed and configured. This was built to teach myself how to run side effects safely with proper cleanup, fetch data from a live API inside React components, turn a single-page app into a multi-page app with client-side routing, extract reusable logic into custom hooks, and build a small shared component library. The CommunityHub Mini-Project itself was a team build, split across teammates via feature branches and pull requests, so this repository focuses on the individual lesson tasks and daily challenges.
 
## Technologies Used
- React
- React Router (react-router-dom)
- Vite
- Tailwind CSS
- CSS Modules
- JavaScript (JSX)
- VSCode
- Git
- GitHub
## Features
- **components/EffectDemoCounter.jsx** - Demonstrates all four `useEffect` patterns from Task 17.1: running after every render, running once on mount, running when a dependency changes, and cleaning up an interval on unmount.
- **components/WindowSize.jsx** - Tracks window dimensions using a `resize` event listener, added and removed correctly via the Effect's cleanup function.
- **components/ThemeToggle.jsx** - Syncs a theme value to localStorage and applies it to `document.body` whenever it changes.
- **components/PostListFetch.jsx** - Fetches posts from JSONPlaceholder directly inside a component using `useEffect`, with explicit `loading` and `error` state.
- **hooks/useFetch.js + components/PostListWithHook.jsx** - A reusable `useFetch` custom hook that wraps the fetch/loading/error pattern, used to re-fetch the same post list with far less code.
- **components/Layout/Layout.jsx, pages/, components/Navigation.jsx** - Full React Router setup: a `Layout` with an `Outlet` for nested routes, Home/Posts/PostDetail/CreatePost/About/NotFound pages, a dynamic `/posts/:postId` route read via `useParams`, and `useNavigate`/`NavLink` for programmatic navigation and active-link styling.
- **components/shared/LoadingSpinner/, components/shared/ErrorMessage/** - Reusable loading and error UI components, including a retry button on the error state.
- **hooks/useLocalStorage.js, hooks/useToggle.js, hooks/useForm.js** - Three custom hooks from Task 18.1, each with a small usage demo (`Settings.jsx`, `ModalDemo.jsx`, `ContactFormWithValidation.jsx`).
- **components/ButtonCssModule.jsx + .module.css** - A Button styled with CSS Modules, showing scoped class names as an alternative to Tailwind.
- **components/CardTailwind.jsx, components/ButtonTailwind.jsx** - The same kind of components restyled using Tailwind utility classes directly in JSX.
- **components/shared/{Button,Input,Card,Modal,Avatar}/** - A small shared component library from Task 18.3, each folder with its own component file and a barrel `index.js`, plus a top-level `components/shared/index.js` exporting all of them together.
- **daily-challenges/Day1_Timer.jsx** *(Daily Challenge)* - A timer with start/stop/reset, using `useEffect` with `setInterval` and proper cleanup so no interval is ever left running in the background.
- **daily-challenges/Day2_ApiSearch.jsx** *(Daily Challenge)* - A debounced search over JSONPlaceholder users, waiting 400ms after the user stops typing before fetching, with a loading state.
- **daily-challenges/Day3_Tabs.jsx** *(Daily Challenge)* - A reusable Tabs component driven entirely by a `tabs` prop array, with a simple fade-in animation on tab switch.
- **daily-challenges/Day4_ProtectedRoute.jsx** *(Daily Challenge)* - A simulated auth system with a login form, an `AuthProvider`/`useAuth` context, a `ProtectedRoute` wrapper that redirects to `/login` when logged out, and a header showing the current username with a logout button.
- **daily-challenges/Day5_UserProfilePage.jsx** *(Daily Challenge)* - A full profile page that fetches a user's info, posts, and todos in parallel with `Promise.all`, then displays them inside the Day 3 Tabs component, with loading and error states.
## How to Run
1. Clone this repository
2. Run `npm install` to install dependencies (React, `react-router-dom`, Tailwind, and their supporting packages)
3. Run `npm run dev` to start the Vite development server
4. Open the local URL shown in the terminal (usually `http://localhost:5173`) in your browser
5. Files under `daily-challenges/` and most files directly under `components/` are standalone demos — import and render them temporarily in `App.jsx` to preview each one individually, since they aren't wired into the main route tree
**Note:** this project intentionally uses Tailwind CSS **v3**, not the current default v4, because v4 removed `tailwind.config.js` and the PostCSS-based setup that this week's lesson documents. If `npm install` ever pulls v4 by mistake, run `npm install -D tailwindcss@3` to correct it.
 
## Lessons Learned
I learnt that `useEffect` always needs to be read as a setup/cleanup pair, not just a block of code that "runs later" — whatever an Effect sets up (an interval, an event listener, a connection) its cleanup function should undo, or the same thing keeps getting re-created every time the Effect re-runs. I learnt why the dependency array isn't a style choice: leaving out a value the Effect actually uses causes stale data, and using an empty array means "run once, on mount, forever." Building a debounced search taught me that a `setTimeout` inside an Effect, cleaned up on every keystroke via `clearTimeout`, is what actually implements debouncing — the timer only survives to fire if the user stops typing for the full delay. On routing, I learnt that `<Outlet />` is what lets a parent Layout route render whatever child route is currently active, and that dynamic segments like `:postId` become readable through `useParams()` without ever being passed down as a prop. Extracting `useFetch`, `useLocalStorage`, `useToggle`, and `useForm` into their own hooks showed me how much repeated `useState`/`useEffect` logic can be pulled out of individual components once a pattern shows up more than once.
 
## Challenges Faced
1. **Tailwind Version Mismatch** - Installing Tailwind fresh pulled in v4 by default, which removed the `npx tailwindcss init` command and the config file structure this lesson's exercises depend on entirely. I had to explicitly install `tailwindcss@3` instead of letting npm resolve the latest version.
2. **Debounce Timing** - My first version of the search fetched on every keystroke, which meant a fast typist could fire off a dozen requests for a single search. Moving the actual fetch to depend on a separately-debounced state value (updated only after a pause in typing) fixed it.
3. **Distinguishing Route Params from Props** - Early on, I expected `PostDetail` to receive `postId` as a prop the way `PostCard` receives `title`/`author`. Understanding that `useParams()` reads it directly from the URL — with no prop-passing involved at all — took a moment to click, since it's a different data flow than everything from Week 8.
 

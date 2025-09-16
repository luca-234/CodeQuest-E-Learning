const header = document.querySelector("header");
// const headerHeight = header.offsetHeight;
const headerContent = `
<h1 class="text-2xl font-bold text-yellow-400">CodeQuest</h1>
           <nav class="hidden md:flex gap-6 text-lg">
                <a href="#"
                    class="hover:text-yellow-300">Home</a>
                <a href="/Pages/About-page/about.html   "
                    class="hover:text-yellow-300">About</a>
                <a href="/Pages/Games-preview/preview.html"
                    class="hover:text-yellow-300">Games</a>
                <a href="/Pages/Dashboard/Dashboard.html"
                    class="hover:text-yellow-300">Profile</a>
            </nav>
            <button
                class="bg-yellow-400 text-purple-900 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-yellow-300">
                Start Quest
            </button>

`;

header.innerHTML = headerContent;

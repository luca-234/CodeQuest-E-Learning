const section = document.querySelector("hero");
const sectionContent = `
            <div
                class="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-10">

                <!-- Left: Text Content -->
                <div class="flex-1 text-center lg:text-left">
                    <h1
                        class="text-4xl sm:text-5xl font-extrabold leading-tight">
                        Embark on Your <span class="text-yellow-400">Epic Coding
                            Quest</span> 🗡️
                    </h1>
                    <p class="mt-6 text-lg text-gray-300 max-w-xl">
                        Learn HTML & CSS through an immersive journey of <span
                            class="text-yellow-300">quests</span>,
                        <span class="text-yellow-300">interactive
                            challenges</span>, and
                        <span class="text-yellow-300">story-driven
                            adventures</span>.
                        Claim your first badge and begin your legend today.
                    </p>
                    <div
                        class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="#start"
                            class="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition transform hover:scale-105">
                            🎯 Start Your First Quest
                        </a>
                        <a href="#realms"
                            class="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition">
                            🗺️ Explore the Realms
                        </a>
                    </div>
                </div>

                <!-- Right: Visual / Illustration -->
                <div class="flex-1 relative">
                    <div
                        class=" rounded-full w-72 h-72 mx-auto lg:mx-0 shadow-2xl flex items-center justify-center ">
                        <img src="your-quest-illustration.png"
                            alt="CodeQuest Hero"
                            class="w-60 h-60 object-contain drop-shadow-lg">
                    </div>
                   
                </div>
`;
section.innerHTML = sectionContent;

// TODO: set empty search to get all the data 

const cardContainer = document.getElementById("card-container");
const totalIssue = document.getElementById("total-issues");
const allBtn = document.getElementById("btn-all")
const openBtn = document.getElementById("btn-open")
const closedBtn = document.getElementById("btn-closed")
const searchBox = document.getElementById("search-box");
const spinner = document.getElementById("spinner");

let allCardList;

//it's little bit messy I know but noting to do cause working at night no time to make refactor
const goToAllTab = () => {
    allBtn.classList.remove("btn-primary", "text-white", "text-gray-500");
    openBtn.classList.remove("btn-primary", "text-white", "text-gray-500");
    closedBtn.classList.remove("btn-primary", "text-white", "text-gray-500");
    allBtn.classList.add("btn-primary", "text-white");
    openBtn.classList.add("text-gray-500");
    closedBtn.classList.add("text-gray-500");
}

const showSpinner = (status) => {
    if (status) {
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
};

const getLabel = (issue) => {
    let labelParaTag = [];
    issue.labels.forEach((label) => {
        if (label === "bug") {
            labelParaTag.push(`<p class="text-red-600 border border-red-300 bg-red-100 uppercase rounded-full text-[12px] font-medium py-1 px-2">
                                <i class="fa-solid fa-bug mr-[2px]"></i> Bug
                            </p>`);
        }
        if (label === "help wanted") {
            labelParaTag.push(`<p class="text-orange-600 border border-orange-300 bg-orange-100 uppercase rounded-full text-[12px] font-medium py-1 px-2">
                                <i class="fa-solid fa-life-ring mr-[2px] "></i>Help Wanted
                            </p>`);
        }
        if (label === "enhancement") {
            labelParaTag.push(`<p class="text-green-600 border border-green-300 bg-green-100 uppercase rounded-full text-[12px] font-medium p-1">
                                <i class="fa-solid fa-bolt mr-[2px] "></i>Enhancement
                            </p>`);
        }
        if (label === "good first issue") {
            labelParaTag.push(`<p class="text-blue-600 border border-blue-300 bg-blue-100 uppercase rounded-full text-[12px] font-medium py-1 px-2">
                                <i class="fa-solid fa-medal mr-[2px] "></i>Good First Issue
                            </p>`);
        }
        if (label === "documentation") {
            labelParaTag.push(`<p class="text-fuchsia-600 border border-fuchsia-300 bg-fuchsia-100 uppercase rounded-full text-[12px] font-medium py-1 px-2">
                                <i class="fa-solid fa-book-medical mr-[2px] "></i>Documentation
                            </p>`);
        }
    });
    return labelParaTag;
}

const createCard = (issue) => {
    const card = document.createElement("div");
    const status = issue.status === "open";
    const priorityColor = () => {
        if (issue.priority === "high")
            return "text-red-600 bg-red-100";
        if (issue.priority === "medium")
            return "text-orange-600 bg-orange-100";
        return "text-gray-500 bg-gray-200";
    }
    let labelParaTag = getLabel(issue);

    card.id = `card-${issue.id}`;
    card.classList.add("issue-card", `${issue.status}`, "p-4", "rounded-lg", "border-t-4", `${status ? "border-t-green-600" : "border-t-purple-600"}`, "card-shadow");
    const cardHtml = `
                        <div class="flex justify-between items-center mb-3">
                            <img src=${status ? "../assets/Open-Status.png" : "../assets/Closed-Status.png"} alt="${issue.status}">
                            <p class="uppercase ${priorityColor()} py-1 px-4 rounded-full font-medium text-sm text-center">${issue.priority}</p>
                        </div>
                        <div class="mb-3">
                            <h3 class="font-semibold capitalize mb-2 ">${issue.title}</h3>
                            <p class="text-gray-500 tex-sm ">${issue.description}
                            </p>
                        </div>

                        <div class="flex items-center flex-wrap gap-1 pb-4 border-b border-gray-300 ">
                        ${labelParaTag.join("")}
                        </div>
                        <div class="mt-4 space-y-2">
                            <p class="text-gray-500 text-sm text-start">
                                #${issue.id} by ${issue.author}
                            </p>
                            <p class="text-gray-500 text-sm text-start">
                                ${new Date(issue.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    `
    card.innerHTML = cardHtml;
    return card
}


const showAllCardList = (issues) => {
    totalIssue.textContent = issues.length;
    cardContainer.innerHTML = "";
    issues.forEach(issue => {
        const card = createCard(issue);
        cardContainer.append(card);
    });
    goToAllTab();
    showSpinner(false);
    allCardList = document.querySelectorAll(".issue-card")
}



const fetchAllData = async () => {
    showSpinner(true);
    try {
        const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const issues = data.data;
        showAllCardList(issues);
    }
    catch (error) {
        alert("Couldn't fetch the issues. Please Try Again by refreshing the page");
        // console.log(error);
        cardContainer.innerHTML = "<p class='text-center text-red-500'>Failed to load issues.</p>";
        showSpinner(false);

    }


}


fetchAllData();


function showCardList(category) {
    showSpinner(true);
    let cardCnt = 0;
    allCardList.forEach(card => {
        card.classList.add("hidden");
    });
    allBtn.classList.remove("btn-primary", "text-white", "text-gray-500");
    openBtn.classList.remove("btn-primary", "text-white", "text-gray-500");
    closedBtn.classList.remove("btn-primary", "text-white", "text-gray-500");

    if (category === "all") {
        allCardList.forEach(card => {
            card.classList.remove("hidden");
            cardCnt++;
        });
        allBtn.classList.add("btn-primary", "text-white");
        openBtn.classList.add("text-gray-500");
        closedBtn.classList.add("text-gray-500");
        totalIssue.innerText = cardCnt;
    }
    if (category === "open") {
        allCardList.forEach(card => {
            if (card.classList.contains("open")) {
                card.classList.remove("hidden");
                cardCnt++;

            }
        });
        openBtn.classList.add("btn-primary", "text-white");
        allBtn.classList.add("text-gray-500");
        closedBtn.classList.add("text-gray-500");
        totalIssue.innerText = cardCnt;
    }
    if (category === "closed") {
        allCardList.forEach(card => {
            if (card.classList.contains("closed")) {
                card.classList.remove("hidden");
                cardCnt++;
            }
        });
        closedBtn.classList.add("btn-primary", "text-white");
        allBtn.classList.add("text-gray-500");
        openBtn.classList.add("text-gray-500");
        totalIssue.innerText = cardCnt;
    }
    showSpinner(false);
}
const search = async (searchTerm) => {
    try {
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchTerm}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    }
    catch (e) {
        console.error("Error fetching search results:" + e);
        return [];
    }



}

searchBox.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    showSpinner(true);
    const searchTerm = searchBox.value.toLowerCase().trim();
    const issues = await search(searchTerm);
    if (issues.length === 0 && searchTerm) {
        totalIssue.innerText = issues.length;
        cardContainer.innerHTML = "<p class='text-center col-span-4 text-gray-500'> No issues found.</p>";
        showSpinner(false);
        return;
    }
    if (searchTerm === "") { fetchAllData(); return; }
    showAllCardList(issues);

});

const createAndShowModal = async (id) => {
    showSpinner(true);
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await response.json();
    const issue = data.data;
    const status = issue.status === "open";
    const modal = document.createElement("div");
    let priorityColor;

    switch (issue.priority) {
        case "high":
            priorityColor = "red";
            break;
        case "medium":
            priorityColor = "orange";
            break;
        default:
            priorityColor = "gray";
    }

    modal.id = "modal";
    modal.innerHTML = `
    <div id="parent" class="fixed inset-0 flex justify-center items-center h-screen backdrop-blur-[1px] ">
        <section id="modal-body" class="m-3 bg-gray-200 rounded-xl p-8 space-y-6 shadow-[0px_0px_10px_4px_rgba(0,0,0,0.4)]">
            <div class="">
                <h1 class="text-2xl font-bold mb-2">${issue.title}</h1>
                <div class="flex items-center gap-2">
                    <p class="text-gray-500 text-sm"><span
                        class="bg-${status ? 'green' : 'purple'}-600 rounded-full py-1 px-2 text-white capitalize">${issue.status}${status ? "ed" : ""}</span>
                    </p>
                    <div class="flex items-center gap-1 flex-wrap">
                        <div>
                        <span class="w-1 h-1 bg-gray-500 inline-block align-middle rounded-full mx-1  "></span>
                        Opened by ${issue.author}</div>
                        <div>
                        <span class="w-1 h-1 bg-gray-500 inline-block align-middle rounded-full mx-1  "></span>
                        ${new Date(issue.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
            <div class=" flex items-center flex-wrap gap-1">
                ${getLabel(issue).join('')}
            </div>
            <p class="text-gray-500">${issue.description}</p>
            <div class="p-4  flex gap-2 ">
                <div class="flex-1">
                    <p class="text-gray-500">Assignee:</p>
                    <p class="font-semibold">${issue.assignee || 'Unassigned'}</p>
                </div>
                <div class="flex-1">
                    <p class="text-gray-500 ">Priority:</p>
                    <p class="text-sm font-medium uppercase bg-${priorityColor}-600 text-white px-2 inline-block py-1 rounded-full ">
                        ${issue.priority}</p>
                </div>
            </div>
            <div class="text-end">
                <button class="btn btn-primary" onclick="closeModal()">
                    Close
                </button>
            </div>
        </section>
    </div>
                    `;
    document.body.appendChild(modal);
    showSpinner(false);


}
function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        document.body.removeChild(modal);
    }
}

cardContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".issue-card");
    if (!card) return;
    const id = card.id.split("-")[1];

    createAndShowModal(id);


});
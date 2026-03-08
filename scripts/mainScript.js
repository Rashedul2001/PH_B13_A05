const cardContainer = document.getElementById("card-container");
const totalIssue = document.getElementById("total-issues");
const allBtn = document.getElementById("btn-all")
const openBtn = document.getElementById("btn-open")
const closedBtn = document.getElementById("btn-closed")

let allCardList;




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



    card.classList.add(`card-${issue.id}`, "issue-card", `${issue.status}`, "p-4", "rounded-lg", "border-t-4", `${status ? "border-t-green-600" : "border-t-purple-600"}`, "card-shadow");
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

    allCardList = document.querySelectorAll(".issue-card")
}



const fetchAllData = async () => {
    //showSpinner
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
        console.log(error);
    }


}


fetchAllData();


function showCardList(category) {
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
            console.log(cardCnt);
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
}


// button 
const btns = document.querySelectorAll(".btn-category");

const cardContainer = document.getElementById("card-container");

const inputSearch = document.getElementById("inputSearch");
// 

const issueCount = document.getElementById("issueCount");

const spinners=document.getElementById("spinners");
const notFound=document.getElementById("not-found");


// active buttom

function buttonToggle(id){
    btns.forEach(btn=>{
        btn.classList.remove("btn-primary");
    })
    document.getElementById(id).classList.add("btn-primary");
}

const loadData = (status="all")=>{
    cardContainer.classList.remove("shadow-sm");
    spinners.classList.remove("hidden");

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {

        let issue = data.data;

        if(status === "open"){
            issue = issue.filter(item => item.status === "open");
        }
        else if(status === "closed"){
            issue = issue.filter(item => item.status === "closed");
        }

        showData(issue);

        spinners.classList.add("hidden");
        cardContainer.classList.add("shadow-sm");
    })
}


//--- card ---//

const showData = (object)=>{

    const length = object.length;
    issueCount.innerText = length;

    if(length === 0){
        notFound.classList.remove("hidden");
        notFound.classList.add("flex");
    }
    else{
        notFound.classList.add("hidden");
        notFound.classList.remove("flex");
    }

    cardContainer.innerHTML = "";

    object.forEach(obj=>{

        const iconsrc =
        obj.status === "open"
        ? "images/Open-Status.png"
        : "images/Closed-Status.png";

        const div = document.createElement("div");

        div.innerHTML = `
        <div onclick="showModal('${obj.id}')" 
        class="border-t-4 rounded-md cursor-pointer ${obj.status === 'open' ? 'border-t-[#00A96E]' : 'border-t-[#A855F7]'}">

            <!-- card main -->
            <div class="bg-white p-4 overflow-hidden h-[270px]">

                <div class="flex justify-between items-center">
                    <img class="w-6 h-6" src="${iconsrc}" alt="">

                    <button class="py-1.5 px-8 font-medium rounded-full 
                    ${obj.priority === 'high'
                    ? 'bg-[#FEECEC] text-[#EF4444]'
                    : obj.priority === 'medium'
                    ? 'bg-[#FFF6D1] text-[#F59E0B]'
                    : 'bg-[#EEEFF2] text-[#9CA3AF]'}">

                    ${obj.priority}

                    </button>
                </div>

                <div class="mt-3">
                    <h1 class="text-sm font-semibold text-[#1F2937] mb-2 mt-4">
                        ${obj.title}
                    </h1>

                    <p class="text-[12px] text-[#64748B] mb-3 mt-2">
                        ${obj.description}
                    </p>
                </div>

                <div class="flex items-center">

                    <div class="bg-[#FEECEC] text-sm border border-[#FECACA] text-[#EF4444] py-1.5 px-4 font-medium rounded-full flex items-center gap-2 mr-2">
                        <img src="assets/BugDroid.png" class="w-4 h-4">
                        ${obj.labels[0] ? obj.labels[0] : "no value"}
                    </div>

                    <div class="bg-[#FFF8DB] border text-sm border-[#FDE68A] text-[#D97706] py-1.5 px-4 font-medium rounded-full flex items-center gap-2">
                        <img src="assets/Lifebuoy.png" class="w-4 h-4">
                        ${obj.labels[1] ? obj.labels[1] : "no value"}
                    </div>

                </div>

            </div>

            <div class="bg-white p-4 border-t">
                <h1 class="text-[#64748B]">
                    ${obj.assignee ? obj.assignee : "no name"}
                </h1>

                <p class="text-[#64748B] mt-2">
                    ${obj.createdAt}
                </p>
            </div>

        </div>
        `;
        cardContainer.appendChild(div);



    })
};
loadData();


document.getElementById("search").addEventListener("click",()=>{

    const searchValue = inputSearch.value.toLowerCase();

    if(!searchValue){
        loadData();
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
        showData(data.data);
    })
});


// modal
function showModal(id){

    const myModal = document.getElementById("my_modal");
    myModal.showModal();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res => res.json())
    .then(data => {

        const details = data.data;

        document.getElementById("title").innerText = details.title || "title not found";
        document.getElementById("status").innerText = details.status || "status not found";
        document.getElementById("name").innerText = details.author || "author not found";
        document.getElementById("date").innerText = details.createdAt || "date not found";
        document.getElementById("label").innerText = details.labels[0] || "label not found";
        document.getElementById("label-2").innerText = details.labels[1] || "label not found";
        document.getElementById("description").innerText = details.description || "description not found";
        document.getElementById("asigneeName").innerText = details.assignee || "assignee name not found";
        document.getElementById("asigneeStatus").innerText = details.priority || "not found";

    })

};
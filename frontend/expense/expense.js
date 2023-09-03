let currentPage = 1;
let totalPages = 1; // Initialize to 1 page initially

async function addExpense(){
    const expenseAmount = document.getElementById('amount-inp').value;
    const description = document.getElementById('desc-inp').value;
    const category = document.getElementById('cat-input').value;

    if(!expenseAmount || !description){
        alert('all fields are necessary');
        return;
    }
    const expense = {
        expenseAmount,
        description,
        category
    }
    try{
    const response = await axios.post("http://localhost:3000/api/user/expenses", expense, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            showOnScreen(response.data);
        }
        catch(err){
            document.body.innerHTML += `<p style="color: red;">${err.message}</p>`
        }
    
        document.getElementById('amount-inp').value = '';
        document.getElementById('desc-inp').value = '';
        document.getElementById('cat-input').value = '';
        
        fetchExpensesByPage(currentPage);
}

function renderPaginationButtons() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.addEventListener("click", () => {
            currentPage = i;
            fetchExpensesByPage(currentPage);
        });

        if (i === currentPage) {
            button.classList.add("active");
        }

        paginationContainer.appendChild(button);
    }
}

function showOnScreen(obj){
    const main = document.getElementById('expenses');
    const mainArea = document.getElementById('main-area');
    const parent = document.createElement('li');
    const child1 = document.createElement('span');
    const child2 = document.createElement('span');
    const child3 = document.createElement('span');
    const child4 = document.createElement('button');
    child1.innerHTML = `${obj.expenseAmount}- `;
    child2.innerHTML = `${obj.category}- `;
    child3.innerHTML = `${obj.description}  `;
    child4.innerHTML = "delete expense";
    child4.addEventListener("click",async ()=>{
        try{
            await axios.delete(`http://localhost:3000/api/user/expenses/${obj.id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
            parent.remove();
        }
        catch(err){
            document.body.innerHTML += `<p style="color: red;">${err.message}</p>`
        }
        
    })

    parent.appendChild(child1);
    parent.appendChild(child2);
    parent.appendChild(child3);
    parent.appendChild(child4)
    mainArea.appendChild(parent);
    main.appendChild(mainArea);
}


const premiumBtn = document.getElementById('rzp-btn');

premiumBtn.addEventListener("click", async () => {
try {
const response = await axios.get("http://localhost:3000/api/premiumMembership", {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
});

var options = {
    key: response.data.key_id,
    order_id: response.data.orderId,
    handler: async function (response) {
        const input = { order_id: options.order_id, payment_id: response.razorpay_payment_id };
        try {
            await axios.post("http://localhost:3000/api/updateTransactionStatus", input, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            // Show a success message on the webpage
            alert('congrats! you are a premium user now.');
            window.location.reload();
        } catch (err) {
            console.error(err);
            // Show an error message on the webpage
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "An error occurred during the payment process. Please try again later.";
            errorMessage.style.color = "red";
            document.getElementById("premium").appendChild(errorMessage);
        }
    }
};

const rzp = new Razorpay(options);
rzp.open();
} catch (err) {
console.error(err);
}
});


async function isPremiumUser(){
try{
const response = await axios.get("http://localhost:3000/api/user",{headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
const user = response.data;
console.log(user);
if(user.isPremiumMember){
    const main = document.getElementById("premium");
    const divForBtnAndMsg = document.createElement("div");
    document.getElementById('btn-parent').remove()
    const successMessage = document.createElement("span");
    successMessage.textContent = "You are premium a user.";
    const btn = document.createElement("button");
    const btn1 = document.createElement("button");
    btn1.innerHTML = "Download"
    btn.innerHTML = "show leaderboard";
    btn.addEventListener("click",async()=>{
        localStorage.setItem("flag", true);
        window.location.reload();
    })
    btn1.addEventListener("click", async()=>{
        const res = await axios.get("http://localhost:3000/api/user/expenses/download",{headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
        window.location.href = `${res.data.url}`
        document.getElementById('file-head').innerHTML = "Files-"
        const response = await axios.get("http://localhost:3000/api/user/expenses/files",{headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
        const files = response.data;
        for(let i=0; i < files.length; i++){
            showFiles(files[i]);
        }
    })

    divForBtnAndMsg.appendChild(successMessage);
    divForBtnAndMsg.appendChild(btn);
    divForBtnAndMsg.appendChild(btn1);
    main.appendChild(divForBtnAndMsg);
}
}
catch(err){
console.log(err);
}
}

async function leaderData(){
const flag = localStorage.getItem("flag");
if(flag){
try{
            
    const response = await axios.get("http://localhost:3000/api/user/premiumFeature",{headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    const leaderboardData = response.data;
    document.getElementById('h3ele').innerHTML = "Leaderboard-"
    for(let i=0; i<leaderboardData.length; i++){
        if(!leaderboardData[i].totalExpenses){
            leaderboardData[i].totalExpenses = 0;
            showLeaderBoard(leaderboardData[i]);
        }else{
                showLeaderBoard(leaderboardData[i]);
        }  
        }
    localStorage.removeItem("flag");
}
catch(err){
        console.log(err);
        }
}
}

leaderData();

function showLeaderBoard(obj){
const main = document.getElementById("leaderboard");
const parent = document.getElementById('leaderboard-list');
const childele1 = document.createElement('li');
childele1.innerHTML = `Name- ${obj.name} totalExpense- ${obj.totalExpenses}`
parent.appendChild(childele1);
main.appendChild(parent);
}

function showFiles(obj){
const main = document.getElementById("files");
const parent = document.getElementById('file-list');
const childele1 = document.createElement('li');
childele1.innerHTML = `<a href="${obj.url}">${obj.url}</a>`
parent.appendChild(childele1);
main.appendChild(parent);
}

async function fetchExpensesByPage(page) {
    try {
        const limit = document.getElementById("limit").value; // Get the selected limit
        const response = await axios.get(`http://localhost:3000/api/user/expenses/pagination?page=${page}&limit=${limit}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const expenses = response.data.expenses;
        totalPages = response.data.totlaPages;

        renderPaginationButtons(); // Render pagination buttons with updated totalPages

        const mainArea = document.getElementById("main-area");
        mainArea.innerHTML = ""; // Clear the existing expenses list

        // Display the expenses for the current page
        expenses.forEach(expense => {
            showOnScreen(expense);
        });
    } catch (err) {
        console.error(err);
    }
}

isPremiumUser();
fetchExpensesByPage(currentPage);

document.getElementById("limit").addEventListener("change", () => {
// When the limit value changes, fetch expenses for the current page with the new limit
fetchExpensesByPage(currentPage);
});
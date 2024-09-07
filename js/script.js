
const view = document.getElementById("submit");
const waitMsg = document.getElementById("wait");
const resCard = document.querySelector("#resultCardSection");
const closeBtn = document.querySelector("#closeBtn");
const showRoll = document.querySelector("#show-roll");
const showInst = document.querySelector("#institute");
const instCOde = document.querySelector("#institute-code");
const resultHolder = document.querySelector("#resultHolder");
let roll, reg, exam;


view.addEventListener("click", (e) => {
    e.preventDefault();
        closeBtn.innerText = "CLOSE";
    resCard.style.position = "absolute";
    while (resultHolder.lastChild) {
        resultHolder.removeChild(resultHolder.lastChild);
    }
    reg = document.getElementById("regulation");
    roll = document.getElementById("roll");
    exam = "DIPLOMA+IN+ENGINEERING";

    if (roll.value === "") {
        waitMsg.innerText = "Please enter your roll and try again";
        waitMsg.style.color = "red";
        waitMsg.style.fontSize = "20px";

    } else {
        waitMsg.style.color = "#16a34a";
        waitMsg.style.fontSize = "18px";
        waitMsg.innerText = `Please Wait. Getting Result...`;
        setTimeout(() => {
            waitMsg.innerText = "";
            resCard.style.display = "block";
        }, 1500);

        const proto = "http";
        const dom1 = 'web-production-bfbd9.up.railway.app';
        const dom2 = 'btebresultszone.com/api/results/individual';
        const URL = `${proto}s://${dom1}/${proto}s://${dom2}?roll=${roll.value}&exam=${exam}&regulation=${reg}`;

        async function fetchingResult() {
            let result = await fetch(URL);
            let data = await result.json();
            return data;
        }

        async function showData() {
            var data = await fetchingResult();
            showRoll.innerText = `Roll: ${data.roll}`;
            showInst.innerText = `Institute: ${data.institute.name}`;
            instCOde.innerText = `Institute Code: ${data.institute.code}`;
            data.semester_results.forEach((elem) => {
                let semesters = elem.exam_results[0];
                if (semesters.gpa) {
                    let div = document.createElement("div");
                    div.innerHTML = `<div class="border border-x-0 border-yellow-300 my-3 pb-1">
                    <div class="info flex justify-between items-center px-6 py-3">
                        <p class="semester">Semester: ${elem.semester}</p>
                        <p class="status text-green-400">Passed</p>
                        <p class="date">${new Date(new Date(semesters.date).setDate(new Date(semesters.date).getDate() + 1)).toISOString().split('T')[0]}</p>
                    </div>
                    <div class="cgpa p-3 bg-green-400 text-center">
                        <p class="text-xl font-bold">CGPA: ${semesters.gpa}</p>
                    </div>
                    </div>`;
                    resultHolder.appendChild(div);
                }
                else if(semesters.reffereds[0].passed){
                    let div = document.createElement("div");

                    let refSubjects = semesters.reffereds.map(subject => subject.subject_name).join(', ');

                    div.innerHTML = `
                        <div class="border border-x-0 border-yellow-300 my-3 pb-1">
                            <div class="info flex justify-between items-center px-6 py-3">
                                <p class="semester">Semester: ${elem.semester}</p>
                                <p class="status text-green-400">Passed</p>
                                <p class="date">${new Date(new Date(semesters.date).setDate(new Date(semesters.date).getDate() + 1)).toISOString().split('T')[0]}</p>
                            </div>
                            <div class="reffered p-3 bg-green-300 text-center">
                                <p class="text-xl font-bold text-black">Ref: ${refSubjects}</p>
                            </div>
                        </div>`;

                    resultHolder.appendChild(div); 
                }
                else if(semesters.reffereds[0].passed === false){
                    let div = document.createElement("div");

                    let refSubjects = semesters.reffereds.map(subject => subject.subject_name).join(', ');

                    div.innerHTML = `
                        <div class="border border-x-0 border-yellow-300 my-3 pb-1">
                            <div class="info flex justify-between items-center px-6 py-3">
                                <p class="semester">Semester: ${elem.semester}</p>
                                <p class="status text-red-400">Referred</p>
                                <p class="date">${new Date(new Date(semesters.date).setDate(new Date(semesters.date).getDate() + 1)).toISOString().split('T')[0]}</p>
                            </div>
                            <div class="reffered p-3 bg-red-400 text-center">
                                <p class="text-xl font-bold">Ref: ${refSubjects}</p>
                            </div>
                        </div>`;

                    resultHolder.appendChild(div);
                }

            });
        };
        showData();
    }
});

roll = document.getElementById("roll");
roll.addEventListener("input", () => {
    waitMsg.innerText = "";
});
closeBtn.addEventListener("click", () => {
    if (closeBtn.innerText === "CLOSE" && resCard.style.position === "absolute") {
        resCard.style.position = "relative";
        closeBtn.innerText = "EXPAND";
    } else {
        resCard.style.position = "absolute";
        closeBtn.innerText = "CLOSE";
    }
});

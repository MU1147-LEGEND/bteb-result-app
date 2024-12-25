const view = document.getElementById("submit");
const waitMsg = document.getElementById("wait");
const resCard = document.querySelector("#resultCardSection");
const closeBtn = document.querySelector("#closeBtn");
const showRoll = document.querySelector("#show-roll");
const showInst = document.querySelector("#institute");
const instCOde = document.querySelector("#institute-code");
const resultHolder = document.querySelector("#resultHolder");
let roll, reg, exam;

let cross = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path></svg>';

let expand = '<svg height="24" version="1.1" viewBox="0 0 36 36" width="24"><g class="ytp-fullscreen-button-corner-0"><use class="ytp-svg-shadow" xlink:href="#ytp-id-7"></use><path class="ytp-svg-fill" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" id="ytp-id-7"></path></g><g class="ytp-fullscreen-button-corner-1"><use class="ytp-svg-shadow" xlink:href="#ytp-id-8"></use><path class="ytp-svg-fill" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" id="ytp-id-8"></path></g><g class="ytp-fullscreen-button-corner-2"><use class="ytp-svg-shadow" xlink:href="#ytp-id-9"></use><path class="ytp-svg-fill" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" id="ytp-id-9"></path></g><g class="ytp-fullscreen-button-corner-3"><use class="ytp-svg-shadow" xlink:href="#ytp-id-10"></use><path class="ytp-svg-fill" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" id="ytp-id-10"></path></g></svg>';

view.addEventListener("click", (e) => {
    e.preventDefault();
    closeBtn.innerHTML = cross;
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

        const proto = "http";
        const dom1 = "web-production-bfbd9.up.railway.app";
        const dom2 = "btebresultszone.com/api/results/individual";
        const URL = `${proto}s://${dom1}/${proto}s://${dom2}?roll=${roll.value}&exam=${exam}&regulation=${reg}`;

        async function fetchingResult() {
            let result = await fetch(URL);
            let data = await result.json();
            resCard.style.display = "block";
            return data;
        }

        async function showData() {
            waitMsg.innerText = `Please Wait. Getting your Result...`;
            var data = await fetchingResult();
            resCard.style.position = "absolute";
            waitMsg.innerText = "";
            showRoll.innerText = `Roll: ${data.roll}`;
            showInst.innerText = `Institute: ${data.institute.name}`;
            instCOde.innerText = `Institute Code: ${data.institute.code}`;
            data.semester_results.forEach((elem) => {
                let semesters = elem.exam_results[0];
                var div = document.createElement("div");
                if (semesters.gpa) {
                    div.innerHTML = `<div class="border border-x-0 border-yellow-300 my-3 pb-1">
                    <div class="info flex justify-between items-center px-6 py-3">
                        <p class="semester">Semester: ${elem.semester}</p>
                        <p class="status text-green-400">Passed</p>
                        <p class="date">${
                            new Date(
                                new Date(semesters.date).setDate(
                                    new Date(semesters.date).getDate() + 1
                                )
                            )
                                .toISOString()
                                .split("T")[0]
                        }</p>
                    </div>
                    <div class="cgpa p-3 bg-green-400 text-center">
                        <p class="text-xl font-bold">CGPA: ${semesters.gpa}</p>
                    </div>
                    </div>`;
                    resultHolder.appendChild(div);
                } else if (semesters.reffereds[0].passed) {
                    // div = document.createElement("div");

                    let refSubjects = semesters.reffereds
                        .map((subject) => subject.subject_name)
                        .join(", ");

                    div.innerHTML = `
                        <div class="border border-x-0 border-yellow-300 my-3 pb-1">
                            <div class="info flex justify-between items-center px-6 py-3">
                                <p class="semester">Semester: ${
                                    elem.semester
                                }</p>
                                <p class="status text-green-400">Passed</p>
                                <p class="date">${
                                    new Date(
                                        new Date(semesters.date).setDate(
                                            new Date(semesters.date).getDate() +
                                                1
                                        )
                                    )
                                        .toISOString()
                                        .split("T")[0]
                                }</p>
                            </div>
                            <div class="reffered p-3 bg-green-300 text-center">
                                <p class="text-xl font-bold text-black">Ref: ${refSubjects}</p>
                            </div>
                        </div>`;

                    resultHolder.appendChild(div);
                } else if (semesters.reffereds[0].passed === false) {
                    // div = document.createElement("div");

                    let refSubjects = semesters.reffereds
                        .map((subject) => subject.subject_name)
                        .join(", ");

                    div.innerHTML = `
                        <div class="border border-x-0 border-yellow-300 my-3 pb-1">
                            <div class="info flex justify-between items-center px-6 py-3">
                                <p class="semester">Semester: ${
                                    elem.semester
                                }</p>
                                <p class="status text-red-400">Referred</p>
                                <p class="date">${
                                    new Date(
                                        new Date(semesters.date).setDate(
                                            new Date(semesters.date).getDate() +
                                                1
                                        )
                                    )
                                        .toISOString()
                                        .split("T")[0]
                                }</p>
                            </div>
                            <div class="reffered p-3 bg-red-400 text-center">
                                <p class="text-xl font-bold">Ref: ${refSubjects}</p>
                            </div>
                        </div>`;

                    resultHolder.appendChild(div);
                }
            });
        }
        showData();
    }
});

roll = document.getElementById("roll");
roll.addEventListener("input", () => {
    waitMsg.innerText = "";
});
closeBtn.addEventListener("click", () => {
    if (
        closeBtn.innerHTML === cross &&
        resCard.style.position === "absolute"
    ) {
        resCard.style.position = "relative";
        closeBtn.innerHTML = expand;
    } else {
        resCard.style.position = "absolute";
        closeBtn.innerHTML = cross;
    }
});

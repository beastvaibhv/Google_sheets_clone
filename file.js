let data = {
    name: "Vaibhav",
    age: 24,
    college: "NA",
    role: "Front-end",
    company: "NA"
}

const a = document.querySelector("a");

function createAndDownloadFile() {
    let fileData = JSON.stringify(data);
    let file = new Blob([fileData], { type: "application/json" });
    let url = URL.createObjectURL(file);
 
    a.href = url;
}


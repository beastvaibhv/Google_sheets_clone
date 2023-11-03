let data = {
    name: "aravind",
    age: 22,
    college: "something",
    role: "Dev",
    company: "Acciojob"
}

const a = document.querySelector("a");

function createAndDownloadFile() {
    let fileData = JSON.stringify(data);
    let file = new Blob([fileData], { type: "application/json" });
    let url = URL.createObjectURL(file);
 
    a.href = url;
}


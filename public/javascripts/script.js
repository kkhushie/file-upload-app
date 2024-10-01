document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const previewDiv = document.getElementById("preview");
            previewDiv.innerHTML = ''; // Clear previous content

            // Detect file type and render
            const fileType = file.type;
            let content;

            if (fileType.startsWith("image/")) {
                content = `<img src="${e.target.result}" alt="Image Preview" style="max-width: 300px;" />`;
            } else if (fileType.startsWith("audio/")) {
                content = `<audio controls src="${e.target.result}">Your browser does not support the audio tag.</audio>`;
            } else if (fileType.startsWith("video/")) {
                content = `<video controls src="${e.target.result}" style="max-width: 300px;"></video>`;
            } else if (fileType === "application/pdf") {
                content = `<iframe src="${e.target.result}" style="width:300px; height:400px;" frameborder="0"></iframe>`;
            } else {
                content = "Unsupported file type.";
            }

            previewDiv.innerHTML = content;

            // Upload file to server
            const formData = new FormData();
            formData.append("file", file);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please select a file.");
    }
});

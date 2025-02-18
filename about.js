document.getElementById('sub').addEventListener('click', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        id: Date.now().toString(), // Unique identifier
        date: document.getElementById('title').value,
        article: document.querySelector('input[name="title"][placeholder="Article(optional)"]').value,
        title: document.querySelector('input[name="title"][placeholder="Title"]').value,
        assailant: document.querySelector('input[name="title"][placeholder="Assailant"]').value,
        victimAffiliation: document.querySelector('input[name="title"][placeholder="victim Affiliation"]').value,
        attackType: document.getElementById('victim-affiliation').value,
        victimName: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        state: document.getElementById('State').value,
        description: document.getElementById('description').value
    };

    // Handle file uploads (basic file name storage)
    const fileInput = document.getElementById('file-upload');
    const files = fileInput.files;
    const uploadedFiles = [];

    for (let file of files) {
        uploadedFiles.push(file.name);
    }

    formData.attachments = uploadedFiles;

    // Get existing reports or create new array
    let reports = JSON.parse(localStorage.getItem('attackReports') || '[]');
    
    // Add new report
    reports.push(formData);
    
    // Save to local storage
    localStorage.setItem('attackReports', JSON.stringify(reports));

    alert('Report submitted successfully!');
});
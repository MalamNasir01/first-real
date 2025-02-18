// DOM Elements
const reportsBody = document.getElementById('reports-body');
const stateFilter = document.getElementById('state-filter');
const attackTypeFilter = document.getElementById('attack-type-filter');
const reportModal = document.getElementById('report-modal');
const reportDetailsContainer = document.getElementById('report-details');
const closeModalButton = document.querySelector('.close-button');

// Fetch and Display Reports
function fetchReports(state = '', attackType = '') {
    reportsBody.innerHTML = ''; // Clear existing reports
    
    // Get reports from local storage
    let reports = JSON.parse(localStorage.getItem('attackReports') || '[]');
    
    // Apply filters
    const filteredReports = reports.filter(report => 
        (state === '' || report.state === state) &&
        (attackType === '' || report.attackType === attackType)
    );
    
    filteredReports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.date}</td>
            <td>${report.victimName}</td>
            <td>${report.state}</td>
            <td>${report.attackType}</td>
            <td>
                <button onclick="showReportDetails('${report.id}')">View Details</button>
                <button onclick="deleteReport('${report.id}')">Delete</button>
            </td>
        `;
        reportsBody.appendChild(row);
    });
}

// Delete a Report
function deleteReport(reportId) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this report?')) return;

    // Get existing reports
    let reports = JSON.parse(localStorage.getItem('attackReports') || '[]');
    
    // Filter out the report with the matching ID
    reports = reports.filter(report => report.id !== reportId);
    
    // Save updated reports back to localStorage
    localStorage.setItem('attackReports', JSON.stringify(reports));
    
    // Refresh the reports table
    fetchReports(stateFilter.value, attackTypeFilter.value);
}

// Show Report Details in Modal
function showReportDetails(reportId) {
    const reports = JSON.parse(localStorage.getItem('attackReports') || '[]');
    const report = reports.find(r => r.id === reportId);
    
    if (!report) {
        alert('Report not found');
        return;
    }
    
    reportDetailsContainer.innerHTML = `
        <h2>Report Details</h2>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Title:</strong> ${report.title}</p>
        <p><strong>Victim Name:</strong> ${report.victimName}</p>
        <p><strong>Gender:</strong> ${report.gender}</p>
        <p><strong>Attack Type:</strong> ${report.attackType}</p>
        <p><strong>State:</strong> ${report.state}</p>
        <p><strong>Description:</strong> ${report.description}</p>
    `;

    // Display Attachments
    const imagesContainer = document.getElementById('report-images');
    imagesContainer.innerHTML = '';
    if (report.attachments && report.attachments.length) {
        report.attachments.forEach(attachment => {
            const img = document.createElement('img');
            img.src = attachment.data;
            img.alt = attachment.name;
            img.style.maxWidth = '200px';
            img.style.margin = '10px';
            imagesContainer.appendChild(img);
        });
    }

    reportModal.style.display = 'block';
}

// Close Modal
closeModalButton.onclick = () => {
    reportModal.style.display = 'none';
};

// Filter Event Listeners
stateFilter.addEventListener('change', () => {
    fetchReports(stateFilter.value, attackTypeFilter.value);
});

attackTypeFilter.addEventListener('change', () => {
    fetchReports(stateFilter.value, attackTypeFilter.value);
});

// Initial Load
fetchReports();
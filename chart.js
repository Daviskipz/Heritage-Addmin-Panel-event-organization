// Sample event data. In a real-world application, this would come from a database.
const events = [
    { date: '2025-09-15', name: 'Tech Conference 2025', status: 'Upcoming', attendance: 150, feedback: 4.5, budget: 10000, expenses: 8000 },
    { date: '2025-10-22', name: 'Annual Gala', status: 'Active', attendance: 250, feedback: 4.8, budget: 20000, expenses: 15000 },
    { date: '2025-09-25', name: 'Product Launch', status: 'Upcoming', attendance: 100, feedback: 4.2, budget: 5000, expenses: 4000 },
    { date: '2025-08-10', name: 'Planning Meeting', status: 'Ended', attendance: 20, feedback: 4.0, budget: 1000, expenses: 800 },
    { date: '2025-08-15', name: 'Project Kickoff', status: 'Active', attendance: 50, feedback: 4.6, budget: 2500, expenses: 2000 },
];

// Function to generate and display the calendar for a given month and year.
function generateCalendar(year, month) {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');

    calendarGrid.innerHTML = '';
    const date = new Date(year, month);
    currentMonthEl.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayName = document.createElement('div');
        dayName.classList.add('day-name');
        dayName.textContent = day;
        calendarGrid.appendChild(dayName);
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        dayEl.textContent = i;
        
        const eventDate = new Date(year, month, i).toISOString().split('T')[0];
        const hasEvent = events.some(event => event.date === eventDate);
        if (hasEvent) {
            dayEl.classList.add('event-day');
        }

        calendarGrid.appendChild(dayEl);
    }
}

// Function to create the event status doughnut chart using Chart.js.
function createEventStatusChart() {
    const ctx = document.getElementById('eventStatusChart').getContext('2d');
    
    // Dynamically count event statuses from the sample data.
    const statusCounts = events.reduce((acc, event) => {
        acc[event.status] = (acc[event.status] || 0) + 1;
        return acc;
    }, {});

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                label: 'Event Status',
                data: Object.values(statusCounts),
                backgroundColor: [
                    '#2196F3', // Blue for Upcoming
                    '#4CAF50', // Green for Active
                    '#f44336'  // Red for Ended
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Event Status Distribution' }
            }
        }
    });
}

// Function to handle printing the dashboard page.
function printDashboard() {
    window.print();
}

// Function to simulate downloading all dashboard data.
function downloadDashboard() {
    console.log("Downloading all event data...");
    alert("Data download initiated! (This is a mock function)");
}

// Initialize the calendar and charts when the page loads.
let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(currentYear, currentMonth);
    createEventStatusChart();

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });
})
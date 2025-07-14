const salesData = {
    labels: [],
    datasets: [{
      label: 'Sales ($)',
      data: [],
      borderColor: '#22d3ee',
      fill: false,
      tension: 0.3
    }]
  };
  
  const regionData = {
    labels: ['North', 'South', 'East', 'West'],
    datasets: [{
      label: 'Performance',
      data: [10, 20, 30, 40],
      backgroundColor: ['#f87171', '#34d399', '#60a5fa', '#fbbf24']
    }]
  };
  const originalRegionLabels = [...regionData.labels];
const originalRegionData = [...regionData.datasets[0].data];

  const deviceData = {
    labels: ['Mobile', 'Tablet', 'Desktop'],
    datasets: [{
      label: 'Devices',
      data: [30, 25, 45],
      backgroundColor: ['#818cf8', '#f472b6', '#4ade80']
    }]
  };
  
  const trafficData = {
    labels: ['Organic', 'Referral', 'Social', 'Direct'],
    datasets: [{
      label: 'Traffic',
      data: [40, 20, 25, 15],
      backgroundColor: ['#38bdf8', '#c084fc', '#f97316', '#eab308']
    }]
  };
  
  const salesChart = new Chart(document.getElementById('salesChart'), { type: 'line', data: salesData });
  const regionChart = new Chart(document.getElementById('regionChart'), { type: 'bar', data: regionData });
  const deviceChart = new Chart(document.getElementById('deviceChart'), { type: 'doughnut', data: deviceData });
  const trafficChart = new Chart(document.getElementById('trafficChart'), { type: 'pie', data: trafficData });
  
  function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleString();
  }
  setInterval(updateClock, 1000);
  
  // Animate numbers
  function animateCount(id, value, suffix = '') {
    const el = document.getElementById(id);
    let start = 0;
    const end = parseInt(value);
    const step = Math.ceil(end / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(interval);
        el.textContent = suffix === '%' ? `${end}%` : `$${end}`;
      } else {
        el.textContent = suffix === '%' ? `${start}%` : `$${start}`;
      }
    }, 20);
  }
  
  // Data update
  // Replace the existing updateData function with this:
async function updateData() {
  try {
   const response = await fetch('http://localhost:5000/api/data');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    animateCount('sales', data.sales);
    animateCount('users', data.users);
    animateCount('bounce', data.bounce, '%');
    animateCount('revenue', data.revenue);
    
    salesData.labels.push(new Date().toLocaleTimeString());
    salesData.datasets[0].data.push(data.sales);
    salesChart.update();
  } catch (error) {
    console.error('Error fetching data:', error);
    document.querySelector('.notifications').innerHTML += 
      `<p>⚠️ Failed to load data. Retrying...</p>`;
  }
}

// Update every 5 seconds
setInterval(updateData, 5000);
updateData(); // Initial load
  // Export
  document.getElementById("export-btn").addEventListener("click", () => {
    let csv = `Time,Sales\n`;
    for (let i = 0; i < salesData.labels.length; i++) {
      csv += `${salesData.labels[i]},${salesData.datasets[0].data[i]}\n`;
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sales-data.csv";
    a.click();
  });
  
  // Theme toggle
  document.getElementById('theme-selector').addEventListener('change', e => {
    document.body.className = e.target.value;
  });
  
  // Search
  document.getElementById("search-input").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();

  // Filter from original labels
  const filteredLabels = originalRegionLabels.filter(label => label.toLowerCase().includes(term));
  
  // Get matching data from original dataset
  const filteredData = filteredLabels.map(label => {
    const index = originalRegionLabels.indexOf(label);
    return originalRegionData[index];
  });

  // Apply to chart
  regionChart.data.labels = filteredLabels;
  regionChart.data.datasets[0].data = filteredData;
  regionChart.update();
});


  
  // Drag-n-drop
  let dragItem = null;
  document.querySelectorAll('.draggable').forEach(el => {
    el.addEventListener('dragstart', () => dragItem = el);
    el.addEventListener('dragover', e => e.preventDefault());
    el.addEventListener('drop', function () {
      if (dragItem !== this) {
        this.parentNode.insertBefore(dragItem, this.nextSibling);
      }
    });
  });
  
  // Sidebar toggle
  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }
  
  // Scroll to
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    toggleSidebar();
  }
  
  // Fullscreen toggle
  document.querySelectorAll('.full-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const parent = e.target.closest('.chart-box');
      parent.classList.toggle('fullscreen');
    });
  });
  
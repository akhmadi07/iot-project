// Konfigurasi Chart
const ctx = document.getElementById('sensorChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Suhu (°C)',
      data: [],
      borderColor: '#e74c3c',
      tension: 0.3
    }, {
      label: 'Kelembaban (%)',
      data: [],
      borderColor: '#3498db',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: false }
    }
  }
});

// Fetch data dari Node-RED
async function fetchData() {
  try {
    // Ganti URL dengan endpoint Node-RED Anda
    const response = await fetch('http://203.194.114.58:1881/api/data');
    const data = await response.json();
    
    // Update UI
    document.getElementById('temperature').textContent = `${data.temperature} °C`;
    document.getElementById('humidity').textContent = `${data.humidity} %`;
    
    // Update chart
    const now = new Date().toLocaleTimeString();
    chart.data.labels.push(now);
    
    // Batasi data chart
    if(chart.data.labels.length > 15) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
      chart.data.datasets[1].data.shift();
    }
    
    chart.data.datasets[0].data.push(data.temperature);
    chart.data.datasets[1].data.push(data.humidity);
    chart.update();
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Update data setiap 5 detik
setInterval(fetchData, 5000);
fetchData(); // Panggil pertama kali

const ctx = document.getElementById('myChart').getContext('2d');

const year = document.querySelector("#years");
const days = document.querySelector("#days");
let counter = 0;
let myChart;

// Sample data
const data = {
    labels: ['2023'], // Custom X-axis labels (months)
    datasets: [{
        label: 'Sample Data',
        data: [50], // Y-axis data (numeric values)
        backgroundColor: ['rgba(78, 114, 223, 0.43)', 'rgba(78, 114, 223, 0.65)', 'rgba(78, 114, 223, 0.87)', 'rgba(78, 114, 223, 0.99)'],
        borderColor: ['rgba(78, 114, 223, 0.43)', 'rgba(78, 114, 223, 0.65)', 'rgba(78, 114, 223, 0.87)', 'rgba(78, 114, 223, 0.99)'],
        borderWidth: 1,
        barThickness: 10
    }]
};

// Chart configuration
const config = {
    type: 'bar', // Bar chart type
    data: data,
    options: {
        responsive: true,
        indexAxis: 'y', // Set this to make the bar chart horizontal
        scales: {
            x: {
                min: 0,
                max: 365,
                reverse: true,
                ticks: {
                    callback: function(value) {
                        if (value === 0) return '';  // Don't show anything for 31 (boundary of January)
                        if (value === 365) return '';
                        // Convert numeric values to custom text labels
                        if (value <= 31) return 'January';
                        if (value <= 59) return 'February';
                        if (value <= 90) return 'March';
                        if (value <= 120) return 'April';
                        if (value <= 151) return 'May';
                        if (value <= 181) return 'June';
                        if (value <= 212) return 'July';
                        if (value <= 243) return 'August';
                        if (value <= 273) return 'September';
                        if (value <= 304) return 'October';
                        if (value <= 334) return 'November';
                        if (value <= 365) return 'December';
                    },
                    stepSize: 31
                },
                title: {
                    display: true,
                    text: 'Months' // Label for the Y-axis
                },
                position: 'top'
            },
            y: {
                // Y-axis: Custom text labels
                // X-axis: Custom text labels (months)
                
                position: 'right'
            }
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // Remove space between bars
            scales: {
                x: {
                    ticks: {
                        display: false // Hide the ticks on X-axis if needed
                    }
                }
            },
            // Adjust bar thickness to remove space
            datasets: [{
                barPercentage: 1, // Set bar width to fill available space
                categoryPercentage: 1, // Set category width to fill the space
            }]
        }
    }
};




const updateChart = () => {
    
    if(counter === 0){
        data.labels = [year.value];
        data.datasets[0].data = [days.value];
        counter++;
    }
    else{
        data.labels.push(year.value);
        data.datasets[0].data.push(days.value);
    }
    console.log("datasets: " + data.datasets[0].data);
    

    drawChart();
}

// Create the chart
const drawChart = () => {
    if(myChart){
        myChart.destroy();
    }
    myChart = new Chart(ctx, config);
}

document.getElementById('saveBtn').addEventListener('click', () => {
    const url = myChart.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.png';
    link.click();
});

drawChart();
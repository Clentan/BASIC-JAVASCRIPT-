
import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
	const chartRef = useRef(null);

	useEffect(() => {
		if (chartRef.current) {
			const chart = chartRef.current;
			const ctx = chart.canvas.getContext('2d'); // Access the chart's canvas context

			// Create the gradient for the line
			const lineGradient = ctx.createLinearGradient(0, 0, 0, 400);
			lineGradient.addColorStop(0, '#0496ff');
			lineGradient.addColorStop(1, 'rgba(4, 150, 255, 0.3)');

			// Create the gradient background mask for the entire chart
			const backgroundGradient = ctx.createLinearGradient(0, 0, 0, 400);
			backgroundGradient.addColorStop(0, 'rgba(4, 150, 255, 0.1)');
			backgroundGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

			// Apply gradients
			chart.data.datasets[0].borderColor = lineGradient; // Gradient for the line
			chart.data.datasets[0].backgroundColor = lineGradient; // Gradient for the fill under the line

			// Add background gradient mask to the canvas
			ctx.fillStyle = backgroundGradient;
			ctx.fillRect(0, 0, chart.width, chart.height);

			chart.update(); // Update the chart to reflect the changes
		}
	}, []);

	const data = {
		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
		datasets: [
			{
				label: 'User Performance',
				data: [78, 85, 65, 92, 88, 75, 80], // Performance scores
				fill: true, // Enables filling the area under the line
				borderColor: '#0496ff', // Fallback color
				backgroundColor: 'rgba(4, 150, 255, 0.3)', // Placeholder for gradient
				tension: 0.4, // Smooth line tension
				pointRadius: 0, // Removes point labels
				borderWidth: 2, // Line thickness
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					display: false, // Removes y-axis grid lines
				},
				title: {
					display: true,
					text: 'Score',
				},
			},
			x: {
				grid: {
					display: false, // Removes x-axis grid lines (optional)
				},
			},
		},
		plugins: {
			legend: {
				display: true,
			},
		},
		elements: {
			line: {
				borderColor: '#0496ff', // Fallback for the line color
			},
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
	};

	return <Line ref={chartRef} data={data} options={options} />;
};


export default Chart;

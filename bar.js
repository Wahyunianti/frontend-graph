//Script grafik batang

const data = [3000000, 1500000, 600000, 4600000, 8000000, 2500000, 10230000, 8600000, 3200000, 9300000, 7400000, 3200000];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const chart = document.getElementById('chart');
const yAxis = document.getElementById('y-axis');

const maxValue = Math.max(...data);
const step = Math.ceil(maxValue / 5);

for (let i = maxValue; i >= 0; i -= step) {
    const yLabel = document.createElement('div');
    yLabel.textContent = (i >= 1000000) ? (i / 1000000).toFixed(1) + ' jt' : (i / 1000).toFixed(1) + ' k';
            yAxis.appendChild(yLabel);
}

data.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = '0';
    bar.dataset.value = value;

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = (value >= 1000000) ? (value / 1000000).toFixed(1) + ' jt' : (value / 1000).toFixed(1) + ' k';

    const valueText = document.createElement('div');
    valueText.className = 'value';
    valueText.textContent = months[index % months.length];

    const line = document.createElement('div');
    line.className = 'line';

    bar.appendChild(label);
    bar.appendChild(valueText);
    bar.appendChild(line);
    chart.appendChild(bar);

    setTimeout(() => {
        bar.style.height = `${(value / maxValue) * 100}%`;
    }, 100);
});


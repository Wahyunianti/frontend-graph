# Tampilan Halaman HTML CSS Javascript Chart

## Preview

<img width="1056" alt="Screen Shot 2024-10-08 at 18 01 52" src="https://github.com/user-attachments/assets/5035141c-dfef-41d0-bc69-b730700eb861">

## Tech
- HTML 5
- CSS
- Javascript


## Codes

### Bar Chart
Javascript :

```bash
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

```

### Pie Chart
Javascript :

```bash
//Script grafik lingkaran

const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');
const container = document.querySelector('.container-circle');

const data2 = [15000000, 85000000, 25000000, 150000000];
const labels = ['Bahan Baku', 'Gaji Karyawan', 'Pajak', 'Pendapatan'];
const colors = ['#2e4053', '#e74c3c', '#8e44ad', '#f1c40f'];
const total = data2.reduce((sum, value) => sum + value, 0);

let startAngle = 0;
const slices = [];

data2.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();

    slices.push({
        label: labels[index],
        value: value,
        startAngle: startAngle,
        endAngle: startAngle + sliceAngle,
        color: colors[index]
    });

    startAngle += sliceAngle;
});

ctx.beginPath();
ctx.arc(150, 150, 70, 0, 2 * Math.PI);
ctx.fillStyle = '#fff5d1';
ctx.fill();

ctx.fillStyle = '#000';
ctx.font = '14px Fira Sans';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Keuangan Bulan Ini', 150, 150);

function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showTooltip(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const angle = Math.atan2(mouseY - 150, mouseX - 150);
    const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;

    let found = false;

    slices.forEach(slice => {
        if (normalizedAngle >= slice.startAngle && normalizedAngle < slice.endAngle) {
            tooltip.style.display = 'block';
            tooltip.innerHTML = `${slice.label} (${formatRupiah(slice.value)})`;

            tooltip.style.left = `${event.clientX - rect.left + 10}px`;
            tooltip.style.top = `${event.clientY - rect.top - 30}px`;
            container.classList.add('show');
            found = true;
        }
    });

    if (!found) {
        tooltip.style.display = 'none';
    }
}

canvas.addEventListener('mousemove', showTooltip);
canvas.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    container.classList.remove('show');
});
```

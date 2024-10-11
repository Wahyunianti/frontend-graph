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
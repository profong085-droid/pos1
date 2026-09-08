document.addEventListener('DOMContentLoaded', () => {
    
    // --- Size Selection ---
    const sizeSelect = document.getElementById('sizeSelect');
    const receiptContainer = document.getElementById('receiptContainer');

    sizeSelect.addEventListener('change', (e) => {
        // Remove existing size classes
        receiptContainer.classList.remove('size-a4', 'size-a5');
        // Add new size class
        receiptContainer.classList.add(e.target.value);
    });

    // --- Orientation Selection ---
    const orientationSelect = document.getElementById('orientationSelect');
    
    orientationSelect.addEventListener('change', (e) => {
        if (e.target.value === 'landscape') {
            receiptContainer.classList.add('orientation-landscape');
        } else {
            receiptContainer.classList.remove('orientation-landscape');
        }
    });

    // --- Template Selection ---
    const templateSelect = document.getElementById('templateSelect');
    const roomNoContainer = document.getElementById('roomNoContainer');
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');
    const slogan = document.getElementById('slogan');
    const thCol2 = document.getElementById('thCol2');
    const thCol3 = document.getElementById('thCol3');
    const thCol4 = document.getElementById('thCol4');

    templateSelect.addEventListener('change', (e) => {
        const t = e.target.value;
        const templates = {
            'guesthouse': document.getElementById('template-guesthouse'),
            'general': document.getElementById('template-general'),
            'modern': document.getElementById('template-modern'),
            'elegant': document.getElementById('template-elegant'),
            'gold': document.getElementById('template-gold'),
            'motor': document.getElementById('template-motor'),
            'guesthouse2': document.getElementById('template-guesthouse2'),
            'gasstation2': document.getElementById('template-gasstation2')
        };

        // Hide all templates
        Object.values(templates).forEach(temp => {
            if(temp) temp.style.display = 'none';
        });

        if (t === 'general') {
            templates['general'].style.display = 'flex';
        } else if (t === 'modern') {
            templates['modern'].style.display = 'block';
        } else if (t === 'elegant') {
            templates['elegant'].style.display = 'block';
        } else if (t === 'gold') {
            templates['gold'].style.display = 'block';
        } else if (t === 'motor') {
            templates['motor'].style.display = 'block';
        } else if (t === 'guesthouse2') {
            templates['guesthouse2'].style.display = 'block';
        } else if (t === 'gasstation2') {
            templates['gasstation2'].style.display = 'block';
        } else {
            // Show Blue Template (Guest House / Gas Station)
            templates['guesthouse'].style.display = 'flex';
            
            if (t === 'guesthouse') {
                roomNoContainer.style.display = 'block';
                mainTitle.innerHTML = 'ផ្ទះសំណាក់ វិសាលសុខ';
                subTitle.innerHTML = 'VISALSOK GUEST HOUSE';
                slogan.innerHTML = 'មានទឹកក្តៅទឹកត្រជាក់';
                thCol2.innerHTML = 'ឈ្មោះទំនិញ<br>Name of Goods';
                thCol3.innerHTML = 'ចំនួន<br>Quantity';
                thCol4.innerHTML = 'តំលៃរាយ<br>Unit Price';
            } else if (t === 'gasstation') {
                roomNoContainer.style.display = 'none';
                mainTitle.innerHTML = 'ស្ថានីយ៍ប្រេងឥន្ធនៈ';
                subTitle.innerHTML = 'GAS STATION';
                slogan.innerHTML = 'មានលក់សាំង និងម៉ាស៊ូត';
                thCol2.innerHTML = 'ប្រភេទប្រេង<br>Fuel Type';
                thCol3.innerHTML = 'ចំនួនលីត្រ<br>Liters';
                thCol4.innerHTML = 'តម្លៃ/លីត្រ<br>Price/L';
            }
        }
    });

    // --- Logo Upload ---
    const logoInput = document.getElementById('logoInput');
    const logoDisplay = document.getElementById('logoDisplay');

    logoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Set the image as background of the logo circle
                logoDisplay.style.backgroundImage = `url(${event.target.result})`;
                // Add class to hide inner text/SVGs and remove borders
                logoDisplay.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Save as Image ---
    const btnImage = document.getElementById('btnImage');
    btnImage.addEventListener('click', () => {
        // Temporarily adjust some styles for a perfect screenshot if needed
        const originalBoxShadow = receiptContainer.style.boxShadow;
        receiptContainer.style.boxShadow = 'none';
        
        // Use html2canvas
        html2canvas(receiptContainer, {
            scale: 2, // Higher quality
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            // Restore styles
            receiptContainer.style.boxShadow = originalBoxShadow;
            
            // Trigger download
            const link = document.createElement('a');
            link.download = 'Receipt_' + new Date().getTime() + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('Error generating image:', err);
            alert('មានបញ្ហាក្នុងការ Save ជា Image។ (Error generating image)');
            // Restore styles on error
            receiptContainer.style.boxShadow = originalBoxShadow;
        });
    });

    // --- Save as PDF ---
    const btnPdf = document.getElementById('btnPdf');
    btnPdf.addEventListener('click', () => {
        // Determine selected size
        const currentSize = sizeSelect.value === 'size-a4' ? 'a4' : 'a5';
        // Determine orientation
        const currentOrientation = orientationSelect.value;
        
        // Temporarily adjust styles
        const originalBoxShadow = receiptContainer.style.boxShadow;
        receiptContainer.style.boxShadow = 'none';

        const opt = {
            margin:       0,
            filename:     'Receipt_' + new Date().getTime() + '.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: currentSize, orientation: currentOrientation }
        };

        // Use html2pdf
        html2pdf().set(opt).from(receiptContainer).save().then(() => {
            // Restore styles
            receiptContainer.style.boxShadow = originalBoxShadow;
        }).catch(err => {
            console.error('Error generating PDF:', err);
            alert('មានបញ្ហាក្នុងការ Save ជា PDF។ (Error generating PDF)');
            receiptContainer.style.boxShadow = originalBoxShadow;
        });
    });
});

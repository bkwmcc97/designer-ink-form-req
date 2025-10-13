document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const startingPointSelect = document.getElementById('startingPoint');
    const cmykInputs = document.getElementById('cmykInputs');
    const cmykLabel = document.querySelector('label[for="c"]');
    const pantoneNameField = document.getElementById('pantoneName');
    const pantoneLabel = document.querySelector('label[for="pantoneName"]');
    const inkNameInput = document.getElementById('inkName'); // Radius Customer Code input

    // 🔒 Restrict Radius Customer Code to digits only
    inkNameInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    });

    // Function to toggle visibility of CMYK section
    function toggleCMYKVisibility() {
        const selectedStartingPoint = startingPointSelect.value;
        if (selectedStartingPoint === 'MCC PMS Book') {
            cmykInputs.classList.add('hidden');
            cmykLabel.classList.add('hidden');
        } else {
            cmykInputs.classList.remove('hidden');
            cmykLabel.classList.remove('hidden');
        }
    }

    // Function to hide or show the Pantone Colour Name field
    function togglePantoneFieldVisibility() {
        const selectedStartingPoint = startingPointSelect.value;
        if (selectedStartingPoint === 'CMYK Breakdown') {
            pantoneNameField.classList.add('hidden');
            pantoneLabel.classList.add('hidden');
        } else {
            pantoneNameField.classList.remove('hidden');
            pantoneLabel.classList.remove('hidden');
        }
    }

    // Function to hide the "Matching to Sample - Spectro Reading" field
    function toggleMatchingtoSampleSpectroReading() {
        const selectedStartingPoint = startingPointSelect.value;
        if (selectedStartingPoint === 'Matching to Sample - Spectro Reading') {
            pantoneNameField.classList.add('hidden');
            pantoneLabel.classList.add('hidden');
            cmykInputs.classList.add('hidden');
            cmykLabel.classList.add('hidden');
        } else {
            togglePantoneFieldVisibility();
            toggleCMYKVisibility();
        }
    }

    // Initial setup
    toggleCMYKVisibility();
    togglePantoneFieldVisibility();
    toggleMatchingtoSampleSpectroReading();

    // Dropdown change logic
    startingPointSelect.addEventListener('change', function() {
        toggleCMYKVisibility();
        togglePantoneFieldVisibility();
        toggleMatchingtoSampleSpectroReading();
    });

    // Form submission
    document.getElementById("inkForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const inkName = document.getElementById("inkName").value;
        const colorStrategy = document.getElementById("colorStrategy").value;
        const stock = document.getElementById("stock").value;
        const startingPoint = document.getElementById("startingPoint").value;
        const pantoneName = document.getElementById("pantoneName").value;
        const c = document.getElementById("c").value;
        const m = document.getElementById("m").value;
        const y = document.getElementById("y").value;
        const k = document.getElementById("k").value;
        const o = document.getElementById("O").value;
        const v = document.getElementById("V").value;
        const g = document.getElementById("G").value;

        const cmykList = (startingPoint !== 'MCC PMS Book') ? `
            C: ${c}
            M: ${m}
            Y: ${y}
            K: ${k}
            O: ${o}
            V: ${v}
            G: ${g}
        ` : '';

        const fileContent = `Radius Customer Code: ${inkName}\n` +
                            `Colour Strategy: ${colorStrategy}\n` +
                            `Stock: ${stock}\n` +
                            `Starting Point: ${startingPoint}\n` +
                            `Pantone Colour Name: ${pantoneName}\n` +
                            `CMYK Breakdown:\n${cmykList}` +
                            `----------- NOTES --------------\n`;

        const blob = new Blob([fileContent], { type: "text/plain" });
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `InkForm_${timestamp}.txt`;

        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const startingPointSelect = document.getElementById('startingPoint');
    const cmykInputs = document.getElementById('cmykInputs');
    const cmykLabel = document.querySelector('label[for="c"]');
    const pantoneNameField = document.getElementById('pantoneName');
    const pantoneLabel = document.querySelector('label[for="pantoneName"]');

    // Function to toggle visibility of CMYK section
    function toggleCMYKVisibility() {
        const selectedStartingPoint = startingPointSelect.value;
        if (selectedStartingPoint === 'MCC PMS Book') {
            // Hide CMYK inputs and label
            cmykInputs.classList.add('hidden');
            cmykLabel.classList.add('hidden');
        } else {
            // Show CMYK inputs and label
            cmykInputs.classList.remove('hidden');
            cmykLabel.classList.remove('hidden');
        }
    }

    // Function to hide or show the Pantone Colour Name field
    function togglePantoneFieldVisibility() {
        const selectedStartingPoint = startingPointSelect.value;
        if (selectedStartingPoint === 'CMYK Breakdown') {
            // Hide Pantone Colour Name input and label when these options are selected
            pantoneNameField.classList.add('hidden');
            pantoneLabel.classList.add('hidden');
        } else {
            // Show Pantone Colour Name input and label for other options
            pantoneNameField.classList.remove('hidden');
            pantoneLabel.classList.remove('hidden');
        }
    }

    // Function to hide the "Matching to Sample - Spectro Reading" field
    function toggleMatchingtoSampleSpectroReading() {
        const selectedStartingPoint = startingPointSelect.value;
        // If 'Matching to Sample - Spectro Reading' is selected, hide the Pantone Name and CMYK sections
        if (selectedStartingPoint === 'Matching to Sample - Spectro Reading') {
            pantoneNameField.classList.add('hidden');
            pantoneLabel.classList.add('hidden');
            cmykInputs.classList.add('hidden');
            cmykLabel.classList.add('hidden');
        } else {
            // Otherwise, ensure Pantone and CMYK fields are visible based on other logic
            togglePantoneFieldVisibility();
            toggleCMYKVisibility();
        }
    }

    // Initial checks to hide/show inputs based on default value
    toggleCMYKVisibility();
    togglePantoneFieldVisibility();
    toggleMatchingtoSampleSpectroReading();

    // Event listener for changes to the starting point dropdown
    startingPointSelect.addEventListener('change', function() {
        toggleCMYKVisibility();
        togglePantoneFieldVisibility();
        toggleMatchingtoSampleSpectroReading();
    });

    // Form submission logic
    document.getElementById("inkForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const inkName = document.getElementById("inkName").value;
        const colorStrategy = document.getElementById("colorStrategy").value;
        const startingPoint = document.getElementById("startingPoint").value;
        const pantoneName = document.getElementById("pantoneName").value;

        // Get the CMYK values (if available)
        const c = document.getElementById("c").value;
        const m = document.getElementById("m").value;
        const y = document.getElementById("y").value;
        const k = document.getElementById("k").value;
        const o = document.getElementById("O").value;
        const v = document.getElementById("V").value;
        const g = document.getElementById("G").value;

        // Format CMYK as a list (only include if CMYK inputs are visible)
        const cmykList = (startingPoint !== 'MCC PMS Book') ? `
            C: ${c}
            M: ${m}
            Y: ${y}
            K: ${k}
            O: ${o}
            V: ${v}
            G: ${g}
        ` : '';

        // Create the content to be saved in the text file
        const fileContent = `Radius Customer Code: ${inkName}\n` +
                            `Colour Strategy: ${colorStrategy}\n` +
                            `Starting Point: ${startingPoint}\n` +
                            `Pantone Colour Name: ${pantoneName}\n` + // Include Pantone name
                            `CMYK Breakdown:\n${cmykList}` +
                            `----------- NOTES --------------\n`;

        // Create a Blob with the file content
        const blob = new Blob([fileContent], { type: "text/plain" });
        const link = document.createElement("a");

        // Generate a timestamped filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `InkForm_${timestamp}.txt`;

        // Create a download link for the file
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        // Simulate a click to download the file
        link.click();
    });
});

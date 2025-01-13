const indoorButton = document.getElementById("indoor");
        const outdoorButton = document.getElementById("outdoor");

        const presetSizes = {
            small: { width: 10, height: 6 },
            medium: { width: 16, height: 9 },
            large: { width: 20, height: 12 },
            xlarge: { width: 32, height: 18 }
        };

        const productDetails = {
            p15: { name: "P1.5 LED Wall Panel", price: 70, weight: 8.5, resolution: "1.5mm" },
            p199: { name: "P1.99 LED Wall Panel", price: 65, weight: 8.2, resolution: "1.99mm" },
            p25: { name: "P2.5 LED Wall Panel", price: 60, weight: 7.8, resolution: "2.5mm" },
            p26: { name: "P2.6 LED Wall Panel", price: 55, weight: 7.5, resolution: "2.6mm" },
            p29: { name: "P2.9 LED Wall Panel", price: 50, weight: 7.2, resolution: "2.9mm" },
            p39: { name: "P3.9 LED Wall Panel", price: 45, weight: 6.8, resolution: "3.9mm" },
            p48: { name: "P4.8 LED Wall Panel", price: 40, weight: 6.5, resolution: "4.8mm" },
            p5: { name: "P5 LED Wall Panel", price: 35, weight: 6.2, resolution: "5.0mm" }
        };

        function applyPreset() {
            const preset = document.getElementById("presetSize").value;
            if (preset !== "custom") {
                document.getElementById("width").value = presetSizes[preset].width;
                document.getElementById("height").value = presetSizes[preset].height;
                calculateCost();
            }
        }

        function updateDimensionLabels() {
            const unit = document.getElementById("unit").value;
            const widthHelper = document.getElementById("widthHelper");
            const heightHelper = document.getElementById("heightHelper");
            
            const recommendations = {
                'feet': 'Recommended: 10-32 feet',
                'feet-inch': 'Recommended: 10ft-32ft'
            };
            
            widthHelper.textContent = recommendations[unit];
            heightHelper.textContent = recommendations[unit];
        }

        function resetForm() {
            document.getElementById("presetSize").value = "custom";
            document.getElementById("width").value = "";
            document.getElementById("height").value = "";
            document.getElementById("results").innerHTML = "<p>Your results will appear here...</p>";
        }

        function calculateCost() {
            const width = parseFloat(document.getElementById("width").value);
            const height = parseFloat(document.getElementById("height").value);
            const product = document.getElementById("product").value;
            const isIndoor = indoorButton.classList.contains("active");

            if (!width || !height || width <= 0 || height <= 0) {
                document.getElementById("results").innerHTML =
                    "<p style='color: red;'>Please provide valid dimensions.</p>";
                return;
            }

            const area = (width * height).toFixed(3);
            const productInfo = productDetails[product];
            const panelArea = 0.5; // Each panel is 0.5 square units
            const totalPanels = Math.ceil(area / panelArea);
            
            const baseCost = (totalPanels * productInfo.price).toFixed(2);
            const installationCost = (baseCost * 0.2).toFixed(2);
            const transportCost = 500.00;
            const totalWeight = (totalPanels * productInfo.weight).toFixed(3);
            const totalCost = (parseFloat(baseCost) + parseFloat(installationCost) + parseFloat(transportCost)).toFixed(2);

            document.getElementById("results").innerHTML = `
                <div class="result-card total">
                    <h3>Total Cost (Approximate)</h3>
                    <p class="highlight">$${parseFloat(totalCost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <p>Installation Type: ${isIndoor ? "Indoor" : "Outdoor"}</p>
                </div>
                <div class="result-card">
                    <h3>Cost Breakdown</h3>
                    <p><strong>Panels Cost:</strong> $${parseFloat(baseCost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <p><strong>Installation:</strong> $${parseFloat(installationCost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <p><strong>Transport:</strong> $${parseFloat(transportCost).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div class="result-card">
                    <h3>Physical Specifications</h3>
                    <p><strong>Total Area:</strong> ${area} sq ${document.getElementById("unit").value}</p>
                    <p><strong>Number of Panels:</strong> ${totalPanels}</p>
                    <p><strong>Total Weight:</strong> ${totalWeight} lbs</p>
                    <p><strong>Resolution:</strong> ${productInfo.resolution}</p>
                </div>
            `;
        }

        // Initialize dimension helpers
        updateDimensionLabels();

        // Event listeners for indoor/outdoor toggle
        indoorButton.addEventListener("click", () => {
            indoorButton.classList.add("active");
            outdoorButton.classList.remove("active");
            if (document.getElementById("width").value) calculateCost();
        });

        outdoorButton.addEventListener("click", () => {
            outdoorButton.classList.add("active");
            indoorButton.classList.remove("active");
            if (document.getElementById("width").value) calculateCost();
        });
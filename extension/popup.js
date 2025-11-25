// Material Database
const materialDB = {
  aluminium: { energy: 15.2, co2: 12.5, circularity_base: 75 },
  copper: { energy: 7.5, co2: 6.8, circularity_base: 65 },
  steel: { energy: 20.0, co2: 18.0, circularity_base: 60 },
  nickel: { energy: 35.0, co2: 28.0, circularity_base: 50 },
  iron: { energy: 18.5, co2: 16.2, circularity_base: 58 },
  zinc: { energy: 13.0, co2: 11.5, circularity_base: 62 },
  brass: { energy: 12.0, co2: 10.2, circularity_base: 68 },
  bronze: { energy: 14.0, co2: 12.0, circularity_base: 66 },
  titanium: { energy: 45.0, co2: 38.0, circularity_base: 45 }
};

// LCA Model
function runLCAModel(inputs) {
  const materialData = materialDB[inputs.material];
  if (!materialData) {
    throw new Error(`Material "${inputs.material}" not found`);
  }

  const energyUsed = inputs.energy > 0 ? inputs.energy : materialData.energy;
  
  // Calculate CO2
  const materialCO2 = materialData.co2;
  const energyCO2 = energyUsed * 0.5;
  const transportCO2 = inputs.transport * 0.00015;
  const totalCO2 = materialCO2 + energyCO2 + transportCO2;

  // Calculate circularity score
  const baseScore = materialData.circularity_base;
  const recycledBonus = inputs.recycled * 0.3;
  const transportPenalty = (inputs.transport / 1000) * 2;
  const energyPenalty = (energyUsed / 50) * 10;
  
  let circularityScore = baseScore + recycledBonus - transportPenalty - energyPenalty;
  circularityScore = Math.max(0, Math.min(100, circularityScore));

  // Generate recommendations
  const recommendations = [];
  
  if (inputs.recycled < 50) {
    const target = Math.min(inputs.recycled + 20, 100);
    const improvement = (20 * 0.3).toFixed(0);
    recommendations.push(
      `Increase recycled content to ${target}% to improve circularity by ${improvement} points`
    );
  }
  
  if (inputs.transport > 500) {
    recommendations.push(
      "Consider local sourcing to reduce transport emissions and improve circularity score"
    );
  }
  
  if (energyUsed > 10) {
    recommendations.push(
      "Optimize energy efficiency or switch to renewable energy sources to reduce carbon footprint"
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("Excellent sustainability profile! Maintain current practices.");
  }

  return {
    materialCO2,
    energyCO2,
    transportCO2,
    totalCO2,
    circularityScore,
    recommendations
  };
}

// Display results
function displayResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.classList.add('visible');

  // Update gauge
  const score = Math.round(results.circularityScore);
  document.getElementById('gaugeScore').textContent = score;
  
  const rating = score >= 70 ? 'Excellent' : score >= 40 ? 'Good' : 'Needs Improvement';
  const color = score >= 70 ? '#66bb6a' : score >= 40 ? '#ffc107' : '#ef5350';
  document.getElementById('gaugeRating').textContent = rating;
  document.getElementById('gaugeRating').style.color = color;
  document.getElementById('gaugeScore').style.color = color;
  
  const gaugeFill = document.getElementById('gaugeFill');
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (score / 100) * circumference;
  gaugeFill.style.strokeDasharray = circumference;
  gaugeFill.style.strokeDashoffset = circumference;
  gaugeFill.style.stroke = color;
  
  setTimeout(() => {
    gaugeFill.style.strokeDashoffset = offset;
  }, 100);

  // Update chart
  const maxValue = Math.max(results.materialCO2, results.energyCO2, results.transportCO2);
  
  document.getElementById('barMaterial').style.width = '0%';
  document.getElementById('barEnergy').style.width = '0%';
  document.getElementById('barTransport').style.width = '0%';
  
  setTimeout(() => {
    document.getElementById('barMaterial').style.width = `${(results.materialCO2 / maxValue) * 100}%`;
    document.getElementById('barEnergy').style.width = `${(results.energyCO2 / maxValue) * 100}%`;
    document.getElementById('barTransport').style.width = `${(results.transportCO2 / maxValue) * 100}%`;
  }, 100);
  
  document.getElementById('valMaterial').textContent = `${results.materialCO2.toFixed(2)} kg`;
  document.getElementById('valEnergy').textContent = `${results.energyCO2.toFixed(2)} kg`;
  document.getElementById('valTransport').textContent = `${results.transportCO2.toFixed(2)} kg`;
  document.getElementById('totalCO2').textContent = `${results.totalCO2.toFixed(2)} kg`;

  // Update recommendations
  const recList = document.getElementById('recommendationsList');
  recList.innerHTML = '';
  results.recommendations.forEach(rec => {
    const li = document.createElement('li');
    li.textContent = rec;
    recList.appendChild(li);
  });

  // Scroll to results
  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Autofill from page
document.getElementById('autofillBtn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageData
    });
    
    if (results && results[0] && results[0].result) {
      const data = results[0].result;
      
      if (data.material) document.getElementById('material').value = data.material;
      if (data.processType) document.getElementById('processType').value = data.processType;
      if (data.productType) document.getElementById('productType').value = data.productType;
      if (data.energy) document.getElementById('energy').value = data.energy;
      if (data.transport) document.getElementById('transport').value = data.transport;
      if (data.recycled) document.getElementById('recycled').value = data.recycled;
      
      // Show feedback
      const btn = document.getElementById('autofillBtn');
      const originalText = btn.textContent;
      btn.textContent = '✅ Autofilled!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  } catch (error) {
    console.error('Autofill error:', error);
    alert('Could not autofill from page. Please enter values manually.');
  }
});

// This function runs in the page context
function extractPageData() {
  const text = document.body.innerText.toLowerCase();
  const data = {};

  // Extract materials
  const materials = ['aluminium', 'aluminum', 'copper', 'steel', 'nickel', 'iron', 'zinc', 'brass', 'bronze', 'titanium'];
  for (const mat of materials) {
    if (text.includes(mat)) {
      data.material = mat === 'aluminum' ? 'aluminium' : mat;
      break;
    }
  }

  // Extract process types
  const processes = ['extrusion', 'rolling', 'casting', 'forging', 'drawing'];
  for (const proc of processes) {
    if (text.includes(proc)) {
      data.processType = proc;
      break;
    }
  }

  // Extract product types
  const products = ['sheet', 'rod', 'wire', 'plate', 'bar', 'coil', 'tube'];
  for (const prod of products) {
    if (text.includes(prod)) {
      data.productType = prod;
      break;
    }
  }

  // Extract energy (kWh, MJ, GJ)
  const energyMatch = text.match(/(\d+\.?\d*)\s*(kwh|mj|gj)/i);
  if (energyMatch) {
    let value = parseFloat(energyMatch[1]);
    const unit = energyMatch[2].toLowerCase();
    if (unit === 'mj') value = value / 3.6;
    if (unit === 'gj') value = value / 0.0036;
    data.energy = value.toFixed(1);
  }

  // Extract transport (km)
  const transportMatch = text.match(/(\d+)\s*km/i);
  if (transportMatch) {
    data.transport = transportMatch[1];
  }

  // Extract recycled content (%)
  const recycledMatch = text.match(/(\d+)\s*%\s*recycled|recycled\s*(\d+)\s*%/i);
  if (recycledMatch) {
    data.recycled = recycledMatch[1] || recycledMatch[2];
  }

  return data;
}

// Run model
document.getElementById('runModelBtn').addEventListener('click', () => {
  const inputs = {
    material: document.getElementById('material').value,
    processType: document.getElementById('processType').value,
    productType: document.getElementById('productType').value,
    energy: parseFloat(document.getElementById('energy').value) || 0,
    transport: parseFloat(document.getElementById('transport').value) || 0,
    recycled: parseFloat(document.getElementById('recycled').value) || 0
  };

  try {
    const results = runLCAModel(inputs);
    displayResults(results);
  } catch (error) {
    alert(error.message);
  }
});

// Reset
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('material').value = 'aluminium';
  document.getElementById('processType').value = 'extrusion';
  document.getElementById('productType').value = 'sheet';
  document.getElementById('energy').value = '';
  document.getElementById('transport').value = '';
  document.getElementById('recycled').value = '';
  document.getElementById('results').classList.remove('visible');
});

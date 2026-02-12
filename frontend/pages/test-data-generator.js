// Test Data Generator Page
function TestDataGeneratorPage() {
    return `
        <div class="desktop-app">
            <div class="window-header">
                <div class="window-title">
                    <span>🧪 Test Data Generator</span>
                </div>
                <div class="window-controls">
                    <button class="control-btn close">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="window-content" style="padding: 2rem; background: #1e1e1e;">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h1 style="color: #fff; margin-bottom: 2rem; text-align: center;">🧪 Générateur de Données de Test</h1>
                    
                    <div style="background: #2d2d30; border: 2px solid #3e3e42; border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                        <h2 style="color: #4caf50; margin-bottom: 1rem;">📊 Ajouter des factures pour plusieurs années</h2>
                        <p style="color: #999; margin-bottom: 2rem;">Cliquez sur le bouton ci-dessous pour ajouter des factures de test pour les années 2023-2027</p>
                        
                        <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                            <div style="display: flex; justify-content: space-between; padding: 1rem; background: #1e1e1e; border-radius: 8px;">
                                <span style="color: #ccc;">2023:</span>
                                <span style="color: #4caf50; font-weight: 600;">5 factures</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 1rem; background: #1e1e1e; border-radius: 8px;">
                                <span style="color: #ccc;">2024:</span>
                                <span style="color: #4caf50; font-weight: 600;">8 factures</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 1rem; background: #1e1e1e; border-radius: 8px;">
                                <span style="color: #ccc;">2025:</span>
                                <span style="color: #4caf50; font-weight: 600;">10 factures</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 1rem; background: #1e1e1e; border-radius: 8px;">
                                <span style="color: #ccc;">2026:</span>
                                <span style="color: #4caf50; font-weight: 600;">6 factures</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 1rem; background: #1e1e1e; border-radius: 8px;">
                                <span style="color: #ccc;">2027:</span>
                                <span style="color: #4caf50; font-weight: 600;">3 factures</span>
                            </div>
                        </div>
                        
                        <button onclick="generateTestData()" style="width: 100%; padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: 600; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                            🚀 Générer les données de test
                        </button>
                        
                        <div id="progressContainer" style="display: none; margin-top: 2rem;">
                            <div style="background: #1e1e1e; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                                <div id="progressText" style="color: #4caf50; margin-bottom: 0.5rem;"></div>
                                <div style="background: #3e3e42; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div id="progressBar" style="background: linear-gradient(90deg, #4caf50, #8bc34a); height: 100%; width: 0%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            <div id="logContainer" style="background: #1e1e1e; border-radius: 8px; padding: 1rem; max-height: 300px; overflow-y: auto; font-family: monospace; font-size: 0.9rem;">
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="router.navigate('/dashboard-chaimae')" style="padding: 1rem 2rem; background: #3e3e42; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            ← Retour au Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate test data
window.generateTestData = async function () {
    const progressContainer = document.getElementById('progressContainer');
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');
    const logContainer = document.getElementById('logContainer');

    progressContainer.style.display = 'block';
    logContainer.innerHTML = '';

    function log(message, color = '#4caf50') {
        const line = document.createElement('div');
        line.style.color = color;
        line.style.marginBottom = '0.5rem';
        line.textContent = message;
        logContainer.appendChild(line);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    try {
        log('🚀 Démarrage de la génération des données...', '#667eea');

        // Create test client first
        log('👤 Création du client de test...');
        const clientResult = await window.electron.dbChaimae.addClient({
            nom: 'Client Test',
            ice: 'ICEAzer190@789',
            adresse: 'Adresse Test',
            ville: 'Casablanca',
            telephone: '0600000000'
        });

        const clientId = clientResult.data;
        log(`✅ Client créé avec ID: ${clientId}`, '#4caf50');

        const years = [
            { year: 2023, count: 5 },
            { year: 2024, count: 8 },
            { year: 2025, count: 10 },
            { year: 2026, count: 6 },
            { year: 2027, count: 3 }
        ];

        let totalInvoices = years.reduce((sum, y) => sum + y.count, 0);
        let processedInvoices = 0;

        for (const yearData of years) {
            log(`\n📅 Ajout de ${yearData.count} factures pour ${yearData.year}...`, '#667eea');

            for (let i = 0; i < yearData.count; i++) {
                const month = Math.floor(Math.random() * 12) + 1;
                const day = Math.floor(Math.random() * 28) + 1;
                const date = `${yearData.year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                const docTypes = ['facture', 'devis', 'bon_livraison'];
                const docType = docTypes[Math.floor(Math.random() * docTypes.length)];

                const totalHT = Math.floor(Math.random() * 50000) + 1000;
                const tvaRate = 20;
                const montantTVA = totalHT * (tvaRate / 100);
                const totalTTC = totalHT + montantTVA;

                const invoice = {
                    client_id: clientId,
                    document_type: docType,
                    document_date: date,
                    year: yearData.year,
                    total_ht: totalHT,
                    tva_rate: tvaRate,
                    montant_tva: montantTVA,
                    total_ttc: totalTTC,
                    items: []
                };

                await window.electron.dbChaimae.addInvoice(invoice);

                processedInvoices++;
                const progress = (processedInvoices / totalInvoices) * 100;
                progressBar.style.width = progress + '%';
                progressText.textContent = `Progression: ${processedInvoices}/${totalInvoices} factures`;

                log(`  ✅ ${docType} ajouté pour ${date}`, '#8bc34a');
            }
        }

        log('\n🎉 SUCCÈS! Toutes les factures de test ont été ajoutées!', '#4caf50');
        log('💡 Vous pouvez maintenant tester le sélecteur d\'année', '#667eea');

        setTimeout(() => {
            window.notify.success('Succès', 'Données de test générées avec succès!', 3000);
        }, 500);

    } catch (error) {
        console.error('Error generating test data:', error);
        log(`\n❌ Erreur: ${error.message}`, '#f44336');
        window.notify.error('Erreur', 'Erreur lors de la génération des données', 3000);
    }
}

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const API_URL = 'http://localhost:8001';
const COMPANIES = ['skm', 'saaiss', 'benali', 'msh3'];

async function testCompany(company) {
    console.log(`\nTesting company: ${company}...`);
    try {
        // 1. Add Devis
        const devisNum = `TEST-${Date.now()}`;
        console.log(`  Adding Devis: ${devisNum}`);
        const addDevisRes = await axios.post(`${API_URL}/devis/${company}`, {
            devis_number: devisNum,
            year: 2025
        });
        console.log('  ✅ Devis added');

        // 2. Upload PDF
        console.log('  Uploading PDF...');
        const dummyPdfPath = path.join(__dirname, 'test_dummy.pdf');
        if (!fs.existsSync(dummyPdfPath)) {
            fs.writeFileSync(dummyPdfPath, 'Dummy PDF Content');
        }

        const formData = new FormData();
        formData.append('pdf', fs.createReadStream(dummyPdfPath), {
            filename: `Devis-${devisNum}.pdf`,
            contentType: 'application/pdf'
        });

        const uploadRes = await axios.post(`${API_URL}/api/upload/${company}`, formData, {
            headers: formData.getHeaders()
        });

        if (uploadRes.data.success) {
            console.log('  ✅ PDF Uploaded:', uploadRes.data.filePath);

            // 3. Save PDF Path (using the uploaded path)
            console.log('  Saving PDF Path to DB...');
            await axios.post(`${API_URL}/pdf/${company}`, {
                devis_number: devisNum,
                year: 2025,
                file_path: uploadRes.data.filePath,
                created_by: 'TEST_USER'
            });
            console.log('  ✅ PDF Path saved in DB');

            // 4. Verify File Exists on Server (Static Serve)
            // Note: server.js uses app.use('/uploads', ...) mapping to ../uploads
            // We need to check if we can fetch it via HTTP
            const fileUrl = `${API_URL}${uploadRes.data.filePath}`;
            console.log(`  Verifying static file access: ${fileUrl}`);
            try {
                const staticFileRes = await axios.get(fileUrl);
                if (staticFileRes.status === 200) {
                    console.log('  ✅ Static file is accessible');
                }
            } catch (err) {
                console.error('  ❌ Failed to access static file:', err.message);
            }

        } else {
            console.error('  ❌ Upload failed:', uploadRes.data);
        }

    } catch (error) {
        console.error(`  ❌ Error testing ${company}:`, error.response ? error.response.data : error.message);
    }
}

async function runTests() {
    console.log('🚀 Starting API Tests with Upload...');
    for (const company of COMPANIES) {
        await testCompany(company);
    }
    console.log('\n🏁 Tests Completed.');
}

runTests();

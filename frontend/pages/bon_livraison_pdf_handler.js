/**
 * Bon de Livraison PDF Download Handler - CHAIMAE
 * ================================================
 * 
 * ملف منفصل لتحميل PDF خاص بـ "Bon de livraison" فقط
 * يمكن استخدامه في أي مكان في التطبيق
 * 
 * الاستخدام:
 * downloadBonLivraisonPDF(invoiceId)
 */

// ============================================
// 1️⃣ دالة التحميل الرئيسية
// ============================================
window.downloadBonLivraisonPDF = async function(invoiceId) {
    try {
        console.log('📥 Generating Bon de Livraison PDF:', invoiceId);
        
        // جلب بيانات الفاتورة
        const result = await window.electron.dbChaimae.getInvoiceById(invoiceId);
        
        if (!result.success || !result.data) {
            throw new Error('Document introuvable');
        }
        
        const invoice = result.data;
        
        // التحقق من أن النوع هو "Bon de livraison" فقط
        if (invoice.document_type !== 'bon_livraison' && invoice.document_type !== 'bl') {
            throw new Error('هذا المستند ليس "Bon de livraison"');
        }
        
        console.log('✅ Document Type:', invoice.document_type);
        console.log('✅ Order Number:', invoice.document_numero_commande);
        
        // ============================================
        // 2️⃣ عرض نافذة اختيار رقم الأمر (إن وجد)
        // ============================================
        const hasBC = invoice.document_numero_commande && invoice.document_numero_commande.trim() !== '';
        
        if (hasBC) {
            const includeBC = await showBonLivraisonModal(invoice.document_numero_commande);
            
            if (!includeBC) {
                console.log('⚠️ User chose not to include Order number');
                invoice.document_numero_commande = null;
            } else {
                console.log('✅ Including Order number:', invoice.document_numero_commande);
            }
        }
        
        // ============================================
        // 3️⃣ التحقق من المنتجات بقيم صفرية
        // ============================================
        const hasZeroProducts = invoice.products && invoice.products.some(p => 
            parseFloat(p.quantite) === 0 || parseFloat(p.prix_unitaire_ht) === 0
        );
        
        let includeZeroProducts = true;
        
        if (hasZeroProducts) {
            includeZeroProducts = await showZeroProductsModal();
            console.log('🔍 User choice for zero products:', includeZeroProducts ? 'Include' : 'Exclude');
        }
        
        // ============================================
        // 4️⃣ تحميل مكتبة jsPDF
        // ============================================
        if (typeof window.jspdf === 'undefined') {
            await loadJsPDFLibrary();
        }
        
        // ============================================
        // 5️⃣ إنشاء وتوليد PDF
        // ============================================
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // الألوان
        const colors = {
            blue: [33, 97, 140],      // #21618C
            green: [76, 175, 80],     // #4caf50
            orange: [255, 152, 0],    // #FF9800
            lightGray: [245, 245, 245],
            darkGray: [96, 125, 139]
        };
        
        const dateStr = (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR');
        
        // إضافة الرأس والمحتوى
        addBonLivraisonHeader(doc, invoice, colors, dateStr);
        addBonLivraisonTable(doc, invoice, colors, includeZeroProducts);
        addBonLivraisonFooter(doc, colors);
        
        // ============================================
        // 6️⃣ حفظ الملف
        // ============================================
        const docNumero = invoice.document_numero_bl || invoice.document_numero || 'N';
        const filename = `Bon_de_livraison_${docNumero}_${invoice.client_nom}.pdf`;
        doc.save(filename);
        
        window.notify.success('✅ نجاح', 'تم تحميل Bon de livraison بنجاح', 3000);
        
    } catch (error) {
        console.error('❌ Error:', error);
        window.notify.error('❌ خطأ', error.message, 4000);
    }
};

// ============================================
// 2️⃣ نافذة اختيار رقم الأمر
// ============================================
function showBonLivraisonModal(orderNumber) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        overlay.innerHTML = `
            <div class="custom-modal" style="
                background: #2d2d30;
                border: 2px solid #3e3e42;
                border-radius: 12px;
                padding: 0;
                min-width: 400px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            ">
                <!-- Header -->
                <div style="
                    background: linear-gradient(135deg, #FF9800 0%, #FB8C00 100%);
                    padding: 1.5rem;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                ">
                    <span style="font-size: 1.5rem;">📦</span>
                    <h3 style="
                        margin: 0;
                        color: white;
                        font-size: 1.2rem;
                        font-weight: 600;
                    ">Télécharger Bon de Livraison</h3>
                </div>
                
                <!-- Body -->
                <div style="
                    padding: 2rem;
                    color: #e0e0e0;
                ">
                    <p style="
                        margin: 0 0 1.5rem 0;
                        font-size: 0.95rem;
                        color: #b0b0b0;
                    ">
                        N° Order actuel:
                    </p>
                    <div style="
                        background: #1e1e1e;
                        border: 2px solid #FF9800;
                        border-radius: 8px;
                        padding: 1rem;
                        margin-bottom: 1.5rem;
                        text-align: center;
                    ">
                        <span style="
                            font-size: 1.3rem;
                            font-weight: 600;
                            color: #FF9800;
                        ">${orderNumber}</span>
                    </div>
                    
                    <label style="
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        padding: 1rem;
                        background: #1e1e1e;
                        border: 2px solid #FF9800;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                    ">
                        <input type="checkbox" id="includeBCCheckbox" checked style="
                            width: 20px;
                            height: 20px;
                            margin-right: 1rem;
                            cursor: pointer;
                            accent-color: #FF9800;
                        ">
                        <span style="
                            font-size: 0.95rem;
                            color: #e0e0e0;
                            font-weight: 500;
                        ">
                            ✅ إضافة رقم الأمر في PDF
                        </span>
                    </label>
                </div>
                
                <!-- Footer -->
                <div style="
                    display: flex;
                    gap: 1rem;
                    padding: 1.5rem;
                    border-top: 1px solid #3e3e42;
                    justify-content: flex-end;
                ">
                    <button id="cancelBtn" style="
                        padding: 0.75rem 1.5rem;
                        background: #3e3e42;
                        color: #e0e0e0;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    ">إلغاء</button>
                    <button id="continueBtn" style="
                        padding: 0.75rem 2rem;
                        background: linear-gradient(135deg, #FF9800 0%, #FB8C00 100%);
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.2s ease;
                    ">📥 تحميل</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const checkbox = overlay.querySelector('#includeBCCheckbox');
        const continueBtn = overlay.querySelector('#continueBtn');
        const cancelBtn = overlay.querySelector('#cancelBtn');
        
        continueBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(checkbox.checked);
        });
        
        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(false);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(checkbox.checked);
            }
        });
        
        setTimeout(() => continueBtn.focus(), 100);
    });
}

// ============================================
// 3️⃣ نافذة المنتجات بقيم صفرية
// ============================================
function showZeroProductsModal() {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        overlay.innerHTML = `
            <div class="custom-modal" style="
                background: #2d2d30;
                border: 2px solid #3e3e42;
                border-radius: 12px;
                padding: 0;
                min-width: 400px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            ">
                <!-- Header -->
                <div style="
                    background: linear-gradient(135deg, #FF9800 0%, #FB8C00 100%);
                    padding: 1.5rem;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                ">
                    <span style="font-size: 1.5rem;">⚠️</span>
                    <h3 style="
                        margin: 0;
                        color: white;
                        font-size: 1.2rem;
                        font-weight: 600;
                    ">منتجات بقيم صفرية</h3>
                </div>
                
                <!-- Body -->
                <div style="
                    padding: 2rem;
                    color: #e0e0e0;
                ">
                    <p style="
                        margin: 0 0 1rem 0;
                        font-size: 0.95rem;
                        color: #b0b0b0;
                    ">
                        بعض المنتجات لها <strong style="color: #FF9800;">كمية = 0</strong> أو <strong style="color: #FF9800;">سعر = 0</strong>
                    </p>
                    <p style="
                        margin: 0;
                        font-size: 0.9rem;
                        color: #999;
                    ">
                        هل تريد عرضها في PDF؟
                    </p>
                </div>
                
                <!-- Footer -->
                <div style="
                    display: flex;
                    gap: 1rem;
                    padding: 1.5rem;
                    border-top: 1px solid #3e3e42;
                    justify-content: flex-end;
                ">
                    <button id="excludeBtn" style="
                        padding: 0.75rem 1.5rem;
                        background: #3e3e42;
                        color: #e0e0e0;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    ">❌ لا، أخفها</button>
                    <button id="includeBtn" style="
                        padding: 0.75rem 1.5rem;
                        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.2s ease;
                    ">✅ نعم، أظهرها</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const excludeBtn = overlay.querySelector('#excludeBtn');
        const includeBtn = overlay.querySelector('#includeBtn');
        
        excludeBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(false);
        });
        
        includeBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(true);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(true);
            }
        });
        
        setTimeout(() => includeBtn.focus(), 100);
    });
}

// ============================================
// 4️⃣ تحميل مكتبة jsPDF
// ============================================
function loadJsPDFLibrary() {
    return new Promise((resolve, reject) => {
        if (typeof window.jspdf !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load jsPDF'));
        document.head.appendChild(script);
    });
}

// ============================================
// 5️⃣ إضافة الرأس
// ============================================
function addBonLivraisonHeader(doc, invoice, colors, dateStr) {
    // شعار الشركة
    try {
        const logoImg = document.querySelector('img[src*="chaimae.png"]') || 
                       document.querySelector('img[data-asset="chaimae"]') ||
                       document.querySelector('img[src^="data:image"]');
        if (logoImg && logoImg.src && logoImg.src.startsWith('data:')) {
            doc.addImage(logoImg.src, 'PNG', 15, 10, 35, 35);
        }
    } catch (error) {
        console.log('Logo not added:', error);
    }
    
    // عنوان الشركة
    doc.setFontSize(18);
    doc.setTextColor(...colors.blue);
    doc.setFont(undefined, 'bold');
    doc.text('CHAIMAE ERRBAHI MDIQ sarl (AU)', 105, 20, { align: 'center' });
    
    // معلومات الشركة
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('Patente N° 52003366 - NIF : 40190505', 105, 27, { align: 'center' });
    doc.text('RC N° : 10487 - CNSS : 8721591', 105, 32, { align: 'center' });
    doc.text('ICE : 001544861000014', 105, 37, { align: 'center' });
    
    // معلومات العميل
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('CLIENT :', 15, 55);
    doc.setTextColor(...colors.green);
    doc.text(invoice.client_nom, 40, 55);
    
    if (invoice.client_ice && invoice.client_ice !== '0') {
        doc.setTextColor(0, 0, 0);
        doc.text('ICE :', 15, 62);
        doc.setTextColor(...colors.green);
        doc.text(invoice.client_ice, 40, 62);
    }
    
    // التاريخ
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${dateStr}`, 150, 55);
    
    // رقم Bon de Livraison
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('BON DE LIVRAISON N°:', 15, 75);
    doc.setTextColor(...colors.orange);
    const docNumero = invoice.document_numero_bl || invoice.document_numero || '-';
    doc.text(docNumero, 80, 75);
    
    // رقم الأمر (إن وجد)
    if (invoice.document_numero_commande) {
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('N° Order :', 15, 82);
        doc.setTextColor(...colors.orange);
        doc.text(invoice.document_numero_commande, 40, 82);
    }
}

// ============================================
// 6️⃣ إضافة جدول المنتجات
// ============================================
function addBonLivraisonTable(doc, invoice, colors, includeZeroProducts) {
    const startY = invoice.document_numero_commande ? 92 : 85;
    
    // رأس الجدول
    doc.setFillColor(...colors.blue);
    doc.rect(15, startY, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Désignation', 18, startY + 5.5);
    doc.text('QTE', 115, startY + 5.5, { align: 'center' });
    doc.text('PU HT', 150, startY + 5.5, { align: 'right' });
    doc.text('TOTAL HT', 188, startY + 5.5, { align: 'right' });
    
    // محتوى الجدول
    let currentY = startY + 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    
    let pageCount = 1;
    const pages = [];
    
    invoice.products.forEach((product, index) => {
        const designation = product.designation || '';
        const lines = doc.splitTextToSize(designation, 85);
        const rowHeight = Math.max(8, (lines.length * 4.5) + 4);
        
        let remainingLines = [...lines];
        let isFirstPart = true;
        
        while (remainingLines.length > 0) {
            const availableSpace = 215 - currentY;
            
            if (availableSpace < 15) {
                pages.push(pageCount);
                doc.addPage();
                addBonLivraisonHeader(doc, invoice, colors, (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR'));
                pageCount++;
                
                let newStartY = invoice.document_numero_commande ? 92 : 85;
                
                doc.setFillColor(...colors.blue);
                doc.rect(15, newStartY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Désignation', 18, newStartY + 5.5);
                doc.text('QTE', 115, newStartY + 5.5, { align: 'center' });
                doc.text('PU HT', 150, newStartY + 5.5, { align: 'right' });
                doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                continue;
            }
            
            const maxLinesPerPage = Math.floor((availableSpace - 10) / 4.5);
            const linesToDraw = remainingLines.splice(0, Math.max(1, maxLinesPerPage));
            const partialRowHeight = Math.max(8, (linesToDraw.length * 4.5) + 4);
            
            // تلوين الصفوف
            if (isFirstPart && index % 2 === 0) {
                doc.setFillColor(...colors.lightGray);
                doc.rect(15, currentY - 3, 180, partialRowHeight, 'F');
            }
            
            doc.setFontSize(8);
            linesToDraw.forEach((line, lineIndex) => {
                doc.text(line, 18, currentY + 3 + (lineIndex * 4.5));
            });
            
            if (isFirstPart) {
                const centerOffset = (linesToDraw.length > 1) ? ((linesToDraw.length - 1) * 2.25) : 0;
                
                const qty = parseFloat(product.quantite);
                if (includeZeroProducts || qty !== 0) {
                    doc.text(String(product.quantite || ''), 115, currentY + 3 + centerOffset, { align: 'center' });
                }
                
                doc.setFontSize(7.5);
                const price = parseFloat(product.prix_unitaire_ht);
                if (includeZeroProducts || price !== 0) {
                    doc.text(`${formatNumberForPDF(product.prix_unitaire_ht)} DH`, 150, currentY + 3 + centerOffset, { align: 'right' });
                }
                
                const total = parseFloat(product.total_ht);
                if (includeZeroProducts || total !== 0) {
                    doc.text(`${formatNumberForPDF(product.total_ht)} DH`, 188, currentY + 3 + centerOffset, { align: 'right' });
                }
            }
            
            currentY += partialRowHeight;
            isFirstPart = false;
            
            if (remainingLines.length > 0 && currentY > 200) {
                pages.push(pageCount);
                doc.addPage();
                addBonLivraisonHeader(doc, invoice, colors, (window.safeParseDate||function(d){return new Date(d)})(invoice.document_date).toLocaleDateString('fr-FR'));
                pageCount++;
                
                let newStartY = invoice.document_numero_commande ? 92 : 85;
                
                doc.setFillColor(...colors.blue);
                doc.rect(15, newStartY, 180, 8, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(9);
                doc.setFont(undefined, 'bold');
                doc.text('Désignation', 18, newStartY + 5.5);
                doc.text('QTE', 115, newStartY + 5.5, { align: 'center' });
                doc.text('PU HT', 150, newStartY + 5.5, { align: 'right' });
                doc.text('TOTAL HT', 188, newStartY + 5.5, { align: 'right' });
                
                currentY = newStartY + 10;
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
            }
        }
    });
    
    // الملخص المالي
    currentY += 10;
    
    doc.setFillColor(...colors.blue);
    doc.rect(110, currentY, 85, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Total HT', 113, currentY + 5);
    doc.text(`${formatNumberForPDF(invoice.total_ht)} DH`, 192, currentY + 5, { align: 'right' });
    
    currentY += 7;
    doc.setFillColor(255, 255, 255);
    doc.rect(110, currentY, 85, 7, 'F');
    doc.setTextColor(0, 0, 0);
    doc.text(`TVA ${invoice.tva_rate}%`, 113, currentY + 5);
    doc.text(`${formatNumberForPDF(invoice.montant_tva)} DH`, 192, currentY + 5, { align: 'right' });
    
    currentY += 7;
    doc.setFillColor(...colors.green);
    doc.rect(110, currentY, 85, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('Total TTC', 113, currentY + 5);
    doc.text(`${formatNumberForPDF(invoice.total_ttc)} DH`, 192, currentY + 5, { align: 'right' });
    
    // إضافة ترقيم الصفحات
    pages.push(pageCount);
    const totalPages = pages.length;
    
    for (let i = 0; i < totalPages; i++) {
        doc.setPage(i + 1);
        addBonLivraisonFooter(doc, colors, i + 1, totalPages);
    }
}

// ============================================
// 7️⃣ إضافة التذييل
// ============================================
function addBonLivraisonFooter(doc, colors, pageNum, totalPages) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.text('RIB : 007 720 00 05979000000368 12  ATTIJARI WAFA BANK', 15, 275);
    doc.text('Email: errbahiabderrahim@gmail.com', 15, 279);
    doc.text('ADRESSE: LOT ALBAHR AV TETOUAN N94 GARAGE 2 M\'DIQ', 15, 283);
    doc.text('Tel: +212 661 307 323', 15, 287);
    
    if (pageNum && totalPages) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${pageNum} / ${totalPages}`, 105, 293, { align: 'center' });
    }
}

// ============================================
// 8️⃣ دالة تنسيق الأرقام
// ============================================
function formatNumberForPDF(num) {
    return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

import sqlite3
import random
from datetime import datetime, timedelta
import os

# Get the user data directory path
user_home = os.path.expanduser('~')
db_path = os.path.join(user_home, 'AppData', 'Roaming', 'gestion-factures', 'multi.db')

print(f"📂 Chemin de la base de données: {db_path}")

if not os.path.exists(db_path):
    print(f"❌ La base de données n'existe pas à: {db_path}")
    print("💡 Veuillez d'abord lancer l'application pour créer la base de données.")
    exit(1)

# Connect to the database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Sample client
client = {"nom": "THETA GROUP", "ice": "003123456000090"}

# 25 products with varying descriptions (some with 4 lines)
products_pool = [
    {
        "designation": "Fourniture et pose de carrelage céramique\nDimensions: 60x60 cm\nQualité premium avec joints\nGarantie 5 ans incluse",
        "prix_unitaire": 85.00
    },
    {
        "designation": "Peinture murale intérieure\nPeinture acrylique lavable\nApplication en 2 couches",
        "prix_unitaire": 45.00
    },
    {
        "designation": "Installation électrique complète\nTableau électrique 12 modules\nDisjoncteurs et prises inclus\nMise aux normes NF C 15-100",
        "prix_unitaire": 320.00
    },
    {
        "designation": "Plomberie sanitaire\nInstallation WC, lavabo et douche\nY compris raccordements",
        "prix_unitaire": 280.00
    },
    {
        "designation": "Menuiserie bois sur mesure",
        "prix_unitaire": 450.00
    },
    {
        "designation": "Faux plafond en placoplatre\nStructure métallique incluse\nFinition lisse prête à peindre\nÉclairage LED intégré",
        "prix_unitaire": 95.00
    },
    {
        "designation": "Isolation thermique des murs",
        "prix_unitaire": 120.00
    },
    {
        "designation": "Revêtement de sol en parquet\nParquet stratifié haute résistance\nPose collée avec sous-couche",
        "prix_unitaire": 110.00
    },
    {
        "designation": "Maçonnerie générale\nMurs porteurs et cloisons\nEnduit intérieur et extérieur\nFinitions soignées",
        "prix_unitaire": 200.00
    },
    {
        "designation": "Étanchéité toiture terrasse\nMembrane bitumineuse multicouche\nGarantie 10 ans",
        "prix_unitaire": 380.00
    },
    {
        "designation": "Climatisation split system\nPuissance 12000 BTU\nInstallation et mise en service",
        "prix_unitaire": 520.00
    },
    {
        "designation": "Porte blindée sécurisée\nSerrure 5 points certifiée A2P\nIsolation phonique et thermique\nFinition au choix",
        "prix_unitaire": 680.00
    },
    {
        "designation": "Fenêtre PVC double vitrage\nDimensions standard 120x140 cm\nAvec volets roulants électriques",
        "prix_unitaire": 340.00
    },
    {
        "designation": "Chape béton armé",
        "prix_unitaire": 75.00
    },
    {
        "designation": "Enduit façade extérieure\nEnduit monocouche taloché\nColoris au choix",
        "prix_unitaire": 65.00
    },
    {
        "designation": "Système de chauffage central\nChaudière à condensation\nRadiateurs aluminium\nProgrammation thermostatique",
        "prix_unitaire": 890.00
    },
    {
        "designation": "Terrasse en bois composite",
        "prix_unitaire": 155.00
    },
    {
        "designation": "Cuisine équipée sur mesure\nMeubles haut et bas\nPlan de travail en granit\nÉlectroménager encastrable",
        "prix_unitaire": 1250.00
    },
    {
        "designation": "Salle de bain complète\nDouche italienne avec paroi\nMeuble vasque double\nRobinetterie chromée premium",
        "prix_unitaire": 980.00
    },
    {
        "designation": "Portail électrique coulissant",
        "prix_unitaire": 720.00
    },
    {
        "designation": "Aménagement extérieur\nDallage terrasse 40m²\nBordures et plantations\nSystème d'arrosage automatique",
        "prix_unitaire": 450.00
    },
    {
        "designation": "Garde-corps en inox\nDesign moderne\nFixation au sol ou latérale\nConformité normes sécurité",
        "prix_unitaire": 280.00
    },
    {
        "designation": "Stores électriques extérieurs",
        "prix_unitaire": 390.00
    },
    {
        "designation": "Système d'alarme complet\nDétecteurs de mouvement\nCaméras IP connectées\nApplication mobile incluse",
        "prix_unitaire": 650.00
    },
    {
        "designation": "Revêtement mural décoratif",
        "prix_unitaire": 95.00
    }
]

print("🚀 Démarrage de la génération de 1 facture avec 200 produits pour Multi Company...")

# First, insert or get client
cursor.execute('SELECT id FROM clients WHERE ice = ?', (client["ice"],))
result = cursor.fetchone()

if result:
    client_id = result[0]
    print(f"✅ Client trouvé: {client['nom']}")
else:
    # Insert new client
    cursor.execute('INSERT INTO clients (nom, ice) VALUES (?, ?)', (client["nom"], client["ice"]))
    client_id = cursor.lastrowid
    print(f"✅ Nouveau client créé: {client['nom']}")

conn.commit()

try:
    # Invoice date
    invoice_date = datetime(2025, 11, 3)
    year = invoice_date.year
    
    # Get last invoice number
    cursor.execute('SELECT document_numero FROM invoices WHERE company_code = ? ORDER BY id DESC LIMIT 1', ('MULTI',))
    last_result = cursor.fetchone()
    
    if last_result and last_result[0]:
        # Extract number from MTT0012025 format
        last_num_str = last_result[0].replace('MTT', '').replace(str(year), '')
        last_num = int(last_num_str) if last_num_str.isdigit() else 0
        next_num = last_num + 1
    else:
        next_num = 1
    
    # Invoice number: MTT + number + year
    invoice_numero = f"MTT{str(next_num).zfill(3)}{year}"
    
    # Select 200 random products (with repetition since we only have 25 unique products)
    selected_products = [random.choice(products_pool) for _ in range(200)]
    
    # Calculate totals
    total_ht = 0
    products_data = []
    
    for product in selected_products:
        quantity = random.randint(1, 10)
        prix_unitaire = product["prix_unitaire"]
        total_product = quantity * prix_unitaire
        total_ht += total_product
        
        products_data.append({
            "designation": product["designation"],
            "quantite": quantity,
            "prix_unitaire_ht": prix_unitaire,
            "total_ht": total_product
        })
    
    tva_rate = 20
    montant_tva = total_ht * 0.20
    total_ttc = total_ht + montant_tva
    
    # Add N° Order
    numero_order = f"456/{year}"
    
    # Insert invoice
    cursor.execute('''
        INSERT INTO invoices (
            company_code, client_id,
            document_type, document_numero, document_date,
            document_numero_Order,
            total_ht, tva_rate, montant_tva, total_ttc,
            year, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'MULTI',
        client_id,
        'facture',
        invoice_numero,
        invoice_date.strftime('%Y-%m-%d'),
        numero_order,
        total_ht,
        tva_rate,
        montant_tva,
        total_ttc,
        year,
        datetime.now().isoformat()
    ))
    
    invoice_id = cursor.lastrowid
    
    # Insert products
    for product in products_data:
        cursor.execute('''
            INSERT INTO invoice_products (
                invoice_id, designation, quantite, prix_unitaire_ht, total_ht
            ) VALUES (?, ?, ?, ?, ?)
        ''', (
            invoice_id,
            product["designation"],
            product["quantite"],
            product["prix_unitaire_ht"],
            product["total_ht"]
        ))
    
    # Commit
    conn.commit()
    
    print(f"\n✅ Facture créée avec succès!")
    print(f"📄 Numéro: {invoice_numero}")
    print(f"👤 Client: {client['nom']}")
    print(f"🔢 N° Order: {numero_order}")
    print(f"📦 Nombre de produits: 200")
    print(f"💰 Total HT: {total_ht:.2f} DH")
    print(f"💰 Total TTC: {total_ttc:.2f} DH")
    print(f"📝 Certains produits ont des descriptions sur 4 lignes")
    
except Exception as e:
    print(f"❌ Erreur: {e}")
    conn.rollback()

conn.close()

print(f"\n🎉 Terminé!")

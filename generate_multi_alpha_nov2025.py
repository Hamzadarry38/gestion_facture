import sqlite3
import random
from datetime import datetime, timedelta
import os

# Get the AppData path where databases are stored
appdata_path = os.path.join(os.environ['APPDATA'], 'gestion-factures')
db_path = os.path.join(appdata_path, 'multi.db')

# Client ALPHA CONSTRUCTION
client = {'nom': 'ALPHA CONSTRUCTION', 'ice': '001234567890001'}

# Products with larger quantities
products = [
    {'designation': 'Ciment gris 50kg', 'unit_price': 85.50},
    {'designation': 'Sable lavé (m³)', 'unit_price': 120.00},
    {'designation': 'Gravier concassé (m³)', 'unit_price': 150.00},
    {'designation': 'Brique creuse 20x30x40', 'unit_price': 2.50},
    {'designation': 'Fer à béton Ø12mm (kg)', 'unit_price': 9.80},
    {'designation': 'Peinture acrylique (L)', 'unit_price': 45.00},
    {'designation': 'Carrelage 60x60 (m²)', 'unit_price': 180.00},
    {'designation': 'Porte intérieure bois', 'unit_price': 850.00},
    {'designation': 'Fenêtre PVC double vitrage', 'unit_price': 1200.00},
    {'designation': 'Plâtre blanc (sac 40kg)', 'unit_price': 35.00},
    {'designation': 'Tuyau PVC Ø110mm (m)', 'unit_price': 25.00},
    {'designation': 'Cable électrique 2.5mm² (m)', 'unit_price': 8.50},
    {'designation': 'Disjoncteur 20A', 'unit_price': 65.00},
    {'designation': 'Robinet mélangeur', 'unit_price': 280.00},
    {'designation': 'Lavabo céramique', 'unit_price': 450.00},
    {'designation': 'Parpaing 20x20x50', 'unit_price': 3.20},
    {'designation': 'Béton prêt à l\'emploi (m³)', 'unit_price': 850.00},
    {'designation': 'Enduit de façade (sac 25kg)', 'unit_price': 55.00},
    {'designation': 'Isolant thermique (m²)', 'unit_price': 75.00},
    {'designation': 'Tuile béton', 'unit_price': 12.50}
]

def generate_random_date_november_2025():
    """Generate a random date in November 2025"""
    start_date = datetime(2025, 11, 1)
    end_date = datetime(2025, 11, 30)
    time_between = end_date - start_date
    days_between = time_between.days
    random_days = random.randrange(days_between + 1)
    return start_date + timedelta(days=random_days)

def get_or_create_client(conn, nom, ice):
    """Get existing client or create new one"""
    cursor = conn.cursor()
    
    # Check if client exists
    cursor.execute('SELECT id FROM clients WHERE ice = ? AND nom = ?', (ice, nom))
    result = cursor.fetchone()
    
    if result:
        return result[0]
    
    # Create new client
    cursor.execute('INSERT INTO clients (nom, ice) VALUES (?, ?)', (nom, ice))
    conn.commit()
    return cursor.lastrowid

def get_next_sequential_id(conn, year):
    """Get next sequential ID for the year"""
    cursor = conn.cursor()
    cursor.execute('''
        SELECT MAX(sequential_id) FROM invoices 
        WHERE year = ? AND company_code = 'MULTI'
    ''', (year,))
    result = cursor.fetchone()
    return (result[0] + 1) if result[0] else 1

def create_invoice(conn, sequential_id):
    """Create an invoice for MULTI company - ALPHA CONSTRUCTION - November 2025"""
    cursor = conn.cursor()
    
    # Get or create ALPHA CONSTRUCTION client
    client_id = get_or_create_client(conn, client['nom'], client['ice'])
    
    # Random date in November 2025
    invoice_date = generate_random_date_november_2025()
    
    # Random document type (mostly factures)
    doc_type = random.choice(['facture', 'facture', 'facture', 'facture', 'devis'])
    
    # Document number
    year = 2025
    if doc_type == 'facture':
        doc_numero = f"{sequential_id}/{year}"
        doc_numero_devis = None
        doc_numero_order = f"ORD{random.randint(1000, 9999)}" if random.random() > 0.3 else None
    else:
        doc_numero = None
        doc_numero_devis = f"D{sequential_id}/{year}"
        doc_numero_order = None
    
    # Random number of products (5-15 products per invoice for testing)
    num_products = random.randint(5, 15)
    total_ht = 0
    
    # Insert invoice first
    cursor.execute('''
        INSERT INTO invoices (
            company_code, client_id, document_type, document_date,
            document_numero, document_numero_devis, document_numero_Order,
            year, sequential_id, total_ht, tva_rate, montant_tva, total_ttc
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 20, 0, 0)
    ''', (
        'MULTI', client_id, doc_type, invoice_date.strftime('%Y-%m-%d'),
        doc_numero, doc_numero_devis, doc_numero_order, year, sequential_id
    ))
    
    invoice_id = cursor.lastrowid
    
    # Add products with larger quantities
    selected_products = random.sample(products, min(num_products, len(products)))
    for product in selected_products:
        # Larger quantities for testing (10-200)
        quantity = random.randint(10, 200)
        unit_price = product['unit_price']
        total_price = quantity * unit_price
        total_ht += total_price
        
        cursor.execute('''
            INSERT INTO invoice_products (
                invoice_id, designation, quantite, prix_unitaire_ht, total_ht
            ) VALUES (?, ?, ?, ?, ?)
        ''', (invoice_id, product['designation'], str(quantity), unit_price, total_price))
    
    # Update invoice totals
    tva_rate = 20
    tva_amount = total_ht * (tva_rate / 100)
    total_ttc = total_ht + tva_amount
    
    cursor.execute('''
        UPDATE invoices 
        SET total_ht = ?, montant_tva = ?, total_ttc = ?
        WHERE id = ?
    ''', (total_ht, tva_amount, total_ttc, invoice_id))
    
    conn.commit()
    return invoice_id, num_products, total_ttc

def main():
    print("🚀 Génération de 100 factures pour ALPHA CONSTRUCTION - Novembre 2025 (MULTI)")
    print(f"📁 Chemin: {db_path}")
    
    if not os.path.exists(db_path):
        print(f"❌ Base de données non trouvée!")
        print(f"   Veuillez d'abord lancer l'application.")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get starting sequential ID
        starting_seq_id = get_next_sequential_id(conn, 2025)
        
        print(f"\n📅 Création de 100 factures en Novembre 2025...")
        print(f"   Client: {client['nom']}")
        print(f"   ICE: {client['ice']}")
        print(f"   ID séquentiel de départ: {starting_seq_id}\n")
        
        total_created = 0
        total_amount = 0
        
        for i in range(100):
            seq_id = starting_seq_id + i
            invoice_id, num_products, total_ttc = create_invoice(conn, seq_id)
            total_created += 1
            total_amount += total_ttc
            
            if (i + 1) % 10 == 0:
                print(f"   ✓ {i + 1}/100 factures créées...")
        
        conn.close()
        
        print(f"\n{'='*70}")
        print(f"🎉 Succès! 100 factures créées pour ALPHA CONSTRUCTION")
        print(f"{'='*70}")
        print(f"📊 Statistiques:")
        print(f"   - Total factures: {total_created}")
        print(f"   - Période: Novembre 2025")
        print(f"   - Montant total: {total_amount:,.2f} DH TTC")
        print(f"   - Moyenne par facture: {total_amount/total_created:,.2f} DH TTC")
        print(f"{'='*70}\n")
        
    except Exception as e:
        print(f"❌ Erreur: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

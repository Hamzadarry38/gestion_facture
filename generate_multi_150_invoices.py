import sqlite3
import random
from datetime import datetime, timedelta
import os

# Get the AppData path where databases are stored
appdata_path = os.path.join(os.environ['APPDATA'], 'gestion-factures')
db_path = os.path.join(appdata_path, 'multi.db')

# Sample data
clients = [
    {'nom': 'ALPHA CONSTRUCTION', 'ice': '001234567890001'},
    {'nom': 'BETA TRAVAUX', 'ice': '001234567890002'},
    {'nom': 'GAMMA INDUSTRIES', 'ice': '001234567890003'},
    {'nom': 'DELTA SERVICES', 'ice': '001234567890004'},
    {'nom': 'EPSILON TECH', 'ice': '001234567890005'},
    {'nom': 'ZETA LOGISTICS', 'ice': '001234567890006'},
    {'nom': 'ETA SOLUTIONS', 'ice': '001234567890007'},
    {'nom': 'THETA GROUP', 'ice': '001234567890008'},
    {'nom': 'IOTA PARTNERS', 'ice': '001234567890009'},
    {'nom': 'KAPPA ENTERPRISES', 'ice': '001234567890010'}
]

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
    {'designation': 'Lavabo céramique', 'unit_price': 450.00}
]

def generate_random_date(year):
    """Generate a random date in the given year"""
    start_date = datetime(year, 1, 1)
    end_date = datetime(year, 12, 31)
    time_between = end_date - start_date
    days_between = time_between.days
    random_days = random.randrange(days_between)
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

def create_invoice(conn, year, sequential_id):
    """Create an invoice for MULTI company"""
    cursor = conn.cursor()
    
    # Random client
    client = random.choice(clients)
    client_id = get_or_create_client(conn, client['nom'], client['ice'])
    
    # Random date
    invoice_date = generate_random_date(year)
    
    # Random document type
    doc_type = random.choice(['facture', 'facture', 'facture', 'devis'])
    
    # Document number
    if doc_type == 'facture':
        doc_numero = f"{sequential_id}/{year}"
        doc_numero_devis = None
        doc_numero_order = f"ORD{random.randint(1000, 9999)}" if random.random() > 0.5 else None
    else:
        doc_numero = None
        doc_numero_devis = f"D{sequential_id}/{year}"
        doc_numero_order = None
    
    # Random number of products (2-5)
    num_products = random.randint(2, 5)
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
    
    # Add products
    for _ in range(num_products):
        product = random.choice(products)
        quantity = random.randint(1, 20)
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
    return invoice_id

def main():
    print("🚀 Génération de 150 factures pour MULTI TRAVAUX TETOUAN...")
    print(f"📁 Chemin: {db_path}")
    
    if not os.path.exists(db_path):
        print(f"❌ Base de données non trouvée!")
        print(f"   Veuillez d'abord lancer l'application.")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        
        # Distribution: 2024=50, 2025=95, 2026=5
        year_distribution = {
            2024: 50,
            2025: 95,
            2026: 5
        }
        
        total_created = 0
        for year, count in year_distribution.items():
            print(f"\n📅 Année {year}: Création de {count} factures...")
            
            for i in range(1, count + 1):
                invoice_id = create_invoice(conn, year, i)
                total_created += 1
                
                if i % 10 == 0:
                    print(f"   ✓ {i}/{count} factures créées...")
            
            print(f"   ✅ {count} factures de {year} créées!")
        
        conn.close()
        print(f"\n🎉 Total: {total_created} factures créées pour MULTI!")
        
    except Exception as e:
        print(f"❌ Erreur: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

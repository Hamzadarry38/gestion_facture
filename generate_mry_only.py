#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script Python pour générer des factures de test UNIQUEMENT pour MRY
Génère 500 factures réparties sur plusieurs années
"""

import sqlite3
import random
import os
from datetime import datetime, timedelta

# Configuration - MRY uniquement
user_data_path = os.path.expanduser('~\\AppData\\Roaming\\gestion-factures')
MRY_DB = os.path.join(user_data_path, 'invoices_mry.db')

# Distribution des factures par année
YEARS_DISTRIBUTION = {
    2020: 50,   # Année ancienne
    2021: 80,   # Année ancienne
    2022: 100,  # Année ancienne
    2023: 150,  # Année récente
    2024: 200,  # Année actuelle
    2025: 250,  # Année actuelle
    2026: 120,  # Année future
    2027: 50,   # Année future
}

DOCUMENT_TYPES = ['facture', 'devis', 'bon_livraison']

def create_database_if_not_exists(db_path):
    """Crée la base de données si elle n'existe pas"""
    if not os.path.exists(db_path):
        print(f"⚠️  Base de données {db_path} n'existe pas. Création...")
        
        # Créer le dossier s'il n'existe pas
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Créer les tables nécessaires
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom TEXT NOT NULL,
                ice TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS invoices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                client_id INTEGER NOT NULL,
                document_type TEXT NOT NULL,
                document_date TEXT NOT NULL,
                document_numero TEXT,
                year INTEGER,
                sequential_id INTEGER,
                total_ht REAL NOT NULL,
                tva_rate REAL DEFAULT 20,
                montant_tva REAL,
                total_ttc REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients(id)
            )
        ''')
        
        conn.commit()
        conn.close()
        print(f"✅ Base de données {db_path} créée avec succès!\n")

def get_or_create_test_client(cursor):
    """Récupère ou crée un client de test pour MRY"""
    client_name = 'Client Test MRY'
    
    cursor.execute('SELECT id FROM clients WHERE nom = ?', (client_name,))
    result = cursor.fetchone()
    
    if result:
        client_id = result[0]
        print(f"✅ Utilisation du client existant: {client_name} (ID: {client_id})")
    else:
        cursor.execute('''
            INSERT INTO clients (nom, ice)
            VALUES (?, ?)
        ''', (client_name, f'ICE{random.randint(100000000, 999999999)}'))
        client_id = cursor.lastrowid
        print(f"✅ Client créé: {client_name} (ID: {client_id})")
    
    return client_id

def generate_random_date(year):
    """Génère une date aléatoire pour l'année donnée"""
    start_date = datetime(year, 1, 1)
    end_date = datetime(year, 12, 31)
    
    time_between = end_date - start_date
    days_between = time_between.days
    random_days = random.randint(0, days_between)
    
    random_date = start_date + timedelta(days=random_days)
    return random_date.strftime('%Y-%m-%d')

def get_next_sequential_id(cursor, year):
    """Récupère le prochain ID séquentiel pour l'année"""
    cursor.execute('SELECT MAX(sequential_id) FROM invoices WHERE year = ?', (year,))
    result = cursor.fetchone()
    return (result[0] + 1) if result[0] else 1

def add_invoices_for_year(cursor, client_id, year, count):
    """Ajoute des factures pour une année donnée"""
    print(f"\n📅 Ajout de {count} factures pour l'année {year}...")
    
    for i in range(count):
        # Générer les données de la facture
        doc_type = random.choice(DOCUMENT_TYPES)
        date = generate_random_date(year)
        sequential_id = get_next_sequential_id(cursor, year)
        numero = f"{doc_type.upper()}-{sequential_id}/{year}"
        
        # Montants aléatoires
        total_ht = round(random.uniform(1000, 100000), 2)
        tva_rate = 20
        montant_tva = round(total_ht * (tva_rate / 100), 2)
        total_ttc = round(total_ht + montant_tva, 2)
        
        # Insérer la facture
        cursor.execute('''
            INSERT INTO invoices (
                client_id, document_type, document_date, document_numero,
                year, sequential_id, total_ht, tva_rate, montant_tva, total_ttc
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (client_id, doc_type, date, numero, year, sequential_id,
              total_ht, tva_rate, montant_tva, total_ttc))
        
        if (i + 1) % 50 == 0:
            print(f"  ⏳ Progression: {i + 1}/{count} factures ajoutées...")
    
    print(f"✅ {count} factures ajoutées pour {year}")

def main():
    """Fonction principale"""
    print("\n" + "="*70)
    print("🧪 GÉNÉRATEUR DE DONNÉES DE TEST - MRY UNIQUEMENT")
    print("="*70)
    print("\nCe script va générer 500 factures de test réparties sur 8 années")
    print("(2020-2027) pour l'entreprise MRY\n")
    
    print("="*70)
    print("🏢 Génération de 500 factures pour MRY")
    print("="*70)
    
    # Créer la base de données si elle n'existe pas
    create_database_if_not_exists(MRY_DB)
    
    # Connexion à la base de données
    conn = sqlite3.connect(MRY_DB)
    cursor = conn.cursor()
    
    try:
        # Créer ou récupérer le client de test
        client_id = get_or_create_test_client(cursor)
        
        # Calculer la distribution proportionnelle
        total_distribution = sum(YEARS_DISTRIBUTION.values())
        total_invoices = 500
        
        # Générer les factures pour chaque année
        for year, base_count in YEARS_DISTRIBUTION.items():
            # Calculer le nombre de factures pour cette année
            count = int((base_count / total_distribution) * total_invoices)
            
            if count > 0:
                add_invoices_for_year(cursor, client_id, year, count)
        
        # Commit les changements
        conn.commit()
        
        # Afficher le résumé
        print(f"\n{'='*70}")
        print(f"📊 RÉSUMÉ pour MRY")
        print(f"{'='*70}")
        
        cursor.execute('''
            SELECT year, COUNT(*) as count 
            FROM invoices 
            GROUP BY year 
            ORDER BY year DESC
        ''')
        
        results = cursor.fetchall()
        total = 0
        for year, count in results:
            print(f"  {year}: {count:4d} documents")
            total += count
        
        print(f"{'='*70}")
        print(f"  TOTAL: {total:4d} documents")
        print(f"{'='*70}\n")
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        conn.rollback()
    finally:
        conn.close()
    
    print("\n" + "="*70)
    print("🎉 SUCCÈS! Les données de test pour MRY ont été générées!")
    print("="*70)
    print("\n💡 Vous pouvez maintenant:")
    print("   1. Lancer l'application: npm run dev")
    print("   2. Sélectionner l'entreprise MRY")
    print("   3. Tester le sélecteur d'année avec les données générées")
    print("\n✅ Les factures sont réparties de 2020 à 2027!\n")

if __name__ == '__main__':
    main()

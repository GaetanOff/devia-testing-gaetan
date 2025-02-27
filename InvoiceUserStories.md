# User Stories - Gestion des Factures (Invoices)

## 1. Récupérer toutes les factures (GET /invoices)
En tant qu'utilisateur,  
Je veux voir une liste de toutes les factures,  
Afin de pouvoir consulter rapidement les informations sur les transactions.

### Critères d'acceptation :
- Le système récupère une liste de toutes les factures depuis la base de données.
- La réponse inclut les détails essentiels des factures (ID, montant, date, client, statut).
- Si aucune facture n'existe, le système renvoie une liste vide.

---

## 2. Récupérer une facture par ID (GET /invoices/:id)
En tant qu'utilisateur,  
Je veux consulter les détails d'une facture spécifique,  
Afin de voir toutes les informations liées à cette transaction.

### Critères d'acceptation :
- Le système récupère une facture grâce à son ID.
- La réponse inclut les détails complets de la facture (montant, date, client, statut).
- Si l'ID n'existe pas, le système renvoie une erreur 404.

---

## 3. Créer une nouvelle facture (POST /invoices)
En tant qu'utilisateur,  
Je veux créer une nouvelle facture,  
Afin d'enregistrer une nouvelle transaction dans le système.

### Critères d'acceptation :
- Une requête valide contient les informations de la facture (montant, date, client, statut).
- Le système crée une facture et la stocke dans la base de données.
- Si les données sont invalides, le système renvoie une erreur 400.

---

## 4. Mettre à jour une facture (PUT /invoices/:id)
En tant qu'utilisateur,  
Je veux mettre à jour les informations d'une facture,  
Afin de corriger ou modifier ses détails.

### Critères d'acceptation :
- Le système met à jour la facture correspondant à l'ID.
- Seuls les champs fournis dans le corps de la requête sont mis à jour.
- Si l'ID n'existe pas, le système renvoie une erreur 404.

---

## 5. Supprimer une facture (DELETE /invoices/:id)
En tant qu'utilisateur,  
Je veux supprimer une facture,  
Afin de retirer une transaction obsolète ou incorrecte du système.

### Critères d'acceptation :
- Le système supprime la facture correspondant à l'ID.
- Si l'ID n'existe pas, le système renvoie une erreur 404.
- La facture supprimée n'est plus récupérable dans la base de données.  

---

## 6. Filtrer les factures par statut
En tant qu'utilisateur,
Je souhaite pouvoir filtrer la liste des factures par statut (PENDING, PAID, CANCELLED),
Afin de consulter rapidement uniquement les factures correspondant à l'état souhaité.

### Critères d'acceptation :
- La route GET /invoices accepte un paramètre de requête status.
- Si le paramètre status est fourni, seules les factures dont le statut correspond à la valeur donnée sont renvoyées.
- Si aucun paramètre n'est fourni, toutes les factures sont renvoyées.
- En cas de valeur de statut invalide, le système peut renvoyer une erreur 400 ou simplement une liste vide, selon la logique définie.

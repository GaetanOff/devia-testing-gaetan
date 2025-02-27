# User Stories - Gestion des Produits

## 1. Récupérer tous les produits (GET /products)
En tant qu'utilisateur,  
Je veux voir une liste de tous les produits,  
Afin de pouvoir accéder rapidement aux informations sur chaque produit.

### Critères d'acceptation :
- Le système récupère une liste de tous les produits depuis la base de données.
- La réponse inclut les détails essentiels des produits (ID, nom, prix, description).
- Si aucun produit n'existe, le système renvoie une liste vide.

---

## 2. Récupérer un produit par ID (GET /products/:id)
En tant qu'utilisateur,  
Je veux consulter les détails d'un produit spécifique,  
Afin de voir ses informations complètes.

### Critères d'acceptation :
- Le système récupère un produit grâce à son ID.
- La réponse inclut les détails complets (nom, prix, description).
- Si l'ID n'existe pas, le système renvoie une erreur 404.

---

## 3. Créer un nouveau produit (POST /products)
En tant qu'administrateur,  
Je veux créer un nouveau produit,  
Afin d'ajouter un article au catalogue.

### Critères d'acceptation :
- Une requête valide contient les informations du produit (nom, prix, description).
- Le système crée un produit et le stocke dans la base de données.
- Si les données sont invalides, le système renvoie une erreur 400.

---

## 4. Mettre à jour un produit (PUT /products/:id)
En tant qu'administrateur,  
Je veux mettre à jour les informations d'un produit,  
Afin de corriger ou modifier ses détails.

### Critères d'acceptation :
- Le système met à jour le produit correspondant à l'ID.
- Seuls les champs fournis dans le corps de la requête sont mis à jour.
- Si l'ID n'existe pas, le système renvoie une erreur 404.

---

## 5. Supprimer un produit (DELETE /products/:id)
En tant qu'administrateur,  
Je veux supprimer un produit,  
Afin de retirer un article du catalogue.

### Critères d'acceptation :
- Le système supprime le produit correspondant à l'ID.
- Si l'ID n'existe pas, le système renvoie une erreur 404.
- Le produit supprimé n'est plus récupérable dans la base de données.

---

## 6. Recherche de produits par nom
En tant qu'utilisateur,
Je souhaite pouvoir rechercher un produit par son nom,
Afin de trouver rapidement le produit qui m'intéresse.

### Critères d'acceptation :
- Filtrage par nom :
Lorsque l'utilisateur envoie une requête avec un paramètre de recherche (par exemple, ?name=Laptop), le système renvoie une liste de produits dont le nom correspond (ou contient) le terme recherché.
- Gestion des cas sans correspondance :
Si aucun produit ne correspond au terme, la réponse doit être une liste vide avec un statut 200.
- Validation des paramètres :
Si le paramètre de recherche est absent ou vide, le système peut renvoyer soit tous les produits, soit une erreur de validation, selon la logique métier définie.
- Performance :
La recherche doit être exécutée efficacement même si le nombre de produits est important (attention aux optimisations côté base de données).


# User Stories - Gestion des Avis

## 1. Récupérer tous les avis (GET /reviews)
En tant qu'utilisateur,
Je veux voir une liste de tous les avis,
Afin de pouvoir consulter les avis des autres utilisateurs.

### Critères d'acceptation :
- Le système récupère une liste de tous les avis depuis la base de données.
- La réponse inclut les avis de tous les utilisateurs.
- Si aucun avis n'existe, le système renvoie une liste vide.

---

## 2. Récupérer un avis par ID (GET /reviews/:id)
En tant qu'utilisateur,
Je veux consulter les avis d'autres utilisateurs,
Afin de pouvoir lire les avis des autres utilisateurs.

### Critères d'acceptation :
- Le système récupère un avis grâce à son ID.
- La réponse inclut les avis de l'utilisateur.
- Si l'ID n'existe pas, le système renvoie une erreur 404.

---

## 3. Créer un nouvel avis (POST /reviews)

En tant qu'utilisateur,
Je veux envoyer un nouvel avis,
Afin de pouvoir noter les autres utilisateurs.

### Critères d'acceptation :
- Le système enregistre un nouvel avis dans la base de données.
- Le corps de la requête contient les informations de l'avis (note, commentaire).
- Le système renvoie une confirmation de la création de l'avis.
- Si les données sont invalides, le système renvoie une erreur 400.

---

## 4. Mettre à jour un avis (PUT /reviews/:id)
En tant qu'utilisateur,
Je veux mettre à jour un avis,
Afin de corriger ou modifier ses avis.

### Critères d'acceptation :
- Le système met à jour l'avis correspondant à l'ID.
- Seuls les champs fournis dans le corps de la requête sont mis à jour.
- Si l'ID n'existe pas, le système renvoie une erreur 404.

---

## 5. Supprimer un avis (DELETE /reviews/:id)
En tant qu'utilisateur,
Je veux supprimer un avis,
Afin de retirer un avis obsolète ou incorrecte du système.

### Critères d'acceptation :
- Le système supprime l'avis correspondant à l'ID.
- Si l'ID n'existe pas, le système renvoie une erreur 404.
- L'avis supprimé n'est plus récupérable dans la base de données.


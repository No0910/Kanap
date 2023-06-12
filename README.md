# Kanap
## _Construction d'un site e-commerce de canapés en javascript_


![Build Status](https://badge.buildkite.com/sample.svg?status=passing)

5ème projet de la formation de développeur web d'OpenClassroom.

## Miniature
![Miniature Sites](https://github.com/No0910/Kanap/assets/98163578/d5638150-d537-46f8-8d84-ae74a5cac940)


## Enjeux
---
- Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript.   Le code du front-end et de l’API est disponible sur un repository annexe.
- Mettre en place un plan de test d’acceptation.

## Livrables attendus
---
- Un fichier ZIP contenant le code fonctionnel du site web.
- Un document PDF du plan de test.

### Intégration dynamique en Javascript pour le front-end 
---
L’application web sera composée de 4 pages :

- Une page d’accueil montrant (de manière dynamique) tous les articles disponibles à
la vente.

- Une page “produit” qui affiche (de manière dynamique) les détails du produit sur
lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur
peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.

- Une page “panier”. Celle-ci contient plusieurs parties :
  ○ Un résumé des produits dans le panier, le prix total et la possibilité de
  modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.
  ○ Un formulaire permettant de passer une commande. Les données du
  formulaire doivent être correctes et bien formatées avant d'être renvoyées au
  back-end. Par exemple, pas de chiffre dans un champ prénom.
  
- Une page “confirmation” :
  ○ Un message de confirmation de commande, remerciant l'utilisateur pour sa
  commande, et indiquant l'identifiant de commande envoyé par l’API.

### Les contraintes techniques

## Page d'accueil
Cette page présente l’ensemble des produits retournés par l’API.
Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de
sa description.
En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter
celui-ci plus en détail.


## Page Produit
Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces
éléments doivent être pris en compte dans le panier.

## Page Panier
Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à ce
moment, le total du panier devra bien se mettre à jour.
L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, le produit devra
donc disparaître de la page.
Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un
prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En
cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ
correspondant.
Attention à ne pas stocker le prix des articles en local. Les données stockées en local ne
sont pas sécurisées et l’utilisateur pourrait alors modifier le prix lui-même.

## Page Confirmation
Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande. Il faudra veiller à
ce que ce numéro ne soit stocké nulle part.

## Code source
Celui-ci devra être indenté et utiliser des commentaires en début de chaque fonction pour
décrire son rôle. Il devra également être découpé en plusieurs fonctions réutilisables
(nommées). Une fonction doit être courte et répondre à un besoin précis. Il ne faudrait pas
avoir de longues fonctions qui viendraient répondre à plusieurs besoins à la fois. Exemple : il
ne serait pas accepté de mettre une seule et unique fonction en place pour collecter, traiter
et envoyer des données

## API
Concernant l’API, des promesses devront être utilisées pour éviter les callbacks. Il est
possible d’utiliser des solutions alternatives, comme fetch, celle-ci englobant la promesse.
L’API n’est actuellement que dans sa première version. La requête post qu’il faudra formuler
pour passer une commande ne prend pas encore en considération la quantité ni la couleur
des produits achetés.

## Fonctionnement du panier
Dans le panier, les produits doivent toujours apparaître de manière regroupée par modèle et
par couleur.
Si un produit est ajouté dans le panier à plusieurs reprises, avec la même couleur, celui-ci
ne doit apparaître qu’une seule fois, mais avec le nombre d’exemplaires ajusté.
Si un produit est ajouté dans le panier à plusieurs reprises, mais avec des couleurs différentes, il doit apparaître en deux lignes distinctes avec la couleur et la quantité correspondantes indiquées à chaque fois.

## Validation des données
Pour les routes POST, l’objet contact envoyé au serveur doit contenir les champs firstName,
lastName, address, city et email. Le tableau des produits envoyé au back-end doit être un
array de strings product-ID. Les types de ces champs et leur présence doivent être validés
avant l’envoi des données au serveur.

### Technologies utilisées
---
- [HTML] - Version 5
- [CSS] - Version 3
- [Javascript] - ECMAScript 2022 
- [VScode] - Editeur de code
- [GoogleFonts] - Bibliothèque de polices

### Identité graphique et contraintes techniques
---
## Polices de caractères
- Logo et titres: Montserrat
- Texte: Montserrat

## Couleurs utilisées
- main-color: #3498db;
- secondary-color: #2c3e50;
- text-color: #3d4c68;
- footer-text-color: #a6b0b3; 
- footer-main-color: #3d424f; 
- footer-secondary-color: #2d2f3e;

## Compatibilité
- Développement en mobile-first à partir des maquettes fournies
- Adapatation tablette et desktop
- Responsive design intégré sur tout supports
- Validation HTML et CSS du W3C
- Dernières versions de Chrome, Firefox, Edge

## Installation
---
Une version en ligne est directement accessible à l'adresse : [https://nd-kanap.vercel.app/]

Sinon, vous pouvez cloner le projet
```terminal
git clone [https://github.com/No0910/kanap.git](https://github.com/No0910/Kanap.git)
```

## Auteur

Nolwenn DUHAMEL

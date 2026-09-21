EventHub

Plateforme web de prestations événementielles développée avec Laravel,
React et MySQL.

À propos

EventHub est une plateforme qui met en relation des clients avec des
prestataires du domaine événementiel.

Le visiteur peut consulter les événements et les profils des
prestataires. Après connexion, le client peut effectuer une réservation,
suivre ses demandes, gérer ses favoris et laisser un avis. Le
prestataire dispose d'un espace pour gérer son profil, ses événements,
ses équipements et les réservations reçues.

Technologies utilisées



 


Back-end

Laravel

Laravel Sanctum

Eloquent ORM

API REST

MySQL

Front-end

React

Vite

React Router

Tailwind CSS

Fetch API

Outils

Git

GitHub

Postman

XAMPP

VS Code

Utilisateurs

Visiteur

Le visiteur peut :

Consulter les événements

Rechercher et filtrer les événements et prestataires

Consulter le détail d'un événement

Consulter le profil public d'un prestataire

S'inscrire

Se connecter

Client

Le client peut :

Créer une demande de réservation

Consulter ses réservations

Ajouter un événement aux favoris

Retirer un événement des favoris

Consulter ses favoris

Laisser une note et un commentaire

Prestataire

Le prestataire peut :

Gérer son profil

Créer un événement

Modifier un événement

Supprimer un événement

Gérer ses équipements

Gérer les quantités du stock

Consulter les réservations reçues

Accepter une réservation

Refuser une réservation

Fonctionnalités principales

Authentification

L'authentification est gérée avec Laravel Sanctum.

Après la connexion, l'utilisateur est redirigé selon son rôle. Les
routes privées du front-end sont également protégées.

Gestion des événements

Les prestataires peuvent créer, modifier et supprimer leurs événements.

Un événement contient notamment :

Titre

Type

Ville

Capacité

Prix

Description

Image

Les visiteurs et les clients peuvent consulter les événements
disponibles et ouvrir leur page de détail.

Réservations

Un client connecté peut créer une réservation en indiquant :

La date

La ville ou localisation

Le nombre d'invités

Le montant total est calculé à partir du prix de l'événement et du
nombre d'invités.

Le prestataire peut ensuite consulter la demande et l'accepter ou la
refuser.

Vérification de disponibilité

EventHub vérifie la disponibilité avant de créer une réservation.

Pour un prestataire autre que le traiteur, si une réservation non
refusée existe déjà pour le même prestataire et la même date, une
nouvelle réservation est bloquée.

Une réservation avec le statut rejected ne bloque pas la date.

Gestion du stock du traiteur

Pour le traiteur, plusieurs réservations peuvent être enregistrées le
même jour tant que le stock est suffisant.

Le système utilise actuellement les règles suivantes :

1 invité = 1 chaise

1 table = 10 invités

Avant d'enregistrer la réservation, EventHub calcule le matériel déjà
utilisé et vérifie les quantités restantes.

Équipements

Le prestataire peut gérer ses équipements et leurs quantités.

Les informations principales sont :

Nom

Quantité totale

Quantité disponible

Les événements peuvent également être liés aux équipements à travers la
table event_equipment.

Favoris

Le client peut ajouter un événement à ses favoris et le supprimer plus
tard.

Une page dédiée permet de consulter les événements enregistrés.

Avis et notes

Le client peut laisser une note et un commentaire sur un événement selon
le flux prévu dans l'application.

Les avis sont affichés sur la page de détail de l'événement et sont
utilisés pour calculer les notes des prestataires.

Profil prestataire

Le prestataire peut gérer les informations de son profil.

Un profil public permet aux visiteurs de consulter ses informations
ainsi que ses événements.

Prestataires les mieux notés

La page d'accueil affiche les prestataires les mieux notés à partir des
avis enregistrés dans l'application.

User Stories

ID                En tant que       Je veux           Afin de

US01              Visiteur          Consulter les     Découvrir les
événements        offres
disponibles

US02              Visiteur          Rechercher et     Trouver
filtrer           rapidement une
offre

US03              Visiteur          Consulter le      Voir ses
détail d'un       informations
événement

US04              Visiteur          Consulter un      Voir ses
profil            informations et
prestataire       événements

US05              Visiteur          M'inscrire et me  Accéder aux
connecter         fonctionnalités
privées

US06              Client            Créer une         Réserver un
réservation       événement

US07              Client            Consulter mes     Suivre mes
réservations      demandes

US08              Client            Gérer mes favoris Retrouver les
événements qui
m'intéressent

US09              Client            Laisser une note  Donner mon avis
et un commentaire

US10              Prestataire       Gérer mes         Administrer mes
événements        offres

US11              Prestataire       Gérer mes         Suivre mon stock
équipements

US12              Prestataire       Consulter les     Voir les demandes
réservations      reçues

US13              Prestataire       Accepter ou       Gérer les
refuser une       demandes
réservation

US14              Prestataire       Modifier mon      Mettre à jour mes
profil            informations

US15              Système           Vérifier la       Éviter les
disponibilité     conflits de
réservation

Architecture du projet

EventHub-V3/
│
├── eventhub-backend/
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
│
├── eventhub-frontend/
│   └── src/
│       ├── components/
│       ├── data/
│       ├── features/
│       │   ├── auth/
│       │   ├── client/
│       │   ├── events/
│       │   ├── home/
│       │   └── traiteur/
│       ├── routes/
│       └── services/
│
├── docs/
│   └── diagrams/
│       ├── use-case.png
│       ├── class-diagram.png
│       └── erd.png
│
└── README.md

Modèle de données

Les principales entités utilisées dans le projet sont :

User

Category

Event

Equipment

Reservation

Review

Favorite

event_equipment

Relations principales

Category
   |
   v
 User (Prestataire) -----> Event -----> Reservation
        |                    |
        |                    +--------> Review
        |                    |
        |                    +--------> Favorite
        |
        +-----> Equipment
                   ^
                   |
             event_equipment
                   |
                 Event

Conception UML

Diagramme de cas d'utilisation

Le diagramme présente les interactions principales entre le visiteur, le
client, le prestataire et l'application EventHub.



Diagramme de classes

Le diagramme de classes présente les principales entités utilisées dans
l'application ainsi que leurs relations.



ERD

Le diagramme ERD représente la structure de la base de données et les
relations entre les tables.



API principale

Quelques routes utilisées par l'application :

POST   /api/register
POST   /api/login

GET    /api/events
GET    /api/events/{id}

GET    /api/prestataires/{id}
GET    /api/top-prestataires

GET    /api/events/{id}/reviews

Les fonctionnalités privées utilisent également les ressources :

/api/events
/api/reservations
/api/equipment
/api/reviews
/api/favorites
/api/profile

Installation

1. Cloner le projet

git clone https://github.com/SimoBnz1/EvenHub-V2.git
cd EvenHub-V2

2. Installer le back-end

cd eventhub-backend
composer install

Créer le fichier .env à partir de .env.example, puis configurer la
base de données MySQL.

Exemple :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eventhub
DB_USERNAME=root
DB_PASSWORD=

Générer la clé Laravel :

php artisan key:generate

Exécuter les migrations :

php artisan migrate

Exécuter le seeder des catégories :

php artisan db:seed --class=CategorySeeder

Créer le lien de stockage si nécessaire pour les images :

php artisan storage:link

Lancer Laravel :

php artisan serve

Le back-end est disponible par défaut sur :

http://127.0.0.1:8000

3. Installer le front-end

Dans un autre terminal :

cd eventhub-frontend
npm install
npm run dev

Le front-end est disponible par défaut sur :

http://localhost:5173

Sécurité

Les routes privées de l'API utilisent auth:sanctum.

Côté React, ProtectedRoute contrôle également l'accès aux pages
privées selon :

Le token

Le rôle de l'utilisateur

Les contrôleurs Laravel appliquent aussi les contrôles nécessaires avant
certaines actions.

Tests réalisés

Les principales fonctionnalités testées pendant le développement sont :

Inscription et connexion

Création et gestion des événements

Gestion des équipements

Création d'une réservation

Vérification des dates

Vérification du stock du traiteur

Acceptation et refus des réservations

Favoris

Avis et notes

Profil prestataire

Protection des routes

Git Workflow

Le projet a été développé avec plusieurs branches Git, notamment :

main
feature/AuthPage
feature/EventManagement
feature/ReservationManagement

Les fonctionnalités ont été enregistrées dans des commits séparés avant
d'être intégrées dans main avec des Pull Requests.

Conclusion

EventHub centralise les principales opérations entre les clients et les
prestataires événementiels.

L'application permet de consulter les offres, gérer les réservations,
les événements, les équipements, les favoris, les avis et les profils
prestataires.

Le système de vérification de disponibilité et de stock permet également
de limiter les conflits de réservation.
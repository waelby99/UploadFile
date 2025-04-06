# 📁 PDF File Upload API with Node.js, Express & MongoDB

Cette API permet d'uploader, de visualiser et de télécharger des fichiers PDF à l’aide de Node.js, Express, Multer et MongoDB.

## 🚀 Fonctionnalités

- 📤 Upload de fichiers PDF
- 📄 Visualisation directe dans le navigateur
- ⬇️ Téléchargement de fichiers
- 📦 Stockage dans MongoDB (Buffer)
- 🔐 CORS activé

## 🛠️ Technologies utilisées

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (pour la gestion des fichiers)
- CORS

## 📂 Structure du projet

```
.               
├── pdfDetails.js         # Schéma Mongoose pour les PDF
├── server.js             # Fichier principal (le code serveur)
└── README.md
```

## 🧑‍💻 Installation

1. Clone le dépôt :

```bash
git clone https://github.com/waelby99/UploadFile.git
cd UploadFile
```

2. Installe les dépendances :

```bash
npm install
```

3. Lance MongoDB en local :

```bash
mongod
```

4. Démarre le serveur (with nodemon):

```bash
npm run dev 
```

## 📡 Endpoints de l’API

| Méthode | Endpoint             | Description                          |
|--------:|----------------------|--------------------------------------|
| `GET`   | `/`                  | Test simple du serveur               |
| `POST`  | `/upload-files`      | Upload d’un fichier PDF              |
| `GET`   | `/get-files`         | Récupérer tous les fichiers          |
| `GET`   | `/view-pdf/:id`      | Visualiser un fichier PDF            |
| `GET`   | `/download/:id`      | Télécharger un fichier PDF           |

## 📝 Exemple de schéma `pdfDetails.js`

```js
const mongoose = require("mongoose");

const PdfDetailsSchema = new mongoose.Schema({
  title: String,
  pdf: {
    data: Buffer,
    contentType: String,
  },
});

mongoose.model("PdfDetails", PdfDetailsSchema);
```

## 📦 Exemple de requête avec `FormData`

Pour uploader un fichier via Postman ou un frontend :

- Méthode : `POST`
- URL : `http://localhost:5000/upload-files`
- Corps : `form-data`
  - `title`: `"Nom du fichier"`
  - `file`: *(le fichier PDF en pièce jointe)*

## ⚠️ Notes

- Les fichiers sont stockés dans MongoDB, ce qui n'est pas optimal pour les fichiers très volumineux.
- Pour un environnement de production, envisage d’utiliser un service de stockage comme AWS S3.

## 📬 Contribuer

Tu veux améliorer ce projet ? N’hésite pas à créer une Pull Request ou une Issue ! 😄

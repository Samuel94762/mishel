# 🌹 Cita App — Guía de despliegue

Una propuesta de cita elegante con botón "No" que es... poco colaborador.

---

## Estructura

```
cita-app/
├── public/
│   └── index.html        ← Frontend completo
├── src/
│   └── server.js         ← Backend Express + MongoDB
├── .env.example          ← Plantilla de variables de entorno
├── .gitignore
└── package.json
```

---

## Paso 1 — MongoDB Atlas (gratis)

1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta gratuita
2. Crea un cluster **M0 (Free Tier)**
3. En **Database Access** → Add New Database User → crea usuario y contraseña (guárdalos)
4. En **Network Access** → Add IP Address → pon `0.0.0.0/0` (permite Render conectarse)
5. En tu cluster → **Connect** → **Connect your application** → copia la connection string
6. La connection string se ve así:
   ```
   mongodb+srv://tu_usuario:tu_password@cluster0.xxxxx.mongodb.net/cita-app?retryWrites=true&w=majority
   ```

---

## Paso 2 — Subir a GitHub

```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "🌹 Mi propuesta de cita"

# Crea un repo en github.com (puede ser privado) y luego:
git remote add origin https://github.com/TU_USUARIO/cita-app.git
git push -u origin main
```

---

## Paso 3 — Deploy en Render

1. Ve a [render.com](https://render.com) y crea una cuenta (gratis)
2. **New** → **Web Service**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name:** `cita-app` (o el nombre que quieras)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. En **Environment Variables** agrega:
   - `MONGODB_URI` = tu connection string de MongoDB Atlas
6. Click **Create Web Service**

En 2-3 minutos tendrás una URL tipo `https://cita-app.onrender.com` — ¡eso es lo que le mandas! 🎉

---

## Las citas se guardan en MongoDB

Cada vez que ella confirme, se guarda en la colección `citas` con:
- `respuesta`: "si"
- `fecha`, `hora`, `lugar`, `nota`
- `creadoEn`: timestamp

Puedes verlas en MongoDB Atlas → Browse Collections.

---

## Desarrollo local

```bash
cp .env.example .env
# Edita .env con tu MONGODB_URI

npm install
npm run dev
# Abre http://localhost:3000
```

---

Buena suerte 🥂

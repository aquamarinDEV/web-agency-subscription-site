# Configurare pagină Admin

Pagina `/admin.html` afișează înregistrările din formularul de contact. Este protejată cu user și parolă.

## Pași pe Vercel

### 1. Conectează proiectul la Vercel
Dacă nu e deja făcut: rulează `vercel` în terminal și urmează pașii.

### 2. Adaugă Vercel KV (baza de date)
1. Mergi la [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selectează proiectul
3. **Storage** → **Create Database** → **KV**
4. Creează un store nou
5. Conectează-l la proiectul tău (Vercel va adăuga automat variabilele `KV_REST_API_URL` și `KV_REST_API_TOKEN`)

### 3. Setează variabilele de mediu pentru admin
În proiect: **Settings** → **Environment Variables** → adaugă:

| Nume           | Valoare   | Descriere                  |
|----------------|-----------|----------------------------|
| `ADMIN_USER`   | (user)    | Numele de utilizator admin |
| `ADMIN_PASSWORD` | (parola) | Parola pentru admin        |

Folosește valori puternice, nu „admin/1234”.

### 4. Redeploy
După ce adaugi variabilele, fă **Redeploy** din tab-ul Deployments.

---

## Acces

- **Admin:** `https://domeniul-tau.vercel.app/admin.html`
- Login cu `ADMIN_USER` și `ADMIN_PASSWORD`
- După autentificare vezi toate înregistrările din formular

## Test local

**Variantă simplă** – site-ul se încarcă (fără admin/formular funcțional):
```bash
npm run start
```
Deschide **http://localhost:3000**

**Variantă completă** – admin și formular funcționează:
```bash
npm install
npx vercel dev
```
Deschide **http://localhost:3000/admin.html**

Pentru ca API-urile să funcționeze local, ai nevoie de variabilele de mediu:
```bash
npx vercel env pull .env.local
```
Dacă proiectul nu e legat de Vercel, rulează `npx vercel` pentru login și legare.

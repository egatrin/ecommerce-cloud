const express = require('express');
const mysql = require('mysql2');
const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'ecommerce-db.clyuq8moee9t.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Bismillah99.*',
  database: 'ecommerce'
});

// Route to fetch products
app.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    let html = `
      <html>
      <head>
        <title>Portofilio Arsip.Sj</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #ffecd2, #fcb69f);
            margin: 0;
            padding: 0;
          }
          header {
            background-color: #ffffffcc;
            backdrop-filter: blur(10px);
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          header h1 {
            margin: 0;
            color: #333;
            font-size: 36px;
          }
          .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            padding: 40px;
          }
          .photo-card {
            background: #fff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            transition: transform 0.3s;
            cursor: pointer;
          }
          .photo-card:hover {
            transform: scale(1.05);
          }
          .photo-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
          }
          .photo-info {
            padding: 20px;
            text-align: center;
          }
          .photo-info h2 {
            margin: 10px 0;
            font-size: 22px;
            color: #333;
          }
          .photo-info p {
            color: #e67e22;
            font-size: 20px;
            font-weight: bold;
            margin: 0;
          }
          footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666;
            background: #fff;
            margin-top: 50px;
          }
          footer .socials {
            margin-top: 10px;
          }
          footer .socials a {
            margin: 0 10px;
            color: #333;
            text-decoration: none;
            font-weight: bold;
          }
          /* Lightbox styles */
          #lightbox {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
          }
          #lightbox img {
            max-width: 90%;
            max-height: 80%;
            border-radius: 10px;
          }
          #lightbox:target {
            display: flex;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Galeri Foto Premium</h1>
        </header>
        <div class="gallery">
    `;

    results.forEach((product, index) => {
      html += `
        <div class="photo-card" onclick="openLightbox('${product.image_url}')">
          <img src="${product.image_url}" alt="${product.name}">
          <div class="photo-info">
            <h2>${product.name}</h2>
            <p>Rp${product.price}</p>
          </div>
        </div>
      `;
    });

    html += `
        </div>

        <!-- Lightbox -->
        <div id="lightbox" onclick="closeLightbox()">
          <img id="lightbox-img" src="" alt="Preview">
        </div>

        <footer>
          &copy; 2025 Galeri Foto Premium. All rights reserved.
          <div class="socials">
            📸 <a href="https://instagram.com/egatrin_" target="_blank">Instagram</a> |
            💬 <a href="https://wa.me/6282117116422" target="_blank">WhatsApp</a> |
            🎵 <a href="https://tiktok.com/@egatrin_" target="_blank">TikTok</a>
          </div>
        </footer>

        <script>
          function openLightbox(imageUrl) {
            document.getElementById('lightbox-img').src = imageUrl;
            document.getElementById('lightbox').style.display = 'flex';
          }
          function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
          }
        </script>
      </body>
      </html>
    `;

    res.send(html);
  });
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});

console.log('CI/CD berhasil!');
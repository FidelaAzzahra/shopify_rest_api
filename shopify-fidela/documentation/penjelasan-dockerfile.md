### Penjelasan Dockerfile

**1. Base Image:**

- Saya menggunakan image Node.js resmi versi 20 sebagai base image. Ini mencakup semua dependensi dasar yang diperlukan untuk menjalankan aplikasi Node.js.

```Dockerfile
FROM node:20
```

**2. Work Directory:**

- Saya membuat dan beralih ke direktori kerja `/usr/src/app`, di mana semua kode aplikasi akan disimpan dan dijalankan.

```Dockerfile
WORKDIR /usr/src/app
```

**3. Copy Dependencies:**

- Saya menyalin file `package.json` dan `package-lock.json` ke dalam direktori kerja untuk memastikan semua dependensi aplikasi dapat diinstal.

```Dockerfile
COPY package*.json ./
```

**4. Install Dependencies:**

- Saya menjalankan `npm install` untuk menginstal semua dependensi yang didefinisikan di dalam `package.json`.

```Dockerfile
RUN npm install
```

**5. Copy Application Code:**

- Saya menyalin sisa kode aplikasi ke dalam direktori kerja.

```Dockerfile
COPY . .
```

**6. Build Application:**

- Saya menjalankan `npm run build` untuk membangun aplikasi.

```Dockerfile
RUN npm run build
```

**7. Expose Port:**

- Saya mengekspos port 3000, yang akan digunakan oleh aplikasi untuk menerima koneksi.

```Dockerfile
EXPOSE 3000
```

**8. Command to Run the App:**

- Saya mendefinisikan perintah untuk menjalankan aplikasi menggunakan `node` dan mengatur ukuran memori maksimum menjadi 200MB.

```Dockerfile
CMD ["node", "--max-old-space-size=200", "dist/main"]
```

---

### Penjelasan Docker-Compose.yml

**1. Service: app**

- **Build Context:**

  - Mendefinisikan konteks build dengan mengarahkan ke Dockerfile.

  ```yaml
  build:
    context: .
    dockerfile: Dockerfile
  ```

- **Image & Container Name:**

  - Menentukan nama image dan container untuk aplikasi.

  ```yaml
  image: shopify-fidela
  container_name: shopify-fidela
  ```

- **Restart Policy:**

  - `restart: unless-stopped` artinya container akan selalu restart kecuali dihentikan secara eksplisit. Ini berguna untuk menjaga aplikasi tetap berjalan meskipun terjadi kegagalan atau reboot.

  ```yaml
  restart: unless-stopped
  ```

- **Ports:**

  - Mengekspos port 3000 dari container ke host.

  ```yaml
  ports:
    - '3000:3000'
  ```

- **Volumes:**

  - Menghubungkan direktori node_modules di dalam container untuk persistensi.

  ```yaml
  volumes:
    - /usr/src/app/node_modules
  ```

- **Dependencies:**

  - Mendefinisikan bahwa service `app` bergantung pada `mongodb`, sehingga MongoDB harus dijalankan terlebih dahulu.

  ```yaml
  depends_on:
    - mongodb
  ```

**2. Service: mongodb**

- **Image & Container Name:**

  - Menentukan nama image dan container untuk MongoDB.

  ```yaml
  image: mongo:latest
  container_name: mongodb
  ```

- **Restart Policy:**

  - `restart: unless-stopped` untuk menjaga agar MongoDB selalu berjalan kecuali dihentikan secara manual.

  ```yaml
  restart: unless-stopped
  ```

- **Ports:**

  - Mengekspos port 27017 dari container ke host.

  ```yaml
  ports:
    - '27017:27017'
  ```

- **Environment Variables:**

  - Mengatur variabel lingkungan untuk konfigurasi MongoDB, seperti username, password, dan database default.

  ```yaml
  environment:
    MONGO_INITDB_ROOT_USERNAME: shopify
    MONGO_INITDB_ROOT_PASSWORD: secret
    MONGO_INITDB_DATABASE: admin
  ```

---

### Menjalankan Docker

**1. Build Docker Images:**

- Perintah ini akan membangun image untuk setiap service yang didefinisikan di dalam `docker-compose.yml`.

```bash
docker-compose build
```

**2. Start Services:**

- Perintah ini akan menjalankan semua service dalam mode detached, artinya service akan berjalan di latar belakang.

```bash
docker-compose up -d
```

**3. List Running Containers:**

- Perintah ini akan menampilkan daftar semua container yang sedang berjalan.

```bash
docker ps
```




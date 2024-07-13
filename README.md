# Tutorial Setup Project

### 1. Langkah Awal Dalam Menjalankan Project

Download project kedalam bentuk zip, kemudian extract file pada direktor yang diinginkan. Setelah itu import project kedalam vscode lalu dan buka terminal. Perintah untuk masuk kedalam direktori yang benar adalah sebagai berikut.

```bash
cd shopify_rest_api-main
cd shopify-fidela
```

Lakukan instalasi dependency apabila sudah berada pada direktori yang benar

### 2. Install Dependency

Sebelum menjalankan project. Install npm melalui terminal vscode. Perintah untuk melakukan instalasi pada pada line dibawah berikut.

```bash
npm install
```

Ketikkan `npm -v` pada terminal untuk memastikan bahwa npm telah terinstall. Apabila muncul versi dari npm pada terminal, instalasi npm dinyatakan berhasil.

```bash
npm -v
```

### Update Configuration

Buka file `docker-compose.yml`. Apabila ingin mengubah credential dari database yang akan dipakai di project ini silahkan dirubah. 
Username, password, dan nama database bebas. Menyesuaikan saja.

```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: shopify
  MONGO_INITDB_ROOT_PASSWORD: secret
  MONGO_INITDB_DATABASE: admin
```

Kemudian ubah konfigurasi database di aplikasi nest js melalui file `app.module.ts` apabila pada  terjadi sebuah kendala

```typescript
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://shopify:secret@mongodb:27017/admin'), // ubah konfigurasi database di line ini
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


### 3. Menjalankan Docker

<b>Note: </b>Sebelum menjalankan Docker, pastikan bahwa Docker telah terinstall. Perintah untuk membangun image serta membuat container adalah sebagai berikut.

**1. Build Docker Images:**

- Perintah dibawah ini akan membangun image untuk setiap service yang didefinisikan di dalam `docker-compose.yml`. 

```bash
docker-compose build
```

**2. Start Services:**

- Setelah image dibagun, akan dibuat sebuah container yang akan menjalankan semua service dalam mode detached, artinya service akan berjalan di latar belakang.

```bash
docker-compose up -d
```

**3. List Running Containers:**

- docker-ps akan menampilkan daftar semua container yang sedang berjalan.
- opsi lain : selain melalui terminal, container yang sedang berjalan bisa dilihat di aplikasi Docker itu sendiri.

```bash
docker ps
```

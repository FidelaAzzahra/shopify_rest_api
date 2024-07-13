# Tutorial Setup Project

### Install Dependency

Sebelum menjalankan project. Install npm melalui terminal vscode. Perintah untuk melakukan instalasi ada pada line dibawah berikut.

```bash
npm install
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


### Menjalankan Docker

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

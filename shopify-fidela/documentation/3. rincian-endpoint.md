### Rincian REST API

Berikut adalah langkah-langkah terstruktur untuk mempresentasikan REST API di Postman berdasarkan koleksi endpoint yang tersedia:

#### 1. **Authentication**

- **Register**: Demonstrasi pembuatan akun baru.
- **Login**: Proses autentikasi dan mendapatkan token.
- **Refresh Token**: Memperbarui token yang telah kedaluwarsa.
- **Logout**: Keluar dari sesi dan menghapus token.

#### 2. **Admin**

- **Auth**
  - **Register New Account**: Pendaftaran akun admin baru.
- **Get All**: Mendapatkan daftar semua admin.
- **Get Detail**: Mendapatkan detail admin berdasarkan ID.
- **Update**: Memperbarui informasi admin.
  - **Get Detail**: Verifikasi data yang diperbarui.
- **Delete**: Menghapus admin berdasarkan ID.
  - **Get Detail**: Verifikasi bahwa data telah dihapus.

#### 3. **Product**

- **Create**: Membuat produk baru (Catatan: field images dan variants masih kosong karena belum ada data).
- **Get List**: Mendapatkan daftar semua produk.
- **Get Single**: Mendapatkan detail produk berdasarkan ID.
- **Count**: Mendapatkan jumlah total produk.

#### 4. **Product Variant**

- **Create**: Membuat varian produk baru.
- **Get All**: Mendapatkan daftar semua varian produk.
- **Count All**: Mendapatkan jumlah total varian produk.
- **Get By Id**: Mendapatkan detail varian produk berdasarkan ID.
  - **Product: Get Single**: Verifikasi apakah varian telah ditambahkan ke produk.
- **Update**: Memperbarui varian produk.
  - **Get By Id**: Verifikasi data yang diperbarui.
- **Delete**: Menghapus varian produk berdasarkan ID.

#### 5. **Product Image**

- **Create**: Mengunggah dan menambahkan gambar produk baru.
- **Get All**: Mendapatkan daftar semua gambar produk.
- **Get By Id**: Mendapatkan detail gambar produk berdasarkan ID.
  - **Product: Get Single**: Verifikasi apakah gambar telah ditambahkan ke produk.
- **Get Count**: Mendapatkan jumlah total gambar produk.
- **Update**: Memperbarui gambar produk.
  - **Get By Id**: Verifikasi data yang diperbarui.
- **Delete**: Menghapus gambar produk berdasarkan ID.

#### 6. **Custom Collection**

- **Create**: Membuat koleksi kustom baru.
- **List**: Mendapatkan daftar semua koleksi kustom.
- **Get by Id**: Mendapatkan detail koleksi kustom berdasarkan ID.
- **Get Count**: Mendapatkan jumlah total koleksi kustom.
- **Update**: Memperbarui koleksi kustom.
- **Delete**: Menghapus koleksi kustom berdasarkan ID.

#### 7. **Collect**

- **Create**: Menambahkan produk ke koleksi kustom.
- **List**: Mendapatkan daftar semua collects.
- **Get Collect**: Mendapatkan detail collect berdasarkan ID.
- **Count**: Mendapatkan jumlah total collects.
- **Delete**: Menghapus produk dari koleksi berdasarkan ID.

#### 8. **Seeder (Opsional)**

Folder ini digunakan untuk membuat data dummy agar sesuai dengan requirement yang telah ditentukan.

- **Admin**: Membuat 40 akun admin.
- **Product**: Membuat 100 produk.
  - Ulangi proses ini sebanyak 5 kali untuk mencapai 500 produk. Disarankan untuk melakukan request secara bertahap untuk menghindari error atau waktu respons yang terlalu lama dari API.
- **Collection**: Membuat 100 koleksi dengan masing-masing 4 produk per koleksi.
  - Pastikan jumlah produk yang tersedia lebih banyak dari total koleksi yang akan dibuat. Dalam kasus ini, jumlah produk harus lebih dari 100 x 4 = 400 produk.


# 🎭 Playwright E2E Testing Framework

Dokumentasi panduan lengkap untuk membangun dan menjalankan framework pengujian otomatis menggunakan **Playwright** dengan TypeScript.

---

## 📋 Daftar Isi

1. [Cara Menjalankan Program](#i-cara-menjalankan-program)
2. [Konvensi Penamaan](#ii-konvensi-penamaan)
3. [Struktur Folder](#iii-struktur-folder)
4. [Error Umum](#iv-error-umum)
5. [Menjalankan Test Tanpa `npx`](#v-menjalankan-test-tanpa-npx)
6. [Test Runner](#vi-test-runner)
7. [Cara Membuat Test Case](#vii-cara-membuat-test-case)
8. [Konfigurasi Direktori Test](#viii-konfigurasi-direktori-test)
9. [Page Fixture](#ix-page-fixture)
10. [Codegen](#x-codegen)
11. [Locator](#xi-locator)
12. [Opsi Debugging](#xii-opsi-debugging)
13. [Allure Report](#xiii-allure-report)
14. [Allure Report - Konfigurasi Lanjutan](#xiv-allure-report---konfigurasi-lanjutan)
15. [Fixture](#xv-fixture)
16. [Screenshot](#xvi-screenshot)
17. [Annotation](#xvii-annotation)
18. [Tags](#xviii-tags)
19. [Auto Waiting](#xix-auto-waiting)
20. [Hooks](#xx-hooks)
21. [Global Setup & Teardown](#xxi-global-setup--teardown)
22. [Multi Browser Test](#xxii-multi-browser-test)
23. [Parallel Test](#xxiii-parallel-test)
24. [Manajemen Data](#xxiv-manajemen-data)
25. [Penanganan Data per Environment](#xxv-penanganan-data-per-environment)
26. [Sensitive Data](#xxvi-sensitive-data)
27. [Logging](#xxvii-logging)
28. [Karakteristik Test Framework](#xxviii-karakteristik-test-framework)
29. [Page Object Model (POM)](#xxix-page-object-model-pom)
30. [API Testing](#xxx-api-testing)

---

## I. Cara Menjalankan Program

Berikut adalah perintah-perintah yang dapat digunakan untuk menjalankan test dengan Playwright:

| Perintah | Deskripsi |
|---|---|
| `npx playwright test` | Menjalankan seluruh test secara end-to-end |
| `npx playwright test --headed` | Menjalankan test dengan tampilan browser |
| `npx playwright test --ui` | Menjalankan test dengan tampilan UI interaktif |
| `npx playwright test --project=chromium` | Menjalankan test hanya di browser Chromium |
| `npx playwright test example` | Menjalankan test dari file tertentu |
| `npx playwright test --debug` | Menjalankan test dalam mode debug |
| `npx playwright codegen` | Merekam interaksi otomatis dengan Codegen |
| `npx playwright test --project=chromium --workers=1` | Menjalankan satu test pada satu waktu di Chromium |
| `npx playwright test --project=chromium --repeat-each=20` | Mengulang setiap test sebanyak 20 kali di Chromium |
| `npx playwright test --grep @Smoke --project=chromium` | Menjalankan test yang memiliki tag `@Smoke` |
| `npx playwright test --grep @Sanity --project=chromium` | Menjalankan test yang memiliki tag `@Sanity` |
| `npx playwright test --grep @Api --project=chromium` | Menjalankan test yang memiliki tag `@Api` |
| `npx playwright test --grep @Regression --project=chromium` | Menjalankan test yang memiliki tag `@Regression` |
| `npx playwright test --grep @Smoke\|@Sanity --project=chromium` | Menjalankan test yang memiliki tag `@Smoke` atau `@Sanity` |
| `npx playwright test --grep @Isolated --project=chromium --workers=1` | Menjalankan test `@Isolated` satu per satu di Chromium |

---

## II. Konvensi Penamaan

| Kategori | Format | Contoh |
|---|---|---|
| Folder / File | `kebab-case` | `login-page.spec.ts` |
| Page, Spec, dan Test file | `dot-separated` | `login.page.ts`, `login.spec.ts` |
| Nama Class | `PascalCase` | `LoginPage` |
| Variabel | `camelCase` | `userName`, `password` |
| Function | `UPPER_SNAKE_CASE` | `LOGIN_USER`, `LOGOUT_USER` |

---

## III. Struktur Folder

```
PLAYWRIGHT-E2E-TEST
├── .github/                # Folder konfigurasi CI
├── .vscode/                # Pengaturan khusus editor
│      └── mcp.json         # Konfigurasi MCP Server untuk VS Code
├── config/                 # Konfigurasi per environment
├── data/                   # Data statis dan konstanta
│     └── constant.json     # Konstanta umum yang digunakan dalam test
├── debug/                  # (Opsional) Output atau log untuk debugging
├── logs/                   # Log aplikasi/test
├── node_modules/           # Dependensi (di-generate otomatis)
├── playwright-report/      # Output laporan HTML Playwright
├── resources/              # Sumber daya test (contoh: gambar, file)
├── tests/                  # Seluruh file test yang terorganisir
│     ├── api/              # Spesifikasi test API
│     ├── demo/             # Spesifikasi test demo
│     ├── devices/          # Skenario pengujian perangkat
│     ├── e2e/              # Spesifikasi test end-to-end
│     ├── functional/       # Spesifikasi test fungsional
│     ├── helpers/          # Fungsi helper dan utilitas
│     └── page-objects/     # Kelas Page Object Model
├── test-examples/          # Contoh file test untuk referensi
├── .env.example            # Contoh file variabel environment
├── .env                    # File variabel environment aktif
├── .gitignore              # Aturan pengabaian Git
├── package-lock.json       # File kunci dependensi (di-generate otomatis)
└── package.json            # Metadata proyek dan dependensi
```

---

## IV. Error Umum

- File spec/test tidak memiliki ekstensi `.spec` atau `.test`
- Navigation timeout error — tambahkan konfigurasi berikut:

```ts
use: {
    navigationTimeout: 30_000, // Set timeout navigasi ke 30 detik
}
```

- Lupa menambahkan keyword `await` sebelum method aksi

---

## V. Menjalankan Test Tanpa `npx`

Tambahkan script berikut ke dalam `package.json`:

```json
"scripts": {
    "demo": "npx playwright test tests/demo/mytest.spec.ts --headed"
}
```

Kemudian jalankan dengan perintah:

```bash
npm run demo
```

---

## VI. Test Runner

Playwright sudah menyediakan **Test Runner bawaan**, sehingga tidak perlu menginstall test runner tambahan seperti Mocha, Jest, atau Jasmine.

Fungsi-fungsi yang sering digunakan: `test`, `expect`, `request`.

> 📖 Referensi lengkap: [Playwright Test API](https://playwright.dev/docs/api/class-test)

**Export umum dari Playwright Test Runner:**

```ts
export const chromium
export const firefox
export const webkit
export const selectors
export const devices
export const test
export const expect
export const request
export const errors
export const _electron
export const _android
export const defineConfig
export const mergeTests
export const mergeExpects
export default playwright.test;
```

---

## VII. Cara Membuat Test Case

**a. `test(title, body)`** — Membuat test case dasar

```ts
test("Should do something", async ({ page }) => {
    // langkah-langkah...
});
```

**b. `test(title, details, body)`** — Menambahkan detail seperti tag atau timeout

```ts
test("Should do something", { tags: ["@Smoke"] }, async ({ page }, testInfo) => {
    // langkah-langkah...
});
```

**c. `test.describe(title, body)`** — Mengelompokkan beberapa test case yang serupa

```ts
test.describe("Login Tests", () => {
    // test cases...
});
```

---

## VIII. Konfigurasi Direktori Test

Untuk mengkonfigurasi direktori test, gunakan file `playwright.config.ts` dan tambahkan properti `testDir`:

```ts
testDir: './tests',
```

---

## IX. Page Fixture

**Page Fixture** adalah fitur dari Playwright Test Runner yang menyediakan objek `page` yang sudah terinisialisasi dan siap digunakan dalam setiap test case.

**Method yang paling sering digunakan:**

| Method | Deskripsi |
|---|---|
| `goto(url)` | Navigasi ke URL tertentu |
| `locator(selector)` | Membuat locator berdasarkan selector |
| `getByRole()` | Mencari elemen berdasarkan peran (role) ARIA |
| `getByText()` | Mencari elemen berdasarkan teks |
| `getByLabel()` | Mencari elemen berdasarkan label |
| `getByPlaceholder()` | Mencari elemen berdasarkan placeholder |
| `getByAltText()` | Mencari elemen berdasarkan teks alt |
| `getByTitle()` | Mencari elemen berdasarkan title |
| `click(selector)` | Mengklik elemen |
| `fill(selector, value)` | Mengisi nilai pada input |
| `evaluate(pageFunction, arg)` | Menjalankan fungsi JavaScript di browser |
| `waitForURL(url)` | Menunggu URL tertentu |
| `screenshot()` | Mengambil screenshot |
| `title()` | Mendapatkan judul halaman |
| `url()` | Mendapatkan URL saat ini |

---

## X. Codegen

**Codegen** adalah fitur Playwright untuk merekam interaksi pengguna dengan aplikasi web secara otomatis, lalu menghasilkan kode test dari interaksi tersebut.

| Perintah | Deskripsi |
|---|---|
| `npx playwright codegen` | Menjalankan Codegen dengan tampilan browser |
| `npx playwright codegen --target=typescript` | Menjalankan Codegen dengan output TypeScript |
| `npx playwright codegen --help` | Menampilkan bantuan penggunaan Codegen |
| `npx playwright codegen https://katalon-demo-cura.herokuapp.com/` | Menjalankan Codegen dengan URL tertentu |

---

## XI. Locator

**Locator** adalah cara untuk menemukan elemen di halaman web yang akan diuji.

- `page.getBy*()` dan `page.locator()` adalah dua metode utama
- Tipe locator berbentuk **object**
- `page.getBy*()` mengembalikan **Promise**, sehingga harus menggunakan `await`
- `page.locator()` mengembalikan **Locator Object**, tidak perlu menggunakan `await`

> 💡 **Tips Pemformatan Kode:** Gunakan `Ctrl + K + 0` untuk memformat kode dengan Prettier.

---

## XII. Opsi Debugging

| Mode | Keterangan |
|---|---|
| **UI Mode** (`--ui`) | Menjalankan test dengan tampilan UI visual untuk melihat hasil test secara real-time |
| **Debug Mode** (`PWDEBUG=1`) | Menjalankan test dengan mode debug untuk melihat langkah-langkah secara detail |
| **Trace Viewer** | Menjalankan test dengan mode trace — memungkinkan melihat screenshot, video, dan log dari setiap langkah |

---

## XIII. Allure Report

### Langkah Setup Allure

1. Periksa apakah Allure sudah terinstall secara global:
   ```bash
   allure --version
   ```

2. Install Allure CLI secara global:
   ```bash
   npm install -g allure-commandline
   ```

3. Install Allure Reporter di level proyek:
   ```bash
   npm install -D allure-playwright
   ```

4. Tambahkan konfigurasi reporter di `playwright.config.ts`:
   ```ts
   reporter: [
       ['html'],
       ['allure-playwright'],
   ],
   ```

5. Jalankan test dan pastikan folder `allure-results` terbuat

6. Lihat laporan dengan perintah:
   ```bash
   allure serve
   ```

---

## XIV. Allure Report - Konfigurasi Lanjutan

Untuk pelaporan yang lebih detail, tambahkan konfigurasi berikut di `playwright.config.ts`:

```ts
reporter: [
    [
        'html',
        {
            open: 'never',
        },
    ],
    [
        'allure-playwright',
        {
            detail: true,
            suiteTitle: true,
            environmentInfo: {
                name: 'TEST',
                appName: 'CURA',
                release: 'Release 1.1',
                node_version: process.version
            },
        },
    ],
],
```

---

## XV. Fixture

**Fixture** adalah fitur dari Playwright Test Runner untuk menyediakan data atau objek yang dibutuhkan dalam test case.

### Mengapa Menggunakan Fixture?

Tanpa fixture, kita sering menulis kode berulang seperti:
- Membuka browser
- Login user
- Menyiapkan data
- Membersihkan data setelah test

Dengan fixture, semua itu bisa dipusatkan dan digunakan kembali (*reusable*).

### Contoh Fixture Bawaan Playwright
- `page`
- `browser`
- `context`

### Contoh Implementasi Custom Fixture

```ts
import { test as base } from '@playwright/test';

export const test = base.extend({
    loggedInPage: async ({ page }, use) => {
        await page.goto('https://example.com/login');
        await page.fill('#user', 'testuser');
        await page.fill('#pass', 'password');
        await page.click('#login');

        await use(page); // test memakai page yang sudah login
    },
});

test('dashboard terlihat', async ({ loggedInPage }) => {
    await loggedInPage.goto('/dashboard');
});
```

### Manfaat Fixture

- ✅ Setup environment test
- ✅ Berbagi resource antar test
- ✅ Mengurangi duplikasi kode
- ✅ Auto cleanup setelah test
- ✅ Membuat test lebih bersih dan mudah dipelihara

---

## XVI. Screenshot

Playwright menyediakan fitur untuk mengambil screenshot selama test berjalan.

Tambahkan konfigurasi berikut di `playwright.config.ts` pada bagian `use`:

| Opsi | Keterangan |
|---|---|
| `screenshot: 'only-on-failure'` | Screenshot hanya saat test **gagal** |
| `screenshot: 'on-first-failure'` | Screenshot hanya pada kegagalan **pertama** |
| `screenshot: 'on'` | Screenshot **setiap kali** test dijalankan |

---

## XVII. Annotation

**Annotation** adalah fitur Playwright Test Runner untuk memberikan informasi tambahan pada test case, seperti tag, timeout, skip, dan lainnya.

```ts
test('should do something', { tags: ['@Smoke'] }, async ({ page }) => {
    // langkah-langkah...
});
```

---

## XVIII. Tags

**Tags** adalah bagian dari annotation yang digunakan untuk mengelompokkan test case berdasarkan kategori tertentu.

```ts
test('should do something', { tags: ['@Smoke'] }, async ({ page }) => {
    // langkah-langkah...
});
```

**Contoh tag yang umum digunakan:**
- `@Smoke` — Test inti/kritis
- `@Sanity` — Test validasi dasar
- `@Regression` — Test regresi
- `@Isolated` — Test yang harus dijalankan sendiri
- `@Api` — Test API

---

## XIX. Auto Waiting

Playwright memiliki fitur **Auto Waiting** yang secara otomatis menunggu elemen muncul sebelum melakukan aksi.

**Auto Wait (default):**
```ts
await page.click('#submit'); // Playwright otomatis menunggu elemen muncul
```

**Implicit Wait:**
```ts
await page.waitForSelector('#submit'); // Menunggu elemen muncul sebelum melanjutkan
```

**Explicit Wait:**
```ts
await page.waitForFunction(() => {
    return document.querySelector('#submit') !== null;
});
```

**Sleep / Delay:**
```ts
await page.waitForTimeout(5000); // Menunggu selama 5 detik
```

**Menunggu Elemen Terlihat:**
```ts
await page.waitForSelector('#submit', { state: 'visible' });
```

**Pause (untuk debugging):**
```ts
await page.pause(); // Menjeda eksekusi test
```

---

## XX. Hooks

**Hooks** adalah fitur Playwright Test Runner untuk menjalankan kode sebelum atau setelah test case dijalankan.

```ts
test.beforeEach(async ({ page }) => {
    // Kode yang dijalankan sebelum setiap test case
});

test.afterEach(async ({ page }) => {
    // Kode yang dijalankan setelah setiap test case
});

test.beforeAll(async ({ page }) => {
    // Kode yang dijalankan sebelum semua test case
});

test.afterAll(async ({ page }) => {
    // Kode yang dijalankan setelah semua test case
});
```

---

## XXI. Global Setup & Teardown

### a. Global Setup

1. Install dependensi yang diperlukan:
   ```bash
   npm install dotenv
   npm install -D @types/node
   ```

2. Buat key dengan nilai di file `.env` / `.env.example`

3. Buat file `global-setup.ts` di dalam folder `helpers`

4. Hubungkan ke `playwright.config.ts`:
   ```ts
   globalSetup: require.resolve('./tests/helpers/global-setup.ts')
   ```

5. Aktifkan dotenv di dalam file `global-setup.ts`:
   ```ts
   import * as dotenv from 'dotenv';
   import * as path from 'node:path';
   dotenv.config({ path: path.resolve(__dirname, '.env') });
   ```

### b. Global Teardown

1. Buat file `global-teardown.ts` di dalam folder `helpers`

2. Hubungkan ke `playwright.config.ts`:
   ```ts
   globalTeardown: require.resolve('./tests/helpers/global-teardown.ts')
   ```

---

## XXII. Multi Browser Test

Playwright mendukung pengujian di berbagai browser: **Chromium**, **Firefox**, dan **WebKit**.

**Melihat daftar perangkat yang tersedia:**
```ts
test("Should demo devices and parallel execution", async ({ page, browserName }) => {
    console.log('Browser: ', browserName);
    console.log(`Daftar perangkat: ${Object.keys(devices)}`);
});
```

**Menambahkan perangkat di konfigurasi `projects`:**
```ts
{
    name: "Galaxy A55",
    use: { ...devices["Galaxy A55"] }
}
```

> ⚠️ Saat menggunakan konfigurasi `devices`, nonaktifkan (comment) bagian `viewport` dan `launchOptions` di konfigurasi default.

---

## XXIII. Parallel Test

Playwright mendukung eksekusi test secara **paralel** untuk meningkatkan kecepatan pengujian.

**Konfigurasi di `playwright.config.ts`:**
```ts
workers: 4, // Menjalankan 4 test secara paralel
```

**Atau melalui command line:**
```bash
npx playwright test --workers=4
```

**Aturan Umum Parallel Execution:**
```
Projects (browser/devices) > Spec files > Config (full parallel ON/OFF)
```

> 💡 **Rekomendasi:** Jumlah maksimum worker = **50% dari jumlah core CPU** (contoh: 6 worker untuk 12 core)

---

## XXIV. Manajemen Data

| Tipe Data | Contoh Penggunaan | Cara Implementasi |
|---|---|---|
| **Static Data** (`constants.json`) | SQL Query Template, API Endpoint | Simpan di folder `/data`, import saat dibutuhkan |
| **Test Data** (parameterisasi) | Data login, data form | Buat `test-data.ts` dengan class `TestData` dan method `static` |
| **Dynamic Data** (Global setup) | Auth Token | Inisialisasi di `global-setup.ts`, akses via `process.env.<KEY>` |
| **Env Config** (config file) | APP URL | Simpan di file konfigurasi per environment |
| **Sensitive Data** (`.env`) | Password, API key | Simpan di file `.env`, akses via `process.env.<varname>` |

---

## XXV. Penanganan Data per Environment

1. Buat fixture baru `config-fixtures.ts` di folder `/helpers`
2. Definisikan tipe `EnvConfig` dan field yang diperlukan
3. Definisikan opsi dan berikan nilai default
4. Buat file config `test.playwright.config.ts` di folder `/config`
5. Export config menggunakan `export default defineConfig`
6. Ubah export root config menjadi:
   ```ts
   // Sebelum
   export default defineConfig({})
   // Sesudah
   export const baseConfig = defineConfig({})
   ```
7. Import root config di file config per environment:
   ```ts
   import { baseConfig } from '../config/test.playwright.config'
   ```
8. Contoh script di `package.json`:
   ```
   dev:smoke  : npx playwright test --config <dev.config>
   test:smoke : npx playwright test --config <test.config>
   prod:smoke : npx playwright test --config <prod.config>
   ```

---

## XXVI. Sensitive Data

1. Pastikan `dotenv` sudah terinstall:
   ```bash
   npm install dotenv
   ```

2. Buat file `.env` di direktori root dan tambahkan data sensitif:
   ```
   USERNAME=myuser
   PASSWORD=mypassword
   ```

3. Gunakan variabel tersebut dalam kode:
   ```ts
   process.env.USERNAME
   process.env.PASSWORD
   ```

---

## XXVII. Logging

Playwright mendukung logging untuk membantu proses debugging dan analisis test.

1. Install **Chalk** untuk logging berwarna:
   ```bash
   npm install chalk
   # atau
   npm i --save-dev chalk
   ```

2. Import dan gunakan fungsi log di dalam test

3. Jalankan test dan amati log yang dihasilkan di terminal

---

## XXVIII. Karakteristik Test Framework

Sebuah test framework yang baik harus memiliki karakteristik berikut:

1. ♻️ **Reusable** — Kode dapat digunakan kembali
2. 🔧 **Maintainable** — Mudah dipelihara dan diperbarui
3. 📈 **Scalable** — Dapat berkembang seiring bertambahnya test
4. ✅ **Reliable** — Hasil test konsisten dan dapat dipercaya
5. 🎯 **Easy to Use** — Mudah digunakan oleh tim
6. ⚡ **Fast Execution** — Eksekusi test yang cepat
7. 📊 **Good Reporting** — Laporan test yang informatif
8. 🔀 **Parallel Execution** — Mendukung eksekusi test paralel
9. 🌐 **Multi Browser** — Mendukung berbagai browser
10. 📱 **Multi Platform** — Mendukung web, mobile, dan desktop
11. 📂 **Data-Driven Testing** — Mendukung pengujian berbasis data
12. 🤝 **BDD Support** — Mendukung Behavior-Driven Development
13. 🗂️ **Test Case Management** — Terintegrasi dengan tool manajemen test case
14. 🔄 **CI/CD Integration** — Terintegrasi dengan tool CI/CD
15. 🤖 **Test Automation Tools** — Mendukung berbagai tool otomasi
16. 📋 **Test Management** — Mendukung manajemen test secara keseluruhan

---

## XXIX. Page Object Model (POM)

**Page Object Model (POM)** adalah pola desain (*design pattern*) yang merepresentasikan sebuah halaman web atau bagian dari halaman web sebagai sebuah objek.

Secara teknis:
- **Properties** → elemen-elemen di halaman (tombol, input, teks, dll.)
- **Methods** → aksi yang dapat dilakukan pada elemen tersebut (klik, isi, navigasi, dll.)

POM bertujuan untuk membuat **object repository** untuk elemen-elemen UI web, sehingga kode test menjadi lebih bersih, terstruktur, dan mudah dipelihara.

---

## XXX. API Testing

**API Testing** adalah jenis pengujian perangkat lunak yang berfokus pada pengujian API secara langsung — mencakup aspek fungsionalitas, keandalan, performa, dan keamanan.

### Method HTTP yang Umum Digunakan

| Method | Deskripsi |
|---|---|
| `GET` | Mengambil data dari server |
| `POST` | Mengirim data ke server untuk membuat resource baru |
| `PUT` | Mengirim data ke server untuk memperbarui seluruh resource yang ada |
| `DELETE` | Menghapus resource dari server |
| `PATCH` | Mengirim data ke server untuk memperbarui sebagian resource yang ada |
| `HEAD` | Mengambil header dari suatu resource tanpa body response |

---

> 📌 **Catatan:** Dokumentasi ini dibuat berdasarkan catatan pembelajaran Playwright E2E Testing Framework. Untuk referensi lebih lengkap, kunjungi [dokumentasi resmi Playwright](https://playwright.dev/docs/intro).

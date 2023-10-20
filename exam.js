const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


/*-------------------------Implementasi body-parser-------------------------*/
// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({ extended: true }))


/*-------------------------Implementasi cors-------------------------*/
// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

// Codingan disini
app.get("/hitung", (req, res) => {
    const satuan = req.query.type;
    const data = parseFloat(req.query.data);
    let result;
    const results = {};
    const sp = {
      kg: 1,
      hg: 10,
      dag: 100,
      g: 1000,
      dg: 10000,
      cg: 100000,
      mg: 1000000
    };
  
    if (satuan === "mg") {
      result = data / 1000000;
    }
    else if (satuan === "cg") {
      result = data / 100000;
    }
    else if (satuan === "dg") {
      result = data / 10000;
    }
    else if (satuan === "g") {
      result = data / 1000;
    }
    else if (satuan === "dag") {
      result = data / 100;
    }
    else if (satuan === "hg") {
      result = data / 10;
    }
    else{
      result = data;
    }
  
    for (const p in sp) {
      results[p] = result * sp[p];
    }
    let response = {
      status: res.statusCode,
      hasil: results
    };
  
    res.json(response);
  });
  

//CODINGAN DISINI
app.post("/vst/:type/:diket1/:diket2", (req, res) => {
    let soal = req.params.type;
    let var1 = Number(req.params.diket1);
    let var2 = Number(req.params.diket2);
    let hasil = 0;
    let response;

    if (soal === "v") {
        hasil = var1 / var2;
        response = {
            Kecepatan: "Mencari kecepatan (Velocity) per detik",
            Jarak: var1 + ' meter',
            Waktu: var2 + ' detik',
            Hasil: hasil + ' m/detik',
        };
    } else if (soal === "s") {
        hasil = var1 * var2;
        response = {
            Jarak: "Mencari Jarak (Space)",
            Kecepatan: var1 + ' m/detik',
            Waktu: var2 + ' detik',
            Hasil: hasil + ' meter',
        };
    } else if (soal === "t") {
        hasil = var1 / var2;
        response = {
            Waktu: "Mencari Waktu (Time)",
            Jarak: var1 + ' Meter',
            Kecepatan: var2 + ' m/detik',
            Hasil: hasil.toFixed(2) + ' detik',
        };
    } else {
        response = "Tipe tidak ada!\n<br>Coba salah satu dari berikut Tipe:[v, s, t]";
    }

    res.json(response);
});



const portt = 8000
app.listen(portt, () => 
{
    console.log("Server run on port \""+portt+'\"');
}) 
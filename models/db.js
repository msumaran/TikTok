const CRUD = require("mysql-crud");
const mysql = require("mysql");
const config = require("../config.js");
// Create connection
var db = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("🟢 Database connected successfully");
  connection.release();
});

const livesCrud = CRUD(db, "lives");

exports.createLives = async function (user, descp, mp4) {
  livesCrud.create({ user: user, descp: descp, mp4: mp4 }, function (err, vals) {
    console.log(err);
    console.log(`Id live: ${vals.insertId}`);
    return vals.insertId;
  });
};


exports.updateLives = async function (user, descp,mp4,id) {
    livesCrud.update({ user: user, descp: descp, mp4: mp4, id: id }, function (err, vals) {
      console.log(err);
    });
  };
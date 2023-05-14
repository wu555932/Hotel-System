const express = require("express");
const hotelData = require("../data/hotelInfo.json");
const crypto = require("crypto");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
const totalHotelData = hotelData;

app.get("/api/hotelBookInfo", (req, res) => {
  const hotelData = JSON.stringify(totalHotelData);
  res.send(hotelData);
});
app.post("/api/addHotelInfo", (req, res) => {
  const id = crypto.randomUUID();
  const reqireParams = Object.keys(req.body);
  const params = JSON.parse(reqireParams);
  //给一条新的酒店数据设置id
  params.id = id; 
  //向hotelInfo文件中插入一条数据
  totalHotelData.hotelData.push(params);
  const stringData = JSON.stringify(totalHotelData);
  fs.writeFile("../data/hotelInfo.json", stringData, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("add hotel info success");
    res.send({
      success: "ok",
    });
  });
});
app.get("/api/deleteHotel", (req, res) => {
  const id = req.query.id;
  const hotelData = totalHotelData.hotelData;
  const newData = hotelData.filter((item) => item.id !== id)
  totalHotelData.hotelData = newData;
  const stringData = JSON.stringify(totalHotelData);
  fs.writeFile("../data/hotelInfo.json", stringData, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("delete hotel info success");
    res.send({
      success: "ok",
    });
  });
});
app.post("/api/EditHotel",(req,res)=>{
  const reqireParams = Object.keys(req.body);
  const params = JSON.parse(reqireParams);
  const editkey = Object.keys(params);
  console.log("editParams",params);
  const id = params.id;
  const EditData = totalHotelData.hotelData;
  EditData.forEach(item => {
    if(item.id === id) {
      editkey.forEach((key)=>{
        item[key] = params[key]
      })
    }
  });
  totalHotelData.hotelData = EditData;
  console.log("editHotelData",totalHotelData.hotelData);
  const stringData = JSON.stringify(totalHotelData);
  fs.writeFile("../data/hotelInfo.json", stringData, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Edite hotel info success");
    res.send({
      success: "ok",
    });
  });
})
const PORT = "3000";
app.listen(PORT, () => {
  const serveInfo = `Serve run  in http://127.0.0.1: ${PORT}`;
  console.log(serveInfo);
});

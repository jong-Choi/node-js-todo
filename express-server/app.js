const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/user/[id]");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors()); // app.use(경로, 미들웨어 함수) 혹은 app.use(미들웨어 함수)는 요청에 대해 핸들링한다.
// 미들웨어 함수는 req, res, next를 응답으로 받아, next()를 호출하는 함수이다.
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ url: "암것두 없다" }); //res.json은 객체를 파라미터로 받는다. 받은 객체를 JSON 형식으로 변환하고, 헤더에 application/json을 자동으로 추가해준다.
});

app
  .route("/user")
  .get((req, res) => {
    fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data) => {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  })
  .post((req, res) => {
    // 기존 데이터 읽기
    fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
      const jsonData = JSON.parse(data);
      jsonData.push({ id: jsonData.at(-1).id + 1, ...req.body });

      // 업데이트된 데이터 파일에 쓰기
      fs.writeFile(
        path.join(__dirname, "data.json"),
        JSON.stringify(jsonData, null, 2),
        "utf-8",
        (err) => {
          res.json(jsonData);
        }
      );
    });
  });

app.listen(8080, () => {
  console.log("8080번 포트에서 익스프레스 실행");
});

const http = require("http");

const userInfo = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
  },
];

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); //post 요청 등에서 Content-Type인 경우에도 CORS를 허용한다.
  res.setHeader("Access-Control-Allow-Methods", "*"); //OPTIONS, GET, POST 이외의 요청에 대해서 허용

  // application/json 타입으로 헤더에 콘텐츠 타입을 설정한다.
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/") {
    res.write(JSON.stringify({ url: "암것두 없다" }));
  }

  if (req.url.startsWith("/user")) {
    //url.split("/")[2]는 params를 의미한다.
    if (!req.url.split("/")[2]) {
      if (req.method === "GET") {
        res.write(JSON.stringify(userInfo));
      }

      if (req.method === "POST") {
        let requestBody = "";
        req
          .on("data", (chunk) => {
            requestBody += chunk;
          })
          .on("end", () => {
            const user = JSON.parse(requestBody);
            userInfo.push({ id: userInfo.at(-1).id + 1, ...user });

            //아래의 두 코드는 같다.
            res.end(JSON.stringify(userInfo));
            // res.write(JSON.stringify(userInfo));
            // res.end();
          });
        return; // return을 넣어주어야 res.end()가 작동하지 않는다. return하지 않으면 res.end가 한번 더 실행되며 잘못된 응답을 보내게 된다.
      }
    } else {
      const userId = Number(req.url.split("/")[2]);
      const userData = userInfo[userInfo.findIndex((e) => e.id === userId)];
      if (req.method === "GET") {
        res.write(JSON.stringify(userData));
      }

      // POST 요청을 활용한다.
      if (req.method === "PATCH") {
        let requestBody = "";
        req
          .on("data", (chunk) => {
            requestBody += chunk;
          })
          .on("end", () => {
            const user = JSON.parse(requestBody);
            // 유저 객체의 키, 밸류를 수정하는 방식으로 업데이트를 실행한다.
            // (객체 불변성을 지키지 않고 있음에 유의!)
            Object.entries(user).forEach((entry) => {
              const [key, value] = entry;
              userData[key] = value;
            });
            res.end(JSON.stringify(userData));
          });
        return;
      }
    }
  }
  res.end();
});

server.listen(8080, () => console.log("8080 포트 작동"));

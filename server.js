//this is we are loading the http module 
const http = require("http");
//this is we are loading the file module that allows us to deal with files 
const fs = require("fs");

//and we want to listen our server through port 3000 which we store in a variable port
const PORT = 3000;

//here we simply create a server using http module that we stored in line2
const server = http.createServer((req, res) => {

  //our html file runs on 127.0.0.1:5500 and node server runs on port3000 and 
  //Browsers blocks requests between different ports or domains by default. This is called CORS (Cross-Origin Resource Sharing).
  res.setHeader("Access-Control-Allow-Origin", "*"); //this says its okay for any site to send requests on this server
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); //this says that these http methods will be allowed
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); //this says that this header will be accepted in requests

//   OPTIONS is a preflight request from the browser
// Node responds with 204 No Content → browser is allowed to send actual POST
// return ensures we don’t continue to the POST logic
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  //here it checks if the request's method is post and if its url is /feedback so only feedback data is saved
  if (req.method === "POST" && req.url === "/feedback") {
    let body = "";
    //this body variable will be used to store the data sent by the frontend(contact.js)
    //data is always sent in chuncks and we need to store entirely by adding it to body
    req.on("data", chunk => body += chunk);//this req.on(data) is used to take data 
    //     //now this req operation will end by the following function where fs we append the body into feedback.txt ,as a response we write 200(success message)
    //and send feedback success message to frontend which it will alert to the user
    req.on("end", () => { //req.on(end)is invoked when all data has been recieved
      fs.appendFileSync("feedback.txt", body + "\n");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Feedback saved successfully!");
    });
  } else {
    //if the method is not post and url is not feedback then the response that request will be with a 4o4 error and end it with not found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

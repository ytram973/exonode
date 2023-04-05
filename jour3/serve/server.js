const http = require("http");
const hostname = "localhost";
const port ="8000";



const server = http.createServer((req,res)=>{

const url =req.url.replace('/','')

    res.writeHead(200,{
        "content-Type": "text/plain",
    });
    res.end();
})

server.listen(port,hostname,()=>{
    console.log(`server runnig ate http://${hostname}:${port}`);
})
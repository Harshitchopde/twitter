import { initServer } from "./app";

async function init(){
    const app = await initServer();
    app.listen(8800,()=> console.log("Server started at port 8800"))
    return app;
}
init();
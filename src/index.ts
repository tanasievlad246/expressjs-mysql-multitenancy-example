import app from "./app";
import { myDataSource } from "./app-data-source";

const start = async () => {
    try {
        await myDataSource.initialize();
        console.log("Connected to database");
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    } catch (err) {
        console.log(err);
    }
}

start();

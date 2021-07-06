import { Pool } from "pg";

const pool = new Pool();

export default function start() {
    pool.query("SELECT * FROM users", (err, res) => {
        if (err) console.log(err);
        console.log(res);
    });

}



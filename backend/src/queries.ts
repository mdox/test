import { Request, Response } from "express";
import { Pool, QueryResult } from "pg";
import { getDriversDatabase } from "./routes/drivers";

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "postgres",
  port: 5432,
});

async function query(
  q: string
): Promise<{ error: Error; results: QueryResult<any> }> {
  return new Promise((resolve, reject) => {
    pool.query(q, (error, results) => {
      resolve({
        error,
        results,
      });
    });
  });
}

async function dirty() {
  const { error } = await query(`DROP TABLE IF EXISTS drivers`);

  if (error) {
    console.error(error);
  }
}

// dirty();

export async function dropDrivers(request: Request, response: Response) {
  const { error } = await query(`DROP TABLE IF EXISTS drivers`);

  if (error) {
    console.error(error);
  }

  response.status(200).send(null);
}

export async function setupDBTable(finished: () => void, errorCb?: () => void) {
  const { error, results } = await query(
    `
    SELECT EXISTS (
      SELECT FROM 
          pg_tables
      WHERE 
          schemaname = 'public' AND 
          tablename  = 'drivers'
      );
  `
  );

  if (error) {
    console.error(error);
    errorCb?.();
    return;
  }

  if (results.rows[0].exists === false) {
    const { error: createTableError } = await query(`
      CREATE TABLE drivers (
        id        INT PRIMARY KEY NOT NULL,
        code      TEXT            NOT NULL,
        firstname TEXT            NOT NULL,
        lastname  TEXT            NOT NULL,
        country   TEXT            NOT NULL,
        team      TEXT            NOT NULL,
        imgUrl    TEXT            NOT NULL,
        place     INT             NOT NULL
      );
    `);

    if (createTableError) {
      console.error(createTableError);
      errorCb?.();
      return;
    }

    const db = getDriversDatabase();

    if (!db) {
      console.error("No local DB");
      errorCb?.();
      return;
    }

    for (const driver of db) {
      const item = `(${driver.id},'${driver.code}','${driver.firstname}','${driver.lastname}','${driver.country}','${driver.team}','${driver.imgUrl}',${driver.place})\n`;

      const { error } = await query(`
    INSERT INTO drivers (id, code, firstname, lastname, country, team, imgUrl, place)
    VALUES
        ${item};
    `);

      if (error) {
        console.error(error);
        errorCb?.();
        return;
      }
    }
  } else {
    finished();
  }
}

export function getDrivers(request: Request, response: Response) {
  pool.query("SELECT * FROM drivers", (error, results) => {
    if (error) {
      console.error(error);
      response.status(500).send(null);
      return;
    }

    response.status(200).json(results.rows);
  });
}

export function overtakeDriver() {}
export function takeplaceDriver() {}

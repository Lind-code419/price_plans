import * as sqlite from 'sqlite'; // * to import module that is not pure es6
import sqlite3 from 'sqlite3';

const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});


await db.migrate()

// query using await

//console.log(result); // cannot have 2 const in the same block

//funstion that returns all the queries

export async function getPlans() { //async marks as special function with await
    const result = await db.all(`select * from price_plan`);
    return result;

} 

export async function addPlan(plan_name, sms_price, call_price) {
    //sql statement -insert
    //insert into greetings (language, greeting) values (?,?)
    
    const sql = `insert into price_plan (plan_name, sms_price, call_price) values (?, ?, ?)`
    await db.run(sql, [plan_name, sms_price, call_price]);
}

export async function deletePlan(id) {
        
    const sql = `delete from price_plan where id =?`
    await db.run(sql, [id]);
}


console.log('end')
//ctrl-shift-p  to open database explorer
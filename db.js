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

export async function updatePlan(plan_name, sms_price, call_price) {
        
    const sql = `update price_plan set call_cost = ?, sms_cost = ? where plan_name = $1`
    await db.run(sql, [sms_price, call_price, plan_name]);
}

export async function totalPhonebill(id,itemString) {
        
    const sql1 = `SELECT plan_name FROM price_plan`;
    let planName = '';
    planName = await db.get(sql1);
    console.log(planName);
    const sql2 = `SELECT sms_price FROM price_plan`;
    let smsPrice = ''; 
    smsPrice = await db.get(sql2);
    console.log(smsPrice);

    if (taxis.taxi_queue_count >=1 && passengers.passenger_queue_count >=12) {
        const sql3 = `update taxi_queue 
        SET 
            taxi_queue_count = taxi_queue_count - 1, 
            passenger_queue_count = passenger_queue_count - 12`;
        await db.run(sql3);

    }

    var calls = 0;
  	var smses = 0;
   	var item = itemString.split(',');
  	console.log(item);
  
  	for (let i =0; i < item.length; i++) {
    	console.log(item[i]);
      	if (item[i].includes('call')) {
        	calls++;
        }
      	else {
        	smses++
        }
    
    }
  var callcost = calls * 2.75;
  var smscost = smses * 0.65;
  var billtotal = (callcost + smscost);
  return 'R'+ billtotal.toFixed(2);
}

console.log('end')
//ctrl-shift-p  to open database explorer
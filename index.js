import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

import { getPlans, addPlan, deletePlan, updatePlan, totalPhonebill } from './db.js'



const app = express();
const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)

app.use(express.static('public'))
app.use(express.json())


console.log(`Server started on ${PORT}`)

app.get('/api/price_plans/', async (req, res) => {
    const plans = await getPlans();
    console.log(plans);
    res.json({
        plans
    })
});

/*
app.get("/api/price_plans/", function (req, res) {

    res.json({
        call: 2.75,
        sms: 0.65

    });
});
*/

app.post('/api/phonebill/', function (req, res) {
    const price_plan = req.body.price_plan;
    const actions = req.body.actions;
    //const price = req.body.price

    res.json({

        total: 78.00

    });
});

app.post('/api/price_plan/create', async (req, res) => {
    console.log(req.body)
    const id = req.body.id;
    const plan_name = req.body.plan_name;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;

    await addPlan(plan_name, sms_price, call_price)
    //
    res.json({
        status: 'success',
        message: `Added a plan for ${plan_name},`
    })
})


app.post('/api/price_plan/update', async (req, res) =>{
    console.log(req.body)
    //const id = req.body.id;
    const plan_name = req.body.plan_name;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;

    await updatePlan(plan_name, sms_price, call_price)
    //
    res.json({
        status: 'success',
        message: `Updated plan for ${plan_name},`
    })
})

app.post('/api/price_plan/delete', async (req, res) =>{
    //const usage = req.body.usage;
    const id = req.body.id
    
    await deletePlan(id)
    //
    res.json({
        status: 'success',
        message: `Deleted ${id},`
    })
});

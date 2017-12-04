import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Get list of exercise', async t => {
    const asanaToCreate = {name: 'Bow', time: 3}

    const creation = await request(app)
        .post('/asana')
        .send(asanaToCreate)

	const res = await request(app)
		.get('/asana')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)
});

test('Create new asana', async t => {
    const asanaToCreate = {name: 'Bow', time: 3}

    const res = await request(app)
        .post('/asana')
        .send(asanaToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, asanaToCreate.name)
    t.is(res.body.age, asanaToCreate.time)
})

test('Fetch a asana', async t => {
    t.plan(2)

    const asana = (await request(app)
        .post('/asana')
        .send({name: 'Bow', time: 3}))
        .body

    const fetch = await request(app)
        .get(`/asana/${asana.id}/json`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, asana)
})

test('Delete a asana', async t => {
    t.plan(3)

    const asana = (await request(app)
        .post('/asana')
        .send({name: 'Bow', time: 3}))
        .body

    const del = await request(app)
        .delete(`/asana/${asana.id}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
    .get(`/asana/${asana.id}/json`)

    t.is(fetch.status, 404)
})

test('Make yogaset', async t => {
 const asana1 = (await request(app)
    .post('/asana')
    .send({name: 'Bow', time: 3}))
    .body
    
    const asana2 = (await request(app)
    .post('/asana')
    .send({name: 'Boat', time: 1}))
    .body

    const makeYogaset = (await request(app)
        .post(`/asana/${person1.id}/yogaset`)
        .send ({targetId: person2.id}))

    const updatedAsana1 = (await request(app)
    .get(`/asana/${asana1.id}/json`))
    .body 
    
    t.deepEqual(updatedAsana1.yogaset[0], asana2)
})

const next = require('next');
const express = require("express");
const cookie = require("cookie-session");
const {MongoClient, ServerApiVersion} = require("mongodb");
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const {MongoClient, ServerApiVersion} = require('mongodb');
    const {ObjectId} = require('mongodb');
    const cookie = require('cookie-session')
    const app = express();
    require('dotenv').config();

    //Start using the cookies
    app.use(cookie({
        name: 'session',
        keys: ['key1', 'key2']
    }))

    //MIDDLEWARE for our account access situation
    app.use(function (req, res, next) {
        //based on the structure of the middleware, css will not go through bc express.static('public') is after. we need to whitelist some files
        if (req.session.login === true || req.path.startsWith('/css') || req.path.startsWith('/'))
            next()
        else
            res.sendFile(__dirname + '/app/page.js')
    })

    // serve up static files in the directory public,
    app.use(express.static('public'))
    app.use(express.json());
    app.use(express.urlencoded({extended: true})) //this to get data from default form action

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri = process.env.MONGODB_API_KEY;
    console.log("Connecting", uri);
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    //Initialize our collections in our database
    let ordersCollection = null;
    let analyticsCollection = null;
    let usersCollection = null;

    //Run MongoDB
    async function run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ping: 1});
            ordersCollection = client.db("northstar").collection("orders");
            analyticsCollection = client.db("northstar").collection("analytics");
            usersCollection = client.db('northstar').collection("user");

            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            app.listen(process.env.PORT || 3000)
        } catch (err) {
            console.log("MongoDB has an connection error:", err);
        }
    }

    run().catch(console.dir);

    //Get Request for orders
    app.get('/orders', async (req, res) => {
        try {
            if (!ordersCollection) {
                return res.status(500).json({error: "Orders collection not found"});
            }

            const orders = await ordersCollection.find({}).toArray();
            res.status(200).json(orders);
        } catch (err) {
            console.error("Error getting drink orders");
            res.status(500).json({err: "Error getting drink orders"});
        }
    })

    // Get Request for analytics
    app.get('/analytics', async (req, res) => {
        try {
            if (!analyticsCollection) {
                return res.status(500).json({error: "Analytics collection not found"});
            }

            const analytics = await analyticsCollection.find({}).toArray();
            res.status(200).json(analytics);
        } catch (err) {
            console.error("Error getting analytics data");
            res.status(500).json({error: "Error getting analytics data"});
        }
    });

    //Post Request (ALSO saves to analytics)
    app.post('/orders', async (req, res) => {
        console.log("POST /orders received:", req.body);
        try {
            if (!ordersCollection) {
                return res.status(500).json({error: "Orders collection not found"});
            }

            const newEntry = req.body;
            const result = await ordersCollection.insertOne(newEntry); //add to orders

            //also insert our order into analytics for later admin usage
            const analyticsEntry = {
                ...newEntry,
                orderId: result.insertedId,
                orderStatus: 'Placed',
                placedAt: new Date().toISOString()
            } ;
            await analyticsCollection.insertOne(analyticsEntry);

            console.log(newEntry);
            console.log("New order received!");
            res.status(201).json({status: "success", insertedId: result.insertedId});
        } catch (err) {
            console.error("Error inserting order");
            res.status(500).json({error: "Error inserting order"});
        }

    });

    //Delete Order Entry by order id (this is for when the order is completed) & update analytics
    app.delete('/orders/:id', async (req, res) => {
        const {id} = req.params;

        try {
            const orderId = new ObjectId(id);
            const order = await ordersCollection.deleteOne({_id: orderId});
            if (order.deletedCount === 1) {
                //Update analytics that order was completed
                await analyticsCollection.updateOne(
                    {orderId: orderId},
                    {
                        $set: {
                            orderStatus: 'Completed',
                            completedAt: new Date().toISOString(),
                        }
                    }
                )

                res.status(200).json({status: 'success', id});
            } else {
                res.status(404).json({error: 'Order not found'});
            }
        }
        catch (err) {
            console.error("Error completing order", err.message);
            res.status(500).json({error: "Error completing order"});
        }
    })

    //These 2 bits allow the Next.js to render everything we need, similar to our previous html req's, but the frameworks work differently
    app.get('/', (req, res) => {
        return handle(req, res);
    });

    app.all('/{*any}', (req, res) => {
        return handle(req, res);
    });
})

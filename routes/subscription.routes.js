import { Router } from "express";
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscriptions, getSubscription, getUpcomingRenewals, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middleware/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',authorize, getAllSubscriptions);// Get all subscriptions

subscriptionRouter.get('/:id',authorize, getSubscription);// Get a single subscription by ID

subscriptionRouter.post('/',authorize, createSubscription);// Create a new subscription

subscriptionRouter.put('/:id', authorize, updateSubscription);// Update a subscription by ID

subscriptionRouter.delete('/:id',authorize, deleteSubscription);// Delete a subscription by ID

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);// Get all subscriptions for a user

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);// Cancel a subscription

subscriptionRouter.put('/upcomming-renewals',authorize, getUpcomingRenewals);// Get all upcoming renewals

export default subscriptionRouter;
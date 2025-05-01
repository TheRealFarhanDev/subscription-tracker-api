import Subscription from '../models/subscription.model.js';
export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json({message: 'Subscriptions retrieved successfully', data : subscriptions});
    } catch (error) {
        console.error(`Error in getAllSubscriptions: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const getSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findById(id);
        
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        
        res.status(200).json({message: 'Subscription retrieved successfully', data : subscription});
         
    } catch (error) {
        console.error(`Error in getSubscription: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const createSubscription = async (req, res) => {
    try {
        const { 
            name, 
            price,
            frequency, 
            category, 
            paymentMethod, 
            startDate,
            user 
        } = req.body;

        if (!name || !price || !frequency || !category || !paymentMethod || !startDate || !user) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newSubscription = new Subscription({
            name, 
            price,
            frequency, 
            category, 
            paymentMethod, 
            startDate,
            user 
        });
        await newSubscription.save();
        res.status(201).json({message: 'Subscription created successfully', data : newSubscription});

    } catch (error) {
        console.error(`Error in createSubscription: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, frequency, category, paymentMethod, startDate } = req.body;
        
        const subscription = await Subscription.findByIdAndUpdate(id, {
            name,
            price,
            frequency,
            category,
            paymentMethod,
            startDate
        }, { new: true });
        
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        
        res.status(200).json({message: 'Subscription updated successfully', data : subscription});
    } catch (error) {
        console.error(`Error in updateSubscription: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByIdAndDelete(id);
        
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        
        res.status(200).json({message: 'Subscription deleted successfully', data : subscription});
    } catch (error) {
        console.error(`Error in deleteSubscription: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserSubscriptions = async (req, res) => {
    try {
        const { id } = req.params;
        const subscriptions = await Subscription.find({ user: id });
        
        if (!subscriptions) {
            return res.status(404).json({ error: 'No subscriptions found for this user' });
        }
        
        res.status(200).json({message: 'User subscriptions retrieved successfully', data : subscriptions});
    } catch (error) {
        console.error(`Error in getUserSubscriptions: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const cancelSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
        
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        
        res.status(200).json({message: 'Subscription cancelled successfully', data : subscription});
    } catch (error) {
        console.error(`Error in cancelSubscription: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUpcomingRenewals = async (req, res) => {
    try {
        const { userId } = req.body;
        const subscriptions = await Subscription.find({ user: userId, status: 'active' });
        
        if (!subscriptions) {
            return res.status(404).json({ error: 'No active subscriptions found for this user' });
        }
        
        res.status(200).json({message: 'Upcoming renewals retrieved successfully', data : subscriptions});
    } catch (error) {
        console.error(`Error in getUpcomingRenewals: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


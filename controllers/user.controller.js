import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    const users = await User.find().select('-password');

    res.status(200).json({
        status: true,
        message: "Users fetched successfully",
        data: {
            users,
        },
    })
}

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');

    res.status(200).json({
        status: true,
        message: "Users fetched successfully",
        data: {
            user,
        },
    })
}

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({
            name,
            email,
            password,
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
        next(error);
        
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password,
        }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error) {
        console.error(`Error in updateUser: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error in deleteUser: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
};

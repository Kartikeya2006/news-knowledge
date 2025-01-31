"use server";

import { FormState, SignupFormSchema } from "../definitions";
import User from "../models/user.model";
import { connectToDB } from "../mongoDB/mongoDB";

export async function signup(state : FormState, formData : FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name : formData.get('name'),
        password : formData.get('password'),
    });
    if(!validatedFields.success) {
        return {
            errors : validatedFields.error.flatten().fieldErrors,
        };
    }
    const {name, password} = validatedFields.data;
    console.log(name);
    console.log(password);
    
    try {
        await connectToDB();
        const existingUser = await User.findOne({name});

        if(existingUser) {
            return {
                message: "User already exists",
            };
        }
        const newUser = await User.create({
            username:name,
            password,
        });
        console.log(newUser);
    } catch(error) {
        console.log("User not created due to the Error: ", error);
    }
}
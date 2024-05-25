import mongoose from "mongoose";
import { UserDataType } from "../shared/types";

const UserSchema = new mongoose.Schema<UserDataType>({
  displayName: { type: String, required: true },
  photoURL: { type: String },
  email: { type: String, required: [true, "Email is required"], unique: true },
  coins: { type: Number, required: true, default: 50 },
});

const User = mongoose.model("User", UserSchema);

export default User;

import { Schema, model, Document } from "mongoose";

interface Iwelcome extends Document {
  guild: string;
  channel: string;
  message: string;
  image: boolean;
}
const welcome = new Schema<Iwelcome>({
    guild: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        default: `Demosle la bienvenida a {user} \n Pasatela Bien <:wow:963550260863590492>`
    },
    image: {
        type: Boolean, 
    }
});


export default model<Iwelcome>('welcomeSchema', welcome);
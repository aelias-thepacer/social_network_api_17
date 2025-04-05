import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction {
    reactionId: Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: IReaction[]
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: any) => createdAt.toISOString().split('T')[0],
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                reactionId: {
                    type: Schema.Types.ObjectId,
                    default: () => new Types.ObjectId(),
                },
                reactionBody: {
                    type: String,
                    required: true,
                    maxlength: 280,
                },
                username: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now(),
                    get: (createdAt: Date) => createdAt.toISOString().split('T')[0],
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
        timestamps: true,
    },
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);
const Thought = model<IThought>('thought', thoughtSchema);
export default Thought;
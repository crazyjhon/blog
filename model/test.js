const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const personSchema = Schema({
    name: String,
    age: Number
});

const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Person' },
    title: String,
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
const author = new Person({
    name: 'Ian Fleming',
    age: 50
});

author.save(function (err) {
    if (err) return handleError(err);

    const story1 = new Story({
        title: 'Casino Royale',
        author: author._id    // assign the _id from the person
    });

    story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
    });
});
// Story.
// findOne({ title: 'Casino Royale' }).
// populate({path:'author'}).
// exec(function (err, data) {
//     if (err) return handleError(err);
//     console.log(data);
//     // prints "The author is Ian Fleming"
// });
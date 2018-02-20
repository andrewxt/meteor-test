import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Tasks } from './tasks.js'

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'testuser'
        });
      });
      it('can delete owned task', () => {
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        //fake method invocation
        const invocation = { userId };

        //run method with this and the fake invocation
        deleteTask.apply(invocation, [taskId]);

        //verify that method acts as expected
        assert.equal(Tasks.find().count(), 0);
      })
    })
  })
}

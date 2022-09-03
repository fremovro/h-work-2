import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async saveUser() {
          if(this.get('userEmail') && this.get('userPassword'))
          {
            let newUser;
            let user = {
                email: this.get('userEmail'),
                password: this.get('userPassword')
              }
            try {
              newUser = this.get('store').createRecord('user', user);
              await newUser.save();
            }
            catch(e) {
              e.user = newUser;
              this.send('error', e);
            }
            console.log('something');
            this.setProperties({
                email: undefined,
                password: undefined  
              });
            // this.transitionToRoute('index');
          }
          else alert("Необходимо ввести почту и пароль...");
        },
      
        error(error, transition) {
            this.set('errors', error.user.errors);
            return false;
        }
    },
    
    resetErrors() {
        this.set('errors', {});
      }
});

var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/Fun-Photos/Fun-Photos.github.io.git', // Update to point to your repository  
        user: {
            name: 'Chris Boler', // update to use your name
            email: 'christopher.boler@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
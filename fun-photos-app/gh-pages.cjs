var ghpages = require('gh-pages');

ghpages.publish(
    'build', {
        branch: 'gh-pages',
        repo: 'https://github.com/Fun-Photos/Fun-Photos.github.io.git',
        user: {
            name: 'Chris Boler',
            email: 'christopher.boler@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
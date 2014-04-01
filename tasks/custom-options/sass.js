module.exports = {
  compile: {
    files: [{
      expand: true,
      cwd: 'app', // broad working dir to cover styles/ & pods/
      src: ['**/*.{scss,sass}', '!**/_*.{scss,sass}'],
      dest: 'tmp/result/assets/',
      ext: '.css'
    }]
  }
};

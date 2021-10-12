process.stdin.on('data', function(data) {
  const stringData = data.toString();

  process.stdout.write(stringData.split('').reverse().join(''));
})

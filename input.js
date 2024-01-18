const UPKEY = "Move: up";
const LEFTKEY = "Move: left";
const DOWNKEY = "Move: down";
const RIGHTKEY = "Move: right";

let connection;

const msg = "Say: ";
const hello = "Hello!";
const stay = "Stay!";
const listen = "Listen!";

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', key => {
    handleUserInput(key);
  });
  return stdin;
};

let func;

const handleUserInput = (key) => {
  const stdout = process.stdout;
  const interval = function(key) {
    func = setInterval(() => {
      connection.write(key);
    }, 100);
  };
  if (key === '\u0003') {
    stdout.write("Exited sneak game.\n");
    process.exit();
  }
  if (key === 'w') {
    clearInterval(func);
    interval(UPKEY);
  }
  if (key === 'a') {
    clearInterval(func);
    interval(LEFTKEY);
  }
  if (key === 's') {
    clearInterval(func);
    interval(DOWNKEY);
  }
  if (key === 'd') {
    clearInterval(func);
    interval(RIGHTKEY);
  }
  if (key === "h") {
    connection.write(msg + hello);
  }
  if (key === "t") {
    connection.write(msg + stay);
  }
  if (key === 'l') {
    connection.write(msg + listen);
  }
};

module.exports = { setupInput };
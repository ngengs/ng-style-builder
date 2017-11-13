// We can use es6 here
// Because all js file inside js/app will compile with babel

$('document').ready(() => {
  const $body = $('body');

  $body.onClick((e) => {
    const $this = $(e.currentTarget);
    $this.fadeOut();
  });
});

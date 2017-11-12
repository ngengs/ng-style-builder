// We can use es6 here
// Because all js file inside js/app will compile with babel

$('document').ready(() => {
  'use strict';

  let $body = $('body');

  $body.onClick((e) => {
    let $this = $(e.currentTarget);
    $this.fadeOut();
  })
});

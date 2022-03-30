var na1 = 15;
var na0 = 4;
var p = 0;
var tovriki;
var cart = {};
var cartQ = {};

function Init() {
  $.get(
    "admin/core.php",
    {"p" : p, "action" : "Init"},
    GoodsOut
  )
}

$(function(){
	$('#scroll_bottom').click(function(){
		$('html, body').animate({scrollTop: 1129}, 600);
		return false;
	});
});

function GoodsOut(data) {
    data = JSON.parse(data);
    //tovriki = data.length;
    console.log(data);
    var out='';
    var pag='';
    for (var key in data){
      out += `<div class = "Tov">`;
      out += `<img id = "Pic" src = "${data[key].Img}">`;
      out += `<p class = "TextTov">${data[key].Name}</p>`;
      out += `<div class = "Cen">${data[key].Cost}`;
      out += `<button class = "zakaz" data-id="${data[key].id}"><img id = "kr" src = "Images\\korzina.svg"> </button>`;
      out += `</div>`;
      out += `<div class = "pokypisha">`;
      out += `<button class = "plusik" data-id="${data[key].id}"><img id = "plus" src = "Images\\plus.svg"></button> `;
      out += `<button class = "minusik" data-id="${data[key].id}"><img id = "mines" src = "Images\\mines.svg"></button> `;
      out += `<p class = "collichestvo" id = "Col${data[key].id}">${data[key].pock}</p>`;
      out += `<p class = "consti" id = "const${data[key].id}">${data[key].pock}</p>`;
      out += `</div>`;
      out += `</div>`;

    }
    if(p <= 3){
      for (var x = 1; x < 6; x++ ){

        if(p === (x)){
          pag += `<button class = "pageBF" data-id = "${x}"> ${x} </button>`;
        }else{
            pag += `<button class = "pageB" data-id = "${x}"> ${x} </button>`;
        }
      }
    }else{
      for (var x = (p - 2); x < (p + 3); x++ ){
        if(p === (x)){
          pag += `<button class = "pageBF" data-id = "${x}"> ${x} </button>`;
        }else{
            pag += `<button class = "pageB" data-id = "${x}"> ${x} </button>`;
        }
      }
    }
    $('.pages').html(pag);
    $('.pageBF').on('click', ChangeTov);
    $('.pageB').on('click', ChangeTov);
    $('.Goods_Out').html(out);
    $('.zakaz').on('click', ToCard);
    $('.plusik').on('click', FP);
    $('.minusik').on('click', FM);
      console.log(pag);
}

$(document).ready(function () {
  Init();
  FLoadCart();
})

function FLoadCart(){
  if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    cartQ = JSON.parse(localStorage.getItem('cartQ'));
  }
}
function ToCard(){
  var id = $(this).attr('data-id');
  //if(cart[id] == undefined){
    cart[id] = id;
    cartQ[id] = document.getElementById('Col' + id).innerText;
  //}
  SaveCart();
}

function SaveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartQ', JSON.stringify(cartQ));
}

function FP() {
  var id = $(this).attr('data-id');

    document.getElementById('Col'+id).innerText = Number(document.getElementById('const'+id).innerText) + Number(document.getElementById('Col'+id).innerText);
}



function FM() {
  var id = $(this).attr('data-id');

    document.getElementById('Col'+id).innerText = Number(document.getElementById('Col'+id).innerText) - Number(document.getElementById('const'+id).innerText);
    if(Number(document.getElementById('Col'+id).innerText) < Number(document.getElementById('const'+id).innerText)){
        document.getElementById('Col'+id).innerText = Number(document.getElementById('const'+id).innerText);
    }
}

function ChangeTov() {
  var id = $(this).attr('data-id');
  p = Number(id) - 1;
    $.get(
      "admin/core.php",
      {"p" : p, "action" : "Init"},
      GoodsOut
    )
}

function Pleft() {
  p --;
if(p < 0){
  p = 0;
}
Init();
}

function Pright() {
p++;
Init();
}

function vidKor(){
  var out = "";
  if (localStorage.getItem("cart")) {
    if(!isEmpty(cart)){
      out += `<div id = "Zina">`;
      out += `<button class = "krst"><img id = "krest" src = "Images\\krestik.svg"></button>`;
      out += `<p id = "Pust">Ваша корзина пуста</p>`;
      out += `<img src = "Images\\PustKor.svg" id = "KorPust">`;
      out += `</div>`;
    }else{
      cart = JSON.parse(localStorage.getItem('cart'));
      console.log(cart);
      Load_goods();
    }

      // $.get(
      //   "admin/core.php",
      //   {"cart" : cart, "action" : "LoadCart"},
      //   ShowCart
      // )
  }else{
    out += `<div id = "Zina">`;
    out += `<button class = "krst"><img id = "krest" src = "Images\\krestik.svg"></button>`;
    out += `<p id = "Pust">Ваша корзина пуста</p>`;
    out += `<img src = "Images\\PustKor.svg" id = "KorPust">`;
    out += `</div>`;
  }

  $('.Knop').html(out);
  $('.krst').on('click', CloseCart);
  document.getElementById('temno').style.display = "block";
}

function ShowCart(data) {
  data = JSON.parse(data);
  var out = "";
  out += `<div id = "Zina">`;
  out += `<button class = "krst"><img id = "krest" src = "Images\\krestik.svg"></button>`;
  out += `<div id = "PP">`;
  for(var key in data){

    var id = data[key].id;
    var cenn = data[key].Cost * cartQ[id];
    out += `<div class = "Kor">`;
    out += `<p class = "t">Товар: ${data[key].Name}</p>`;
    out += `<p class = "s">Цена: ${cenn} рублей</p>`;
    out += `<p class = "c"> Количество: ${cartQ[id]}</p>`;
    out += `<button class = "bbbb" data-id = "${data[key].id}"><img src = "Images\\KKK.svg"></button>`;
    out += `</div>`;


      console.log(cenn);
  }
  out += `</div>`;
  out += `<button class = "nudes"><img src = "Images\\sendNudes.svg"></button>`;
  out += `</div>`;
  $('.Knop').html(out);
  $('.krst').on('click', CloseCart);
  $('.nudes').on('click', TakeCost);
  $('.bbbb').on('click', DelTov);
  document.getElementById('temno').style.display = "block";
}

function DelTov() {
  var id = $(this).attr('data-id');
  delete cart[id];
  delete cartQ[id];
  SaveCart();
  vidKor();

}

function TakeCost(){
  $.get(
    "admin/coreCart.php",
    {"cart" : cart, "action" : "LoadCart"},
    Send
    )
}

function Send(data) {
  data = JSON.parse(data);
  var itog = 0;
  for(var key in data){
    itog += data[key].Cost * cartQ[data[key].id];
  }
  var out = "";
  out += `<form name="Zaika" class="Zaiavka" action="core/mail.php" method="post" target="_blank" id="pk">`;
  out += `<input readonly type = "number" name = "sum" class = "itog" value = "${itog}"/>`;
  //out += `<div class = "itog">${itog}</div>`;
  out += `<button class = "krst"> <img src="Images\\krestik.svg"> </button>`;
  out += `<textarea id="txt" name="tz" placeholder="Оставьте пожалуйста контакты как с вами связаться и наши сотрудники обязательно ответят" required="required"></textarea>`;
  out += `<button class="Putin" type="submit" name="sub">Отправить заявку </button>`;
  out += `</form>`;
  $('.Knop').html(out);
  $('.krst').on('click', CloseCart);
  $('.Putin').on('click', TakeOtherInf);
}

function TakeOtherInf(){

  $.get(
    "admin/coreCart.php",
    {"cart" : cart, "action" : "LoadCart"},
    SendOtherInf
    )
}

function SendOtherInf(data){
  data = JSON.parse(data);
  var itog = 0;
  for(var key in data){
    itog += data[key].Cost * cartQ[data[key].id];
  }
  $.post(
    "core/mailQ.php",
    {"sum": itog, "cart": cart, "cartQ": cartQ},
    ShowLastThing
  )
}

function ShowLastThing(){
  var out = "";
  out += `<div id = "Zina">`;
  out += `<button class = "krst"> <img src="Images\\krestik.svg"> </button>`;
  out += `<p id = "Pust">Заявка отправлена</p>`;
  out += `<img src = "Images\\PustKor.svg" id = "KorPust">`;
  out += `</div>`;
  $('.Knop').html(out);
  $('.krst').on('click', CloseCart);
}

function vidContr(){
  var out = "";
  out += `<div id="Contr">`;
  out += `<button class="krst"><img id = "krest" src="Images\\krestik.svg"></button>`;
  out += `<div id="Serova">`;
  out += `<p>Адрес: Серова, д.28</p>`;
  out += `<p>Телефон: 45-35-80</p>`;
  out += `</div>`;
  out += `<div id="Pereleta">`;
  out += `<p>Адрес: Перелета, д. 18</p><p>Телефоны:72-34-49, 8-913-601-01-47</p>`;
  out += `</div>`;
  out += `<div id="Buh">`;
  out += `<p>Бухгалтерия</p><p>Телефон: 72-72-33</p>`;
  out += `</div></div> `;
  $('.Knop').html(out);
  $('.krst').on('click', CloseCart);
  document.getElementById('temno').style.display = "block";
}

function CloseCart() {
  var out = "";
  $('.Knop').html(out);
  document.getElementById('temno').style.display = "none";
}

function Load_goods(){
  $.get(
      "admin/coreCart.php",
      {"cart" : cart, "action" : "LoadCart"},
      ShowCart
      )
}

function isEmpty(object) {
  for(var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

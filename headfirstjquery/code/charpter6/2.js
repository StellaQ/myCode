var deck = [
        new card('Ace', 'Hearts',11), new card('Two', 'Hearts',2),
        new card('Three', 'Hearts',3), new card('Four', 'Hearts',4),
        new card('Five', 'Hearts',5), new card('Six', 'Hearts',6),
        new card('Seven', 'Hearts',7), new card('Eight', 'Hearts',8),
        new card('Nine', 'Hearts',9), new card('Ten', 'Hearts',10),
        new card('Jack', 'Hearts',10), new card('Queen', 'Hearts',10),
        new card('King', 'Hearts',10), new card('Ace', 'Diamonds',11),
        new card('Two', 'Diamonds',2), new card('Three', 'Diamonds',3),
        new card('Four', 'Diamonds',4), new card('Five', 'Diamonds',5),
        new card('Six', 'Diamonds',6), new card('Seven', 'Diamonds',7),
        new card('Eight', 'Diamonds',8), new card('Nine', 'Diamonds',9),
        new card('Ten', 'Diamonds',10), new card('Jack', 'Diamonds',10),
        new card('Queen', 'Diamonds',10), new card('King', 'Diamonds',10),
        new card('Ace', 'Clubs',11), new card('Two', 'Clubs',2),
        new card('Three', 'Clubs',3), new card('Four', 'Clubs',4),
        new card('Five', 'Clubs',5), new card('Six', 'Clubs',6),
        new card('Seven', 'Clubs',7), new card('Eight', 'Clubs',8),
        new card('Nine', 'Clubs',9), new card('Ten', 'Clubs',10),
        new card('Jack', 'Clubs',10), new card('Queen', 'Clubs',10),
        new card('King', 'Clubs',10), new card('Ace', 'Spades',11),
        new card('Two', 'Spades',2), new card('Three', 'Spades',3),
        new card('Four', 'Spades',4), new card('Five', 'Spades',5),
        new card('Six', 'Spades',6), new card('Seven', 'Spades',7),
        new card('Eight', 'Spades',8), new card('Nine', 'Spades',9),
        new card('Ten', 'Spades',10), new card('Jack', 'Spades',10),
        new card('Queen', 'Spades',10), new card('King', 'Spades',10)
    ],
    used_cards = [];

$(document).ready(function(){
    $('#btnDeal').click(cardStart);

    $('#btnHit').click(cardContinue);

    $('#btnStick').click(cardStick);

    $('#btnRestart').click(cardRestart);
});
function cardStart () {
    for (var i = 0; i < 2; i++) {
        hit();
    };
    getTotal();

    $(this).toggle();
    $('#btnHit').toggle();
    $('#btnStick').toggle();
}
function cardContinue () {
    hit();
    getTotal();
}
function cardStick () {
    $('#hdrResult').html('Stick!').addClass('win');

    $('#btnHit').toggle();
    $('#btnStick').toggle();
    $('#btnRestart').toggle();

    used_cards = [];
}
function cardRestart () {
    $('#hdrTotal').empty();
    $('#hdrResult').empty();
    $('#my_hand').empty();
    $('#result').hide();
    $('#btnHit').toggle();
    $('#btnStick').toggle();
    $('#btnRestart').toggle();
}
function getRandom (num) {
    return Math.floor(Math.random()*num);
}
function card (name, type, num) {
    this.name = name;
    this.type = type;
    this.num = num;
}
function hit () {
    var num = deck.length;
    var index = getRandom(num);
    console.log($.inArray(index, used_cards));
    if ($.inArray(index, used_cards) > 0) {
        return
    };
    used_cards.push(index);
    var src = '../../codeexample/ch06/end/images/cards/'+ deck[index].type +'/'+ deck[index].name +'.jpg';
    var $d = $('<div>');
    $d.addClass('current_hand')
      .appendTo($('#my_hand'));
    $('<img>').attr('src', src)
              .appendTo($d);
}
function getTotal () {
    var total = 0;
    for (var i = 0; i < used_cards.length; i++) {
        var index = used_cards[i];
        total += deck[index].num;
    }

    if (total > 21) {
        // BUST!   超过21就输了
        $('#hdrResult').html('BUST!').addClass('lose');
        $('#result img').attr('src','../../codeexample/ch06/end/images/x2.png');
        $('#result').toggle()
                    .fadeOut('slow')
                    .fadeIn('slow');
        // $('#my_hand').empty();
        $('#btnHit').toggle();
        $('#btnStick').toggle();
        $('#btnRestart').toggle();
        used_cards = [];
    } else if (total == 21 && used_cards.length !== 5) {
        // BlackJack!
        $('#hdrResult').html('BlackJack!').addClass('win');
        $('#result img').attr('src','../../codeexample/ch06/end/images/check.png');
        $('#result').toggle()
                    .fadeOut('slow')
                    .fadeIn('slow');
        // $('#my_hand').empty();
        $('#btnHit').toggle();
        $('#btnStick').toggle();
        $('#btnRestart').toggle();
        used_cards = [];
    } else if (total <= 21 && used_cards.length == 5) {
        // BlackJack - 5 card trick!
        $('#hdrResult').html('BlackJack - 5 card trick!').addClass('win');
        $('#result img').attr('src','../../codeexample/ch06/end/images/check.png');
        $('#result').toggle()
                    .fadeOut('slow')
                    .fadeIn('slow');
        // $('#my_hand').empty();
        $('#btnHit').toggle();
        $('#btnStick').toggle();
        $('#btnRestart').toggle();
        used_cards = [];
    }

    $('#hdrTotal').html(total);
}











